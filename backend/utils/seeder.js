const Product = require("../models/product");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
// setting dotenv file
dotenv.config({ path: "backend/.env" });

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log("DB CONNECT ERROR", err));

const product = require("../data/product");

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    console.log("Product are deleted");
    await Product.insertMany(product);
    console.log("All prodducts are added");
    process.exit();
  } catch (err) {
    console.log(error.message);
    process.exit();
  }
};

seedProducts();
