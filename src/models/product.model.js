import products from "../assets/products.js";

export default class ProductModel {
  fetchProducts() {
    return products;
  }

  static delete(id){
    const index = products.findIndex(p=>p.id == id);
    products.splice(index,1);
  }

static update(productObj) {
  const index = products.findIndex(p => p.id == productObj.id);
  
  if (index === -1) return;

  const updatedProduct = {
    id: products[index].id,            // keep original ID
    title: productObj.name,            // map name → title
    description: productObj.description,
    price: parseFloat(productObj.price),
    image: productObj.imageUrl,        // map imageUrl → image
    category: products[index].category // keep original category
  };

  products[index] = updatedProduct;
}


  static addBook(name,description,price,imageUrl) {
    const newProduct = {
      id: products.length + 1,
      title: name,
      description: description,
      price: parseFloat(price),
      image: imageUrl,
      category: "books"
    };

    products.push(newProduct);
    console.log("✅ Product Added:", newProduct);
    console.log("📦 Updated Products:", products);
  }

  static getById(id){
    return products.find(p=>p.id==id);
  }
}
