/*
  Warnings:

  - A unique constraint covering the columns `[nombre]` on the table `Inventario` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nombre]` on the table `Sucursal` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Inventario_nombre_key` ON `Inventario`(`nombre`);

-- CreateIndex
CREATE UNIQUE INDEX `Sucursal_nombre_key` ON `Sucursal`(`nombre`);
