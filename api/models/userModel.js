/* eslint-disable arrow-body-style */
// crypto is a built-in nodejs module
// const crypto = require("crypto");
const mongoose = require("mongoose");
// const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide us your username!"],
      unique: [true, "This username has been already in use!"],
    },
    password: {
      type: String,
      required: [true, "Please set your password!"],
      minLength: [8, "Your password length should not be less than 8!"],
      // Never show the password in any output
      select: false,
    },
  },
  { timestamps: true }
);

// Hash(Encrypt) the password before save the user document into the database
userSchema.pre("save", async function (next) {
  // .isModified('password) will only return true if you are changing the password.
  if (!this.isModified("password")) return next();

  // Hash(encrypt) the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
