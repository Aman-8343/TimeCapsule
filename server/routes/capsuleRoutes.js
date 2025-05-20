
import express from "express";
import { createCapsule } from "../controllers/capsuleController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

// @route   POST /api/capsules
// @desc    Create a new capsule
// @access  Private
router.post("/", protect, createCapsule);

export default router;
