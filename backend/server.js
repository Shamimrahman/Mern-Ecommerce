const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
//settingup config file
dotenv.config({ path: "backend/config/config.env" });

//uncaught Exception handler
process.on("uncaughtException", (err) => {
  console.log(`Error:${err.stack}`);
  console.log("Shutting Down Due to Uncaught Exception");
  process.exit(1);
});

//mongodb connection
connectDatabase();

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
