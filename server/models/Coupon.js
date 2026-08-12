import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, "Coupon code is required."],
      unique: true,
      uppercase: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    type: {
      type: String,
      enum: ["percentage", "fixed"],
      required: [true, "Coupon type is required."],
    },
    value: {
      type: Number,
      required: [true, "Coupon value is required."],
      min: [0, "Coupon value cannot be negative."],
    },
    minimumOrder: {
      type: Number,
      default: 0,
      min: [0, "Minimum order cannot be negative."],
    },
    maxDiscount: {
      type: Number,
      default: 0,
      min: [0, "Max discount cannot be negative."],
    },
    expiresAt: {
      type: Date,
      required: [true, "Coupon expiry date is required."],
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

couponSchema.index({ code: 1 }, { unique: true });
couponSchema.index({ isActive: 1, expiresAt: 1 });

const Coupon = mongoose.model("Coupon", couponSchema);

export default Coupon;
