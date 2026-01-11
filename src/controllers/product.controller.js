import ProductModel from "../models/product.model.js";

export default class ProductController {
  getProducts(req, res) {
    let result = new ProductModel();
    let products = result.fetchProducts();

    res.render("products", { products,userEmail:req.session.userEmail });
  }

  getAddProduct(req, res) {
    return res.render("new-product", { errors: null,userEmail:req.session.userEmail });
  }

  postNewProduct(req, res) {
    const {name,description,price} = req.body;
    const imageUrl = "/images/" + req.file.filename;
    ProductModel.addBook(name,description,price,imageUrl);

    let result = new ProductModel();
    let products = result.fetchProducts();
    res.render("products", { products,userEmail:req.session.userEmail });
  }

  getUpdateProductView(req, res, next) {
    //if product exists return view
    const id = req.params.id;
    const productFound = ProductModel.getById(id);
    if (productFound)
      res.render("update-product", { product: productFound, errors: null ,userEmail:req.session.userEmail});
    //else return error
    else res.status(404).send("Product not found!");
  }

  postUpdateProduct(req, res) {
    ProductModel.update(req.body);

    let result = new ProductModel();
    let products = result.fetchProducts();
    res.render("products", { products,userEmail:req.session.userEmail });
  }

  postDeleteProduct(req, res) {
    const id = req.params.id;
    const productFound = ProductModel.getById(id);
    if (!productFound) return res.status(404).send("Product not found!");

    ProductModel.delete(id);
    res.redirect("/");
  }
}
