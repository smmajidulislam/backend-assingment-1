const express = require("express");
const productRouter = express.Router();
const {
  createProduct,
  getProduct,
  getSingelProduct,
  updateSingelProduct,
  deleteSingelProduct,
} = require("../controller/product/productContoller");

productRouter.post("/", createProduct);
productRouter.get("/", getProduct);

productRouter.get("/:id", getSingelProduct);
productRouter.put("/:id", updateSingelProduct);
productRouter.delete("/:id", deleteSingelProduct);
productRouter.use(async (err, req, res, next) => {
  if (err) {
    res.status(401).json({ error: "i am  product route error" });
    next();
  }
  next();
});

module.exports = productRouter;
