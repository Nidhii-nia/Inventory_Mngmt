import { body, validationResult } from "express-validator";

const validateFormData = async (req, res, next) => {
  //1. setup rules
  const rules = [
    body("name").notEmpty().withMessage("Name is required"),
    body("price").isFloat({ gt: 0 }).withMessage("Price not valid"),
    body("imageUrl").isURL().withMessage("Invalid URL"),
  ];

  //2.run those rules can be i/o therefore use promises
  await Promise.all(rules.map((rules) => rules.run(req)));

  //3.check if there are any errors after running the rules
  var ValErr = validationResult(req);

  //if errors return error message
  if (!ValErr.isEmpty()) {
    return res.render("new-product", {
      errors: ValErr.array()[0].msg,
    });
  }

  next();
};

export default validateFormData;
