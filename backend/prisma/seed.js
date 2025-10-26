// prisma/seed.js
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

dotenv.config();
const prisma = new PrismaClient();

async function main() {
  const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10);

  console.log("🚀 Iniciando seed...");

  // 1️⃣ ROLES
  const rolAdmin = await prisma.rol.upsert({
    where: { nombre: "Administrador" },
    update: {},
    create: {
      nombre: "Administrador",
      descripcion: "Acceso total al sistema (seed)",
    },
  });

  const rolEmpleado = await prisma.rol.upsert({
    where: { nombre: "Empleado" },
    update: {},
    create: {
      nombre: "Empleado",
      descripcion: "Acceso limitado: inventario y ventas (seed)",
    },
  });

  // 2️⃣ EMPRESA
  const empresa = await prisma.empresa.upsert({
    where: { nit: "900000000-0" },
    update: {},
    create: {
      nombre: "Empresa Ejemplo S.A.S.",
      nit: "900000000-0",
      direccion: "Calle Falsa 123",
      telefono: "+57 300 000 0000",
      email: "contacto@example.com",
    },
  });

  // 3️⃣ SUCURSAL (relacionada con la empresa)
  const sucursal = await prisma.sucursal.upsert({
    where: { nombre: "Empresa Ejemplo S.A.S. - Sede Central" },
    update: {},
    create: {
      nombre: "Empresa Ejemplo S.A.S. - Sede Central",
      direccion: "Av. Principal 100",
      telefono: "+57 300 000 0001",
      empresa: { connect: { id: empresa.id } },
    },
  });

  // 4️⃣ INVENTARIO (relacionado con la sucursal)
  const inventarioItem = await prisma.inventario.upsert({
    where: { nombre: "Producto Demo - SSD 256GB" },
    update: {},
    create: {
      nombre: "Producto Demo - SSD 256GB",
      descripcion: "Disco de estado sólido de prueba (seed)",
      cantidad: 10,
      precioUnitario: 120.5,
      sucursal: { connect: { id: sucursal.id } },
    },
  });

  // 5️⃣ USUARIO ADMIN (relacionado con rol y empresa)
  const plainPassword = "AdminSeed123!";
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

  const adminUser = await prisma.usuario.upsert({
    where: { correo: "admin.seed@example.com" },
    update: {},
    create: {
      nombre: "Carlos",
      apellido: "Ramírez",
      correo: "admin.seed@example.com",
      password: hashedPassword,
      rol: { connect: { id: rolAdmin.id } },
      empresa: { connect: { id: empresa.id } },
    },
  });

  // 6️⃣ VENTA (relaciona usuario, inventario y sucursal)
  const venta = await prisma.venta.create({
    data: {
      fecha: new Date(),
      cantidad: 2,
      total: 2 * inventarioItem.precioUnitario,
      usuario: { connect: { id: adminUser.id } },
      inventario: { connect: { id: inventarioItem.id } },
      sucursal: { connect: { id: sucursal.id } },
    },
  });

  // 7️⃣ LOG (relacionado con usuario)
  const log = await prisma.log.create({
    data: {
      usuario: { connect: { id: adminUser.id } },
      accion: "SEED_INSERT",
      descripcion: `Seed inicial: creado usuario ${adminUser.correo} y venta id ${venta.id}`,
      fecha: new Date(),
    },
  });

  console.log("✅ Seed ejecutado correctamente con los siguientes IDs:");
  console.table({
    Rol_Admin: rolAdmin.id,
    Rol_Empleado: rolEmpleado.id,
    Empresa: empresa.id,
    Sucursal: sucursal.id,
    Inventario: inventarioItem.id,
    Usuario_Admin: adminUser.id,
    Venta: venta.id,
    Log: log.id,
  });

  console.log("\n💡 Usuario de prueba:");
  console.log({
    correo: adminUser.correo,
    password: plainPassword,
  });
}

main()
  .catch((e) => {
    console.error("❌ Error en seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
