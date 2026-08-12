import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Banner title is required."],
      trim: true,
    },
    subtitle: {
      type: String,
      default: "",
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Banner image is required."],
      trim: true,
    },
    link: {
      type: String,
      default: "/",
      trim: true,
    },
    position: {
      type: String,
      enum: ["home", "hero", "promo", "sidebar"],
      default: "home",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    startsAt: {
      type: Date,
      default: Date.now,
    },
    endsAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

bannerSchema.index({ position: 1, isActive: 1, startsAt: -1 });

const Banner = mongoose.model("Banner", bannerSchema);

export default Banner;
