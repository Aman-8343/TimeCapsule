
import express from "express";
import { createCapsule,
    getMyCapsules,
    updateCapsule,
    deleteCapsule
 } from "../controllers/capsuleController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createCapsule);
router.get("/", protect, getMyCapsules);
router.put("/:id", protect, updateCapsule);
router.delete("/:id", protect, deleteCapsule);

export default router;
