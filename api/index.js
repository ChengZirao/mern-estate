const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(`${err.name}: ${err.message}`);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });
const DBAtlas = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DBAtlas).then((connection) => {
  console.log("DB connection successful!");
});

const app = express();

app.listen(3333, () => console.log("Server is running!"));
