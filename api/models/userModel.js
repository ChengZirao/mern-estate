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
    email: {
      type: String,
      required: [true, "Please tell us your email address!"],
      unique: true,
      // Convert the email string to lowercase
      lowercase: true,
      // validate: {
      //   validator: validator.isEmail,
      //   message: "Please enter a valid email address!",
      // },
    },
    password: {
      type: String,
      required: [true, "Please set your password!"],
      minLength: [8, "Your password length should not be less than 8!"],
      // Never show the password in any output
      select: false,
    },
    avatar: {
      type: String,
      default:
        "https://pics0.baidu.com/feed/3bf33a87e950352ae8acd52954f19efeb3118b04.jpeg?token=e298da5c375b4d07ca3c4f18369cd393",
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

userSchema.methods.verifyPassword = async (candidatePassword, userPassword) => {
  // Compare the original password the user inputted with the encrypted password stored in the database
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
