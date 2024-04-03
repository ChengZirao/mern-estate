const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    username: req.body.username,
    password: req.body.password,
  });
  console.log(newUser);
  res.status(201).json({
    User: { ...newUser._doc, password: undefined },
  });
});
