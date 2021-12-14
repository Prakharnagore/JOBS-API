const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
// const jwt = require("jsonwebtoken");
const { BadRequestError, UnauthenticatedError } = require("../errors/index");
//const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  /**  Token is generatedd using mongoose instance methods 
   * const token = jwt.sign({ userId: user._id, name: user.name }, "jwtSecret", {
    expiresIn: "30d",
  }); */

  // const { name, email, password } = req.body;
  // if (!name || !email || !password) {
  //   throw new BadRequestError("Please Provide name,email or password");
  // }
  /* THIS BCRYPT IS SET IN ANOTHER MIDDLEWARE IN USER SCHEMA
  const { name, email, password } = req.body;

  //generate hash password with bcryptjs
  const salt = await bcrypt.genSalt(10);
  const hashpassword = await bcrypt.hash(password, salt);
  const tempUser = { name, email, password: hashpassword };
*/
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
  //res
  //.status(StatusCodes.CREATED)
  //.json({ user: { name: user.getName() /*{ name: user.name */ }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please Provide name,email or password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  //compare passsword
  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = { login, register };
