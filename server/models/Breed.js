import mongoose from "mongoose";

const breedSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Breed name is required."],
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
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

breedSchema.index({ category: 1, name: 1 }, { unique: true });

const Breed = mongoose.model("Breed", breedSchema);

export default Breed;
