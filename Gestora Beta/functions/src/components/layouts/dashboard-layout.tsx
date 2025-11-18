'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import {
  Mountain,
  LayoutDashboard,
  Building2,
  Package,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Header from '@/components/header';
import { Separator } from '@/components/ui/separator';
import { useAuth, useUser } from '@/firebase';
import { signOut } from 'firebase/auth';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/companies', icon: Building2, label: 'Empresas' },
  { href: '/inventory', icon: Package, label: 'Inventario' },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const auth = useAuth();
  const { user, isUserLoading } = useUser();

  const handleLogout = async () => {
    if (auth) {
      await signOut(auth);
      // The withAuth HOC will handle the redirection to /login
    }
  };
  
  if (isUserLoading || !user) {
     return <div className="flex min-h-screen items-center justify-center bg-background p-4">Cargando...</div>;
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div
            className={cn(
              'flex items-center gap-2 p-2 transition-all duration-200',
              'group-data-[collapsible=icon]:justify-center'
            )}
          >
            <Mountain
              className={cn(
                'h-8 w-8 shrink-0 text-accent transition-all duration-200'
              )}
            />
            <span
              className={cn(
                'text-lg font-bold font-headline transition-all duration-200 group-data-[collapsible=icon]:opacity-0'
              )}
            >
              GestoraX
            </span>
          </div>
        </SidebarHeader>
        <SidebarContent>
           <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} passHref>
                  <SidebarMenuButton
                    isActive={pathname.startsWith(item.href)}
                    tooltip={item.label}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <Separator />
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Cerrar Sesión" onClick={handleLogout}>
                <LogOut />
                <span>Cerrar Sesión</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <Header />
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
