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
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { useCollection, useFirebase, WithId, useMemoFirebase } from '@/firebase';
import { collection, doc } from 'firebase/firestore';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  addDocumentNonBlocking,
  deleteDocumentNonBlocking,
  updateDocumentNonBlocking,
} from '@/firebase/non-blocking-updates';
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
import withAuth from '@/firebase/with-auth';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const productSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  description: z.string().min(1, 'La descripción es obligatoria'),
  price: z.coerce.number().min(0, 'El precio no puede ser negativo'),
  quantity: z.coerce.number().min(0, 'La cantidad no puede ser negativa'),
  companyId: z.string().min(1, 'La empresa es obligatoria'),
});

type ProductFormValues = z.infer<typeof productSchema>;
type Product = WithId<ProductFormValues>;
type Company = WithId<{ name: string }>;

function ProductForm({
  product,
  companies,
  onSave,
  onClose,
}: {
  product?: Product;
  companies: Company[];
  onSave: (data: ProductFormValues) => void;
  onClose: () => void;
}) {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: product || {
      name: '',
      description: '',
      price: 0,
      quantity: 0,
      companyId: '',
    },
  });

  const onSubmit = (data: ProductFormValues) => {
    onSave(data);
    onClose();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <SheetHeader>
          <SheetTitle>{product ? 'Editar Producto' : 'Añadir Nuevo Producto'}</SheetTitle>
          <SheetDescription>
            {product
              ? 'Actualice los detalles del producto.'
              : 'Rellene los detalles para crear un nuevo producto.'}
          </SheetDescription>
        </SheetHeader>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del Producto</FormLabel>
              <FormControl>
                <Input placeholder="Laptop Pro X2" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea placeholder="Descripción detallada del producto." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="companyId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Empresa</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar una empresa" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {companies.map((company) => (
                    <SelectItem key={company.id} value={company.id}>
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
            <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Precio</FormLabel>
                <FormControl>
                    <Input type="number" placeholder="1250.00" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Cantidad (Stock)</FormLabel>
                <FormControl>
                    <Input type="number" placeholder="100" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        <Button type="submit" className="w-full mt-4 bg-accent hover:bg-accent/90 text-accent-foreground">
          Guardar Producto
        </Button>
      </form>
    </Form>
  );
}

function InventoryPage() {
  const { firestore } = useFirebase();

  const productsCollection = useMemoFirebase(() => (firestore ? collection(firestore, 'products') : null), [firestore]);
  const companiesCollection = useMemoFirebase(() => (firestore ? collection(firestore, 'companies') : null), [firestore]);

  const { data: products, isLoading: isLoadingProducts } = useCollection<Product>(productsCollection);
  const { data: companies, isLoading: isLoadingCompanies } = useCollection<Company>(companiesCollection);

  const [openSheet, setOpenSheet] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);

  const handleAddProduct = () => {
    setSelectedProduct(undefined);
    setOpenSheet(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setOpenSheet(true);
  };

  const handleDeleteProduct = (productId: string) => {
    if (!firestore) return;
    const productDoc = doc(firestore, 'products', productId);
    deleteDocumentNonBlocking(productDoc);
  };

  const handleSaveProduct = (data: ProductFormValues) => {
    if (!firestore || !productsCollection) return;
    if (selectedProduct) {
      const productDoc = doc(firestore, 'products', selectedProduct.id);
      updateDocumentNonBlocking(productDoc, data);
    } else {
      addDocumentNonBlocking(productsCollection, data);
    }
  };
  
  const isLoading = isLoadingProducts || isLoadingCompanies;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-headline">Gestión de Inventario</h1>
        <Button 
            className="bg-accent hover:bg-accent/90 text-accent-foreground" 
            onClick={handleAddProduct}
            disabled={isLoading || !companies?.length}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Añadir Producto
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Productos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>
                  <span className="sr-only">Acciones</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    Cargando...
                  </TableCell>
                </TableRow>
              )}
              {!isLoading && products?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    No hay productos para mostrar.
                  </TableCell>
                </TableRow>
              )}
              {products?.map((product) => {
                const status = product.quantity > 0 ? 'En Stock' : 'Agotado';
                return (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell className="text-muted-foreground truncate max-w-xs">{product.description}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={status === 'En Stock' ? 'secondary' : 'destructive'}
                      className={status === 'En Stock' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}
                    >
                      {status}
                    </Badge>
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
                        <DropdownMenuItem onClick={() => handleEditProduct(product)}>Editar</DropdownMenuItem>
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
                              <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta acción no se puede deshacer. Esto eliminará permanentemente el producto.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteProduct(product.id)}
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
              )})}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
       <Sheet open={openSheet} onOpenChange={setOpenSheet}>
        <SheetContent className="overflow-y-auto">
          {companies && (
            <ProductForm
              product={selectedProduct}
              companies={companies}
              onSave={handleSaveProduct}
              onClose={() => setOpenSheet(false)}
            />
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default withAuth(InventoryPage);
