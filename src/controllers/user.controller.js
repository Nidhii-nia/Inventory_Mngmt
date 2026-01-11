import products from "../assets/products.js";
import UserModel from "../models/user.model.js";

export default class UserController {
  getRegister(req, res) {
    res.render("register");
  }
  getLogin(req, res) {
    res.render("login",{errors:null});
  }

  addUser(req, res) {
    const { name, email, password } = req.body;
    const user = {
      name,
      email,
      password,
    };
    const newReg = new UserModel();

    newReg.registerUser(user);
    res.render("login",{errors:null});
  }

  loginUser(req, res) {
    const { email, password } = req.body;

    const auth = new UserModel();
    const valid = auth.authenticateUser(email,password);
    req.session.userEmail = email;
    if (valid) res.render('products',{products,userEmail:req.session.userEmail});
    else res.render('login',{ errors: "Invalid Credentials" });
  }

  logoutUser(req,res){
    req.session.destroy((err)=>{
      if(err){
        console.log(err);        
      }else{
        res.clearCookie('lastVisited');
        res.redirect('/login');
      }
    })
  }
}
