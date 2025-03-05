const mongoose = require("mongoose");
const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
  } catch (error) {
    console.log("DATABASE CONNECTION ERROR", error);
  }
};
module.exports = dbConnect;
