import express from "express";
import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(protect, getOrders)
  .post(protect, createOrder);

router
  .route("/:id")
  .get(protect, getOrderById)
  .put(protect, authorizeRoles("admin"), updateOrder)
  .delete(protect, authorizeRoles("admin"), deleteOrder);

export default router;
