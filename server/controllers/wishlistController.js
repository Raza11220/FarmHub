import Wishlist from "../models/Wishlist.js";
import ApiFeatures from "../utils/apiFeatures.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";

export const getWishlist = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Wishlist.find(), req.query)
    .filter()
    .sort()
    .paginate();

  const wishlist = await features.query.populate("user", "name email").populate("animal");
  const totalWishlist = await Wishlist.countDocuments();

  res.status(200).json({
    success: true,
    count: wishlist.length,
    total: totalWishlist,
    page: features.page,
    limit: features.limit,
    data: wishlist,
  });
});

export const addToWishlist = catchAsync(async (req, res, next) => {
  const existing = await Wishlist.findOne({
    user: req.body.user || req.user?._id,
    animal: req.body.animal,
  });

  if (existing) {
    return next(new AppError(400, "This animal is already in the wishlist."));
  }

  const wishlistItem = await Wishlist.create({
    user: req.body.user || req.user?._id,
    animal: req.body.animal,
  });

  res.status(201).json({
    success: true,
    message: "Animal added to wishlist.",
    data: wishlistItem,
  });
});

export const removeFromWishlist = catchAsync(async (req, res, next) => {
  const wishlistItem = await Wishlist.findByIdAndDelete(req.params.id);

  if (!wishlistItem) {
    return next(new AppError(404, "Wishlist item not found."));
  }

  res.status(200).json({
    success: true,
    message: "Wishlist item removed.",
  });
});

export const getUserWishlist = catchAsync(async (req, res, next) => {
  const wishlist = await Wishlist.find({ user: req.params.userId }).populate("animal");

  res.status(200).json({
    success: true,
    count: wishlist.length,
    data: wishlist,
  });
});
