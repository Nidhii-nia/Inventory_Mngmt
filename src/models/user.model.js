let users = [];

export default class UserModel {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  registerUser(user) {
    users.push(user);
  }

  authenticateUser(email,password) {
    return users.find(
      (user) => user.email === email && user.password === password
    );
  }
}
