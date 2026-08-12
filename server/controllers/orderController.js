import Order from "../models/Order.js";
import ApiFeatures from "../utils/apiFeatures.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";

export const getOrders = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Order.find(), req.query)
    .filter()
    .search(["status", "paymentMethod", "shippingAddress.fullName"])
    .sort()
    .paginate();

  const orders = await features.query.populate("user", "name email");
  const totalOrders = await Order.countDocuments();

  res.status(200).json({
    success: true,
    count: orders.length,
    total: totalOrders,
    page: features.page,
    limit: features.limit,
    data: orders,
  });
});

export const getOrderById = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate("user", "name email");

  if (!order) {
    return next(new AppError(404, "Order not found."));
  }

  res.status(200).json({
    success: true,
    data: order,
  });
});

export const createOrder = catchAsync(async (req, res, next) => {
  const order = await Order.create({
    ...req.body,
    user: req.user ? req.user._id : req.body.user,
  });

  res.status(201).json({
    success: true,
    message: "Order created successfully.",
    data: order,
  });
});

export const updateOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!order) {
    return next(new AppError(404, "Order not found."));
  }

  res.status(200).json({
    success: true,
    message: "Order updated successfully.",
    data: order,
  });
});

export const deleteOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findByIdAndDelete(req.params.id);

  if (!order) {
    return next(new AppError(404, "Order not found."));
  }

  res.status(200).json({
    success: true,
    message: "Order deleted successfully.",
  });
});
