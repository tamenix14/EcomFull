// require("dotenv").config({ path: 'config/config.env'});
if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: '/config/config.env' })
const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyparser = require("body-parser");

const fileUpload = require("express-fileupload");

const errorMiddleware = require("./middlewares/error");
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());

// Import all routes
const products = require("./routes/product");
const user = require("./routes/user");
const order = require("./routes/order");
const payment = require("./routes/payment");

app.use("/api", products);
app.use("/api", user);
app.use("/api", order);
app.use("/api", payment);

if (process.env.NODE_ENV === "PRODUCTION") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"))
  })
}

// Middleware to handle errors
app.use(errorMiddleware);


module.exports = app;
