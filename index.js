import express from "express";
import ProductController from "./src/controllers/product.controller.js";
import path from "path";
import expressEjsLayouts from "express-ejs-layouts";
import validateFormData from "./src/middlewares/validation.middleware.js";

const server = express();

server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "views"));

server.use(expressEjsLayouts);
server.use(express.static("src/views"));
server.use(express.urlencoded({ extended: true }));

//create an instance of product controller
const productController = new ProductController();

server.get("/", productController.getProducts);
server.get("/new", productController.getAddProduct);
server.get("/update-product/:id", productController.getUpdateProductView);
server.post("/", validateFormData, productController.postNewProduct);
server.post('/update-product',productController.postUpdateProduct);
server.post('/delete-product/:id',productController.postDeleteProduct);

server.listen(3400);
console.log("Server is listening on port 3400");
