import mongoose from "mongoose";

const animalReviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Reviewer name is required."],
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
  { timestamps: true }
);

const animalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Animal name is required."],
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    breed: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Breed",
      required: true,
    },
    age: {
      type: String,
      required: [true, "Age is required."],
      trim: true,
    },
    gender: {
      type: String,
      required: [true, "Gender is required."],
      enum: ["Male", "Female", "Unknown"],
      trim: true,
    },
    weight: {
      type: String,
      required: [true, "Weight is required."],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required."],
      min: [0, "Price cannot be negative."],
    },
    status: {
      type: String,
      enum: ["Available", "Sold", "Reserved"],
      default: "Available",
    },
    description: {
      type: String,
      required: [true, "Description is required."],
      trim: true,
      minlength: [20, "Description must be at least 20 characters long."],
    },
    image: {
      type: String,
      required: [true, "Image URL is required."],
      trim: true,
    },
    gallery: [{
      type: String,
      trim: true,
    }],
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reviews: [animalReviewSchema],
    stock: {
      type: Number,
      default: 1,
      min: [0, "Stock cannot be negative."],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

animalSchema.index({ category: 1, status: 1, price: 1 });
animalSchema.index({ name: "text", description: "text" });
animalSchema.index({ isFeatured: 1, isActive: 1 });

const Animal = mongoose.model("Animal", animalSchema);

export default Animal;
