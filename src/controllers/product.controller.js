import path from "path";
import ProductModel from "../models/product.model.js";

export default class ProductController {
  getProducts(req, res) {
    let result = new ProductModel();
    let products = result.fetchProducts();

    res.render("products", { products });
  }

  getAddProduct(req, res) {
    return res.render("new-product", { errors: null });
  }

  postNewProduct(req, res) {
    ProductModel.addBook(req.body);

    let result = new ProductModel();
    let products = result.fetchProducts();
    res.render("products", { products });
  }

  getUpdateProductView(req, res, next) {
    //if product exists return view
    const id = req.params.id;
    const productFound = ProductModel.getById(id);
    if (productFound)
      res.render("update-product", { product: productFound, errors: null });
    //else return error
    else res.status(404).send("Product not found!");
  }

  postUpdateProduct(req, res) {
    ProductModel.update(req.body);

    let result = new ProductModel();
    let products = result.fetchProducts();
    res.render("products", { products });
  }

  postDeleteProduct(req, res) {
    const id = req.params.id;
    const productFound = ProductModel.getById(id);
    if (!productFound) return res.status(404).send("Product not found!");

    ProductModel.delete(id);
    res.redirect("/");
  }
}
