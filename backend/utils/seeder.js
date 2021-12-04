const Product = require("../models/product");
const dotenv = require("dotenv");
const connectDatabase = require("../config/database");
const products = require("../data/products.json");
const { connect } = require("../app");

//setting config
dotenv.config({ path: "backend/config/config.env" });

//connecdb
connectDatabase();

//products delete from db and added to db
const seedProducts = async () => {
  try {
    await Product.deleteMany();
    console.log("All products are deleted");
    await Product.insertMany(products);
    console.log("All products are Added");
    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

seedProducts();
