const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");
const globalErrHandler = require("./controllers/errorController");

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

app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}`)
);

// Allow cross origin
app.use(cors());
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use(globalErrHandler);
