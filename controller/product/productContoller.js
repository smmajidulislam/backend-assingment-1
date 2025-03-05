const Product = require("../../models/productModel");
const createProduct = async (req, res) => {
  console.log("i am in");
  const { name, price, category, stock, description } = req.body;
  try {
    const data = new Product({
      name,
      price,
      category,
      stock,
      description,
    });
    await data.save();
    res.status(201).json("Product saved successfully");
  } catch (error) {
    res.status(400).json({ error: "Product did not save DataBase" });
  }
};
const getProduct = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 1;
    const { category, price } = req.query;
    const skip = (page - 1) * limit;
    const priceValue = parseFloat(price);
    const filter = {};
    if (category) {
      filter.category = category;
    }
    if (priceValue >= 50) {
      filter.price = { $gte: 50 };
    } else if (priceValue < 25) {
      filter.price = { $lt: 25 };
    }

    const products = await Product.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const totalProducts = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / limit);
    res.status(200).json({ products, totalPages });
  } catch (error) {
    res.status(400).json({ error: "Product did not save DataBase" });
  }
};

const getSingelProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Product.findById(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: "Product not found" });
  }
};
const updateSingelProduct = async (req, res) => {
  const id = req.params.id;
  const { name, price, category, stock, description } = req.body;
  try {
    const data = await Product.findByIdAndUpdate(
      id,
      {
        name,
        price,
        category,
        stock,
        description,
      },
      { new: true }
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: "Product not found" });
  }
};
const deleteSingelProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Product.findByIdAndDelete(id);
    res.status(200).json("Product deleted successfully");
  } catch (error) {
    res.status(400).json({ error: "Product not found" });
  }
};
module.exports = {
  createProduct,
  getProduct,
  getSingelProduct,
  updateSingelProduct,
  deleteSingelProduct,
};
