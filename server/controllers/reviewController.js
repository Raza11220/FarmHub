import Review from "../models/Review.js";
import Animal from "../models/Animal.js";
import ApiFeatures from "../utils/apiFeatures.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";

export const getReviews = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Review.find(), req.query)
    .filter()
    .sort()
    .paginate();

  const reviews = await features.query.populate("user", "name email").populate("animal", "name");
  const totalReviews = await Review.countDocuments();

  res.status(200).json({
    success: true,
    count: reviews.length,
    total: totalReviews,
    page: features.page,
    limit: features.limit,
    data: reviews,
  });
});

export const createReview = catchAsync(async (req, res, next) => {
  const { animal, user, name, rating, comment } = req.body;

  if (!animal || !user || !name || !rating || !comment) {
    return next(new AppError(400, "Please provide all required review fields."));
  }

  const animalExists = await Animal.findById(animal);
  if (!animalExists) {
    return next(new AppError(404, "Animal not found for this review."));
  }

  const review = await Review.create({
    animal,
    user,
    name,
    rating,
    comment,
  });

  res.status(201).json({
    success: true,
    message: "Review created successfully.",
    data: review,
  });
});

export const updateReview = catchAsync(async (req, res, next) => {
  const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!review) {
    return next(new AppError(404, "Review not found."));
  }

  res.status(200).json({
    success: true,
    message: "Review updated successfully.",
    data: review,
  });
});

export const deleteReview = catchAsync(async (req, res, next) => {
  const review = await Review.findByIdAndDelete(req.params.id);

  if (!review) {
    return next(new AppError(404, "Review not found."));
  }

  res.status(200).json({
    success: true,
    message: "Review deleted successfully.",
  });
});
