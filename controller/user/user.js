const bcrypt = require("bcryptjs");
const User = require("../../models/UserModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const singup = async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = new User({ email, password: hashedPassword, role: "user" });
    await user.save();
    res.json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Signup failed" });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ error: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

  const token = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token });
};
const profile = async (req, res) => {
  const token = req.user;

  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = token;
    const user = await User.findById(decoded._id);
    res.json({ email: user.email });
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};
const user = async (req, res) => {
  try {
    const user = await User.find({});
    res.json(user);
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};
module.exports = { singup, login, profile, user };
