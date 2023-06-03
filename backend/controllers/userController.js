const UserModel = require("../models/userModel");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Controller for user sign up
const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await user.create({ ...req.body });
  const token = user.createJWT();

  // Check for duplicate email
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    return res
      .status(StatusCodes.CONFLICT)
      .json({ msg: "Email already exists" });
  }

  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

//Controller for user log in

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "All fields are required" });
  }

  const user = await UserModel.findOne({ email });

  if (!user) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Invalid credentials" });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Invalid credentials" });
  }
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = {
  register,
  login,
};
