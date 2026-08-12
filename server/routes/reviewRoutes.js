import express from "express";
import {
  getReviews,
  createReview,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getReviews).post(protect, createReview);
router.route("/:id").put(protect, updateReview).delete(protect, deleteReview);

export default router;
