import express from "express";
import {
  getAnimals,
  getAnimalById,
  createAnimal,
  updateAnimal,
  deleteAnimal,
} from "../controllers/animalController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(getAnimals)
  .post(protect, authorizeRoles("admin"), createAnimal);

router
  .route("/:id")
  .get(getAnimalById)
  .put(protect, authorizeRoles("admin"), updateAnimal)
  .delete(protect, authorizeRoles("admin"), deleteAnimal);

export default router;
