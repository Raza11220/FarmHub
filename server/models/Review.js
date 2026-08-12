import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    animal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Animal",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Name is required."],
      trim: true,
    },
    rating: {
      type: Number,
      required: [true, "Rating is required."],
      min: [1, "Rating must be at least 1."],
      max: [5, "Rating must be at most 5."],
    },
    comment: {
      type: String,
      required: [true, "Comment is required."],
      trim: true,
      minlength: [10, "Comment must be at least 10 characters long."],
    },
  },
  {
    timestamps: true,
  }
);

reviewSchema.index({ animal: 1, user: 1 }, { unique: true });
reviewSchema.index({ rating: -1, createdAt: -1 });

const Review = mongoose.model("Review", reviewSchema);

export default Review;
