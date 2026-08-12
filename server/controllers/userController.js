import User from "../models/User.js";
import bcrypt from "bcryptjs";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";
import generateToken from "../utils/generateToken.js";
import ApiFeatures from "../utils/apiFeatures.js";

export const registerUser = catchAsync(async (req, res, next) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password) {
    return next(new AppError(400, "Name, email, and password are required."));
  }

  const exists = await User.findOne({ email });
  if (exists) {
    return next(new AppError(400, "User already exists."));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    phone: phone || "",
  });

  res.status(201).json({
    success: true,
    message: "User registered successfully.",
    token: generateToken(user._id),
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
  });
});

export const loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError(400, "Email and password are required."));
  }

  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError(401, "Invalid email or password."));
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new AppError(401, "Invalid email or password."));
  }

  res.status(200).json({
    success: true,
    token: generateToken(user._id),
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
  });
});

export const getUsers = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(User.find().select("-password"), req.query)
    .filter()
    .search(["name", "email", "phone"])
    .sort()
    .paginate();

  const users = await features.query;
  const totalUsers = await User.countDocuments();

  res.status(200).json({
    success: true,
    count: users.length,
    total: totalUsers,
    page: features.page,
    limit: features.limit,
    data: users,
  });
});

export const getUserById = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id).select("-password");

  if (!user) {
    return next(new AppError(404, "User not found."));
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

export const updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).select("-password");

  if (!user) {
    return next(new AppError(404, "User not found."));
  }

  res.status(200).json({
    success: true,
    message: "User updated successfully.",
    data: user,
  });
});

export const deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(new AppError(404, "User not found."));
  }

  res.status(200).json({
    success: true,
    message: "User deleted successfully.",
  });
});

export const getMe = catchAsync(async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: req.user,
  });
});