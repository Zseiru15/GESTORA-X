// INSTALAR Y REQUERIR EXPRESS
const express = require("express");
const methodOverride = require("method-override");
const app = express();

// CONFIGURAMOS LA CARPETA ESTATICA
const path = require("path");
const publicPath = path.resolve(__dirname, "./public");
app.use(express.static(publicPath));

// CONFIGURACION DE FORMULARIOS
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));

// INICIAMOS EL SERVIDOR
const puerto = 3000;
app.listen(puerto, () => {
    console.log(`✅ Servidor corriendo en: http://localhost:${puerto}`);
});
app.set("view engine", "ejs");

// REQUERIMOS Y UTILIZAMOS LAS RUTAS
const mainRoute = require("./routes/mainRoute");
const usersRoute = require("./routes/usersRoute");
const productRoute = require("./routes/productRoute");

app.use("/", mainRoute);
app.use("/users", usersRoute);
app.use("/products", productRoute);
app.get('/products/:id', (req, res) => res.render('productDetail', { product: {} }));
app.get('/cart', (req, res) => res.render('cart', { cart: [], total: 0 }));
app.get('/register', (req, res) => res.render('register'));
app.get('/login', (req, res) => res.render('login'));
app.get('/products/create', (req, res) => res.render('productForm'));
app.get('/products/edit/:id', (req, res) => res.render('editProduct', { product: {} }));

// ============================
// ❌ MANEJO DE ERRORES 404
// ============================
app.use((req, res) => {
  res.status(404).render("404", {
    title: "Página no encontrada",
    message: "Lo sentimos, la página que buscas no existe."
  });
});