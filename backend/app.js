console.log("Iniciando servidor...");
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

app.post("/api/login", async (req, res) => {
  const { correo, password } = req.body;

  try {
    const usuario = await prisma.usuario.findUnique({
      where: { correo },
      include: { rol: true },
    });

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    res.json({
      message: "Inicio de sesión exitoso",
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        rol: usuario.rol.nombre,
      },
    });
  } catch (error) {
    console.error("Error en /api/login:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// ------------------------------
// 🔍 RUTA: Test de conexión
// ------------------------------
app.get("/", (req, res) => {
  res.send("API Gestora X funcionando 🚀");
});

export default app;