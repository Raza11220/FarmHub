import express from "express";
import {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getMe,
} from "../controllers/userController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.get("/", protect, authorizeRoles("admin"), getUsers);
router.route("/:id").get(protect, getUserById).put(protect, updateUser).delete(protect, authorizeRoles("admin"), deleteUser);

export default router;