import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard General</h1>
      <ul className="space-y-2">
        <li><Link href="/dashboard/superadmin">Superadmin</Link></li>
        <li><Link href="/dashboard/admin">Admin</Link></li>
        <li><Link href="/dashboard/empleado">Empleado</Link></li>
        <li><Link href="/dashboard/usuario">Usuario</Link></li>
      </ul>
    </div>
  );
}
