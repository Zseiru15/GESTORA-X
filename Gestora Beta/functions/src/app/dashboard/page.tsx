'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DollarSign,
  Users,
  CreditCard,
  Package,
  Activity,
} from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useCollection, useFirebase, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import { useMemo } from 'react';
import { es } from 'date-fns/locale';
import { format } from 'date-fns';
import withAuth from '@/firebase/with-auth';

const chartConfig = {
  sales: {
    label: 'Ventas',
    color: 'hsl(var(--accent))',
  },
};

function DashboardPage() {
  const { firestore } = useFirebase();

  const productsCollection = useMemoFirebase(() => firestore ? collection(firestore, 'products') : null, [firestore]);
  const { data: productsData, isLoading: isLoadingProducts } = useCollection(productsCollection);

  const totalRevenue = 0; // Funcionalidad de ventas eliminada
  const totalSales = 0; // Funcionalidad de ventas eliminada
  const totalUsers = 1; // Only admin user
  const activeProducts =
    productsData?.filter((p) => p.quantity > 0).length || 0;

  const salesByMonth = useMemo(() => {
     const monthNames = Array.from({ length: 12 }, (_, i) =>
        format(new Date(0, i), 'MMMM', { locale: es })
    );
    const monthlyData: { [key: string]: number } = {};
    monthNames.forEach(month => {
        const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
        monthlyData[capitalizedMonth] = 0;
    });
    return Object.entries(monthlyData).map(([month, sales]) => ({ month, sales }));
  }, []);

  const isLoading = isLoadingProducts;

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Ingresos Totales
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalRevenue.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              Funcionalidad de ventas eliminada
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Usuarios
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
             <div className="text-2xl font-bold">+{totalUsers}</div>
                <p className="text-xs text-muted-foreground">
                  Usuario administrador
                </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventas</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
              <>
                <div className="text-2xl font-bold">+{totalSales}</div>
                <p className="text-xs text-muted-foreground">
                  Funcionalidad de ventas eliminada
                </p>
              </>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Productos Activos
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-2xl font-bold">Cargando...</div>
            ) : (
              <>
                <div className="text-2xl font-bold">{activeProducts}</div>
                <p className="text-xs text-muted-foreground">
                  Productos actualmente en stock
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <Activity /> Visión General (Demo)
            </CardTitle>
            <CardDescription>
                Gráfico de demostración. La funcionalidad de ventas ha sido eliminada.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer config={chartConfig} className="h-[350px] w-full">
              <ResponsiveContainer>
                {isLoading ? (
                  <div className="flex items-center justify-center h-full">Cargando datos del gráfico...</div>
                ) : (
                  <BarChart data={salesByMonth}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <YAxis
                      tickFormatter={(value) => `$${value}k`}
                    />
                    <Tooltip
                      cursor={{ fill: 'hsl(var(--muted))' }}
                      content={<ChartTooltipContent
                        formatter={(value, name) => [`$${(Number(value) * 1000).toFixed(2)}`, 'Ventas']}
                      />}
                    />
                    <Bar
                      dataKey="sales"
                      fill="hsl(var(--accent))"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default withAuth(DashboardPage);
