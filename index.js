import express from "express";
import ProductController from "./src/controllers/product.controller.js";
import path from "path";
import expressEjsLayouts from "express-ejs-layouts";
import validateFormData from "./src/middlewares/validation.middleware.js";
import { uploadFile } from "./src/middlewares/file_upload.middleware.js";
import UserController from "./src/controllers/user.controller.js";
import session from "express-session";
import { auth } from "./src/middlewares/auth.middleware.js";
import cookieParser from "cookie-parser";
import { setLastVisited } from "./src/middlewares/lastVisited.middleware.js";

const server = express();
server.use(express.urlencoded({ extended: true }));

server.use(cookieParser());

server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "views"));
server.use(expressEjsLayouts);
server.use(express.static("src/views"));
server.use(express.static("public"));



server.use(session({
    secret:'1234',
    resave:false,
    saveUninitialized:true,
    cookie:{secure:false},
}));

//create an instance of product controller
const productController = new ProductController();
const userController = new UserController();

server.get('/register', userController.getRegister);
server.post('/register', userController.addUser);
server.get('/login', userController.getLogin);
server.post('/login', userController.loginUser);
server.get('/logout',userController.logoutUser);
server.get("/",auth,setLastVisited, productController.getProducts);
server.get("/new",auth, productController.getAddProduct);
server.get("/update-product/:id",auth, productController.getUpdateProductView);
server.post("/",auth, uploadFile.single("imageUrl"), validateFormData, productController.postNewProduct);
server.post('/update-product',auth,productController.postUpdateProduct);
server.post('/delete-product/:id',auth,productController.postDeleteProduct);

server.listen(3400);
console.log("Server is listening on port 3400");
