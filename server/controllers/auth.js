const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");
const generateToken = require('../utils/generateToken');
const bcrypt = require("bcryptjs");

// Login user
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorResponse("Please register first", 401));
    }
    const compareUserPassword =await bcrypt.compare(password,user.password);
    if(!compareUserPassword){
      return next(new ErrorResponse("Invalid Password", 401));
    }

    const token = generateToken(user._id)
    return res.status(200).json({ sucess: true, token });  
  } catch (err) {
    next(err);
  }
};

// Register user
exports.register = async (req, res, next) => {
  const { fullname, email, password } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password,10);
    const user = await User.create({fullname,email,password:passwordHash,});
    const token = generateToken(user._id)
    return res.status(200).json({ sucess: true, token });

  } catch (err) {
    next(err);
  }
};