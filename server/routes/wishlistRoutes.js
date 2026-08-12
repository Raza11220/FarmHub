import express from "express";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  getUserWishlist,
} from "../controllers/wishlistController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getWishlist).post(protect, addToWishlist);
router.route("/user/:userId").get(protect, getUserWishlist);
router.route("/:id").delete(protect, removeFromWishlist);

export default router;
