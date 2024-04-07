const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const createAndSendToken = (user, statusCode, res) => {
  // 1) Create token
  /**
   * Param 1: payload
   * Param 2: secret key, more than 32 character length is recommended
   * Param 3: optional settings, here I set jwt token expire time
   * Return: generated token, based on payload message, secret key and optional settings
   */
  // To decode the token, visit "https://jwt.io/"
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  // 2) Create cookie, store the JWT token into the cookie
  const cookieOptions = {
    // Cookie expire time should be aligned with jwt expire time
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 60 * 60 * 1000
    ),
    // Cookie cannot be accessed or modified in any way by the browser, which can prevent cross-site scripting attack
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production")
    // Cookie will only be sent on an encrypted connection. E.g. https
    //! When setting to true, won't be worked at postman, so only in production mode that I will add this field
    cookieOptions.secure = true;

  /**
   * Param 1: name of the cookie
   * Param 2: data that want to send in the cookie
   * Param 3: optional settings
   */
  res.cookie("jwt", token, cookieOptions);

  // 3) Hide password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  });
  console.log(newUser);
  newUser.password = undefined;
  res.status(201).json({
    // User: { ...newUser._doc, password: undefined },
    User: newUser,
  });
});

exports.signin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }

  // 2) Check if user exists && password is correct
  // Use '+' in .select() to show the field that is defaultly hidden
  const user = await User.findOne({ email: email }).select("+password");
  console.log(user);
  if (!user || !(await user.verifyPassword(password, user.password))) {
    // 401 means 'unauthorized'
    return next(new AppError("Incorrect email or password!", 401));
  }

  // If everything is ok, send token to the client
  createAndSendToken(user, 200, res);
});

exports.googleAuth = catchAsync(async (req, res, next) => {
  // 1) Check if the user exists
  const user = await User.findOne({ email: req.body.email }).select("-__v");
  if (user) {
    createAndSendToken(user, 200, res);
  } else {
    // If user does not exist, sign up an account first
    //! Have to create a password for this user, otherwise sign up won't work
    // Create a random 16-character-length password
    const generatedPassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(generatedPassword, 12);
    const newUser = await User.create({
      username:
        // Convert username to lowercase + 4 random numbers format
        // E.g. user "Zirao Cheng" will be converted to "ziraocheng8459"
        // req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
        req.body.name.split(" ").join("").toLowerCase() +
        (Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000),
      email: req.body.email,
      password: hashedPassword,
      avatar: req.body.photo,
    });
    createAndSendToken(newUser, 201, res);
  }
});
