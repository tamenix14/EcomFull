// require("dotenv").config({ path: 'config/config.env'});
if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: '/config/config.env' })
const app = require("./app");
const connectDatabase = require('./config/database')
const cloudinary = require("cloudinary");
const path = require("path");

// Handle Uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.stack}`);
  console.log("Shutting down server due to uncaught exception");
  process.exit(1);
});

// Setting up cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// config db
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});

// Handle Unhandled Promise Ejection
process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err.stack}`);
  console.log(`Shutting down the server due to Unhandle Promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});
