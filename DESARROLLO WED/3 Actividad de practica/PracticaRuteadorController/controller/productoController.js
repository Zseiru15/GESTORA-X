import prisma from "../db/prismaClient.js";

// 📘 Obtener todos los productos
export const getProductos = async (req, res) => {
  try {
    const productos = await prisma.inventario.findMany({
      include: { sucursal: true },
    });
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos", error });
  }
};

// 📘 Obtener un producto por ID
export const getProductoById = async (req, res) => {
  const { id } = req.params;
  try {
    const producto = await prisma.inventario.findUnique({
      where: { id: Number(id) },
      include: { sucursal: true },
    });
    if (!producto)
      return res.status(404).json({ message: "Producto no encontrado" });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener producto", error });
  }
};

// 📘 Crear un producto
export const createProducto = async (req, res) => {
  const { nombre, descripcion, cantidad, precioUnitario, sucursalId } = req.body;
  try {
    const nuevo = await prisma.inventario.create({
      data: { nombre, descripcion, cantidad, precioUnitario, sucursalId },
    });
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ message: "Error al crear producto", error });
  }
};

// 📘 Actualizar un producto
export const updateProducto = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, cantidad, precioUnitario } = req.body;
  try {
    const actualizado = await prisma.inventario.update({
      where: { id: Number(id) },
      data: { nombre, descripcion, cantidad, precioUnitario },
    });
    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar producto", error });
  }
};

// 📘 Eliminar un producto
export const deleteProducto = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.inventario.delete({ where: { id: Number(id) } });
    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar producto", error });
  }
};
