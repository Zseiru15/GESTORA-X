import express from "express";
import {
  getProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto,
} from "../controllers/productoController.js";

const router = express.Router();

// Rutas del CRUD
router.get("/", getProductos);
router.get("/:id", getProductoById);
router.post("/", createProducto);
router.put("/:id", updateProducto);
router.delete("/:id", deleteProducto);

export default router;
