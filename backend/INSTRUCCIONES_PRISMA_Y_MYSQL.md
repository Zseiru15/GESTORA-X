# 🧭 Guía de Uso de Prisma + MySQL

Esta guía explica cómo configurar, sincronizar y usar **Prisma ORM** junto con **MySQL** en el proyecto **GESTORA X**, asegurando una conexión estable entre el backend Node.js y la base de datos.

---

## ⚙️ Instalación de dependencias

Instala Prisma y el cliente de MySQL:

```bash
npm install prisma --save-dev
npm install @prisma/client
```

Inicializa Prisma en tu proyecto:

```bash
npx prisma init
```

Esto crea el archivo de configuración:
```
/prisma/schema.prisma
```

---

## 🧩 Configuración de la base de datos

En el archivo `.env`, agrega tu conexión a MySQL (ajustando credenciales y nombre de BD):

```bash
DATABASE_URL="mysql://usuario:contraseña@localhost:3306/nombre_del_proyecto"
```

Verifica que tu base de datos esté creada en MySQL antes de continuar:

```bash
mysql -u root -p
CREATE DATABASE gestora_x;
```

---

## 🏗️ Migraciones (estructura de la BD)

Cada vez que modifiques tus modelos Prisma (en `schema.prisma`), ejecuta:

```bash
npx prisma migrate dev --name init
```
> 📘 Crea o actualiza las tablas en tu base de datos local y genera automáticamente el cliente Prisma.

Si deseas **ver el estado actual de la BD** sin ejecutar cambios:

```bash
npx prisma migrate status
```

Para aplicar las migraciones existentes en otro entorno (producción, VPS, etc.):

```bash
npx prisma migrate deploy
```

---

## 🌱 Carga de datos iniciales (Seed)

Para insertar datos de prueba automáticos en todas las tablas (roles, usuarios, empresas, etc.), usa el seed.

### Configuración en `package.json`

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon src/server.js",
    "seed": "node prisma/seed.js",
    "start": "node src/server.js"
  },
```

### Ejecución del seed

```bash
npm run seed
```

> ⚠️ Asegúrate de que tu archivo `prisma/seed.js` esté correctamente configurado y que las llaves foráneas sean válidas antes de correr el seed.

---

## 🔍 Visualizar los datos

Abre el **Prisma Studio** para gestionar tus datos de forma visual (muy útil para pruebas):

```bash
npx prisma studio
```

Esto abrirá una interfaz local en el navegador (por defecto en `http://localhost:5555`).

---

## 🔧 Generación del cliente Prisma

Cada vez que modifiques los modelos o ejecutes migraciones, genera el cliente actualizado:

```bash
npx prisma generate
```

> 🔄 Esto asegura que los cambios en tus modelos estén disponibles para el backend en tiempo real.

---

## 🧠 Comandos útiles resumidos

| Comando | Descripción |
|----------|-------------|
| `npx prisma init` | Inicializa Prisma en el proyecto |
| `npx prisma migrate dev --name init` | Crea/actualiza tablas en desarrollo |
| `npx prisma migrate deploy` | Aplica migraciones en producción |
| `npx prisma generate` | Regenera el cliente Prisma |
| `npm run seed` | Carga datos falsos en las tablas |
| `npx prisma studio` | Abre la interfaz gráfica para visualizar y editar datos |
| `npx prisma migrate status` | Verifica el estado de las migraciones |

---

## 🧩 Ejemplo de estructura del proyecto

```
gestora-x/
│
├── prisma/
│   ├── schema.prisma
│   └── seed.js
│
├── src/
│   ├── server.js
│   ├── routes/
│   ├── controllers/
│   └── models/
│
├── .env
├── package.json
└── README.md
```

---

## 💡 Buenas prácticas

1. Siempre **genera el cliente Prisma** después de modificar los modelos.
2. No ejecutes el seed varias veces sin limpiar la BD o podrías duplicar datos.
3. Usa variables de entorno `.env` para credenciales seguras.
4. Antes de subir cambios al VPS, ejecuta:
   ```bash
   npx prisma migrate deploy
   ```
5. Para entornos de producción, evita el comando `migrate dev`.

---

## ✅ Ejemplo rápido de uso en código

```js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Obtener usuarios
const usuarios = await prisma.usuario.findMany();

// Crear nuevo registro
await prisma.usuario.create({
  data: {
    nombre: "Carlos Pérez",
    correo: "carlos@example.com",
    rolId: 1,
  },
});
```

---

## 🧭 Autoría y mantenimiento

Guía técnica creada para **GESTORA X**

**Mantenido por:** 
- [Sneyder Camilo Ordoñez Uscátegui](https://github.com/Zseiru15)
- [Dario Enrique Pulgarin Ramirez](https://github.com/Dariopul)
- [Sofia Alejandra Bacca Melo](https://github.com/SofiaBacca)
- [Diego Alejandro](https://github.com/IngeAlejo)
- [Manuel Rodriguez](https://github.com/TheMacnus)
- [Frank Ordoñez](https://github.com/Franckk24)

---

> 🚀 *"Con Prisma y MySQL, tu backend se vuelve tan limpio como tu código."*
