const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

const cloudinary = require("cloudinary");

//uncaught Exception handler
process.on("uncaughtException", (err) => {
  console.log(`Error:${err.stack}`);
  console.log("Shutting Down Due to Uncaught Exception");
  process.exit(1);
});

//settingup config file
dotenv.config({ path: "backend/config/config.env" });

//mongodb connection
connectDatabase();

//cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
//console.log(a)=>it will show uncaughtException
//running port
const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server running on: ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});

//unhandaled promise rejection in db
process.on("unhandledRejection", (err) => {
  console.log(`Error:${err.stack}`);
  console.log("Shutting Down Due to Unhandled Promise Rejection");
  server.close(() => {
    process.exit(1);
  });
});
