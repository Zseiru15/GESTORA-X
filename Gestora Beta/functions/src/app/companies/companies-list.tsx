'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { useCollection, useFirebase, useMemoFirebase } from '@/firebase';
import { collection, doc } from 'firebase/firestore';
import {
  addDocumentNonBlocking,
  deleteDocumentNonBlocking,
  updateDocumentNonBlocking,
} from '@/firebase/non-blocking-updates';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useMemo, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';

const companySchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  address: z.string().min(1, 'La dirección es obligatoria'),
  contactEmail: z.string().email('Email inválido'),
  contactPhone: z.string().min(1, 'El teléfono es obligatorio'),
});

type CompanyFormValues = z.infer<typeof companySchema>;

type Company = CompanyFormValues & { id: string };

function CompanyForm({
  company,
  onSave,
  onClose,
}: {
  company?: Company;
  onSave: (data: CompanyFormValues) => void;
  onClose: () => void;
}) {
  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companySchema),
    defaultValues: company || {
      name: '',
      address: '',
      contactEmail: '',
      contactPhone: '',
    },
  });

  const onSubmit = (data: CompanyFormValues) => {
    onSave(data);
    onClose();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <SheetHeader>
          <SheetTitle>
            {company ? 'Editar Empresa' : 'Añadir Nueva Empresa'}
          </SheetTitle>
          <SheetDescription>
            {company
              ? 'Actualice los detalles de la empresa.'
              : 'Rellene los detalles para crear una nueva empresa.'}
          </SheetDescription>
        </SheetHeader>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de la Empresa</FormLabel>
              <FormControl>
                <Input placeholder="Innovatech Solutions" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dirección</FormLabel>
              <FormControl>
                <Input placeholder="123 Main St, San Francisco, CA" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contactEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email de Contacto</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="contacto@innovatech.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contactPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teléfono</FormLabel>
              <FormControl>
                <Input placeholder="+1 (555) 123-4567" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full mt-4 bg-accent hover:bg-accent/90 text-accent-foreground"
        >
          Guardar Empresa
        </Button>
      </form>
    </Form>
  );
}

export default function CompaniesList() {
  const { firestore } = useFirebase();
  const companiesCollection = useMemoFirebase(() => firestore ? collection(firestore, 'companies') : null, [firestore]);
  const { data: companies, isLoading } = useCollection<Company>(
    companiesCollection
  );
  const [openSheet, setOpenSheet] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | undefined>(
    undefined
  );

  const handleAddCompany = () => {
    setSelectedCompany(undefined);
    setOpenSheet(true);
  };

  const handleEditCompany = (company: Company) => {
    setSelectedCompany(company);
    setOpenSheet(true);
  };

  const handleDeleteCompany = (companyId: string) => {
    if (!firestore) return;
    const companyDoc = doc(firestore, 'companies', companyId);
    deleteDocumentNonBlocking(companyDoc);
  };

  const handleSaveCompany = (data: CompanyFormValues) => {
    if (!firestore) return;
    if (selectedCompany) {
      const companyDoc = doc(firestore, 'companies', selectedCompany.id);
      updateDocumentNonBlocking(companyDoc, data);
    } else {
      if (companiesCollection) {
        addDocumentNonBlocking(companiesCollection, data);
      }
    }
    setOpenSheet(false);
  };

  return (
    <>
      <div className="flex justify-end">
        <Button
          className="bg-accent hover:bg-accent/90 text-accent-foreground"
          onClick={handleAddCompany}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Añadir Empresa
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Empresas</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Dirección</TableHead>
                <TableHead>Contacto</TableHead>
                <TableHead>
                  <span className="sr-only">Acciones</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    Cargando...
                  </TableCell>
                </TableRow>
              )}
              {!isLoading && companies?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No hay empresas para mostrar.
                  </TableCell>
                </TableRow>
              )}
              {companies?.map((company) => (
                <TableRow key={company.id}>
                  <TableCell className="font-medium">{company.name}</TableCell>
                  <TableCell>{company.address}</TableCell>
                  <TableCell>
                    <div>{company.contactEmail}</div>
                    <div className="text-muted-foreground text-sm">
                      {company.contactPhone}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => handleEditCompany(company)}
                        >
                          Editar
                        </DropdownMenuItem>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              className="w-full justify-start px-2 py-1.5 text-sm font-normal text-destructive hover:bg-destructive/10 focus:bg-destructive/10 focus:text-destructive"
                            >
                              Eliminar
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                ¿Estás seguro?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta acción no se puede deshacer. Esto eliminará
                                permanentemente la empresa.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() =>
                                  handleDeleteCompany(company.id)
                                }
                                className="bg-destructive hover:bg-destructive/90"
                              >
                                Eliminar
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Sheet open={openSheet} onOpenChange={setOpenSheet}>
        <SheetContent>
          <CompanyForm
            company={selectedCompany}
            onSave={handleSaveCompany}
            onClose={() => setOpenSheet(false)}
          />
        </SheetContent>
      </Sheet>
    </>
  );
}
