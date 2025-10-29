import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("123456", 10); // 👈 contraseña
  const correo = "admin@gestorax.com"; // 👈 usuario

  const usuario = await prisma.usuario.create({
    data: {
      nombre: "Administrador",
      correo,
      password: hashedPassword,
      rol: {
        connectOrCreate: {
          where: { nombre: "Administrador" },
          create: { nombre: "Administrador" },
        },
      },
    },
  });

  console.log("✅ Usuario creado:", usuario);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
