/* eslint-disable arrow-body-style */
// crypto is a built-in nodejs module
const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
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
      minLength: 8,
      // Never show the password in any output
      select: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
