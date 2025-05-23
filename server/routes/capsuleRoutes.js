
import express from "express";
import upload from "../middlewares/uploadMiddleware.js";

import { createCapsule,
    getMyCapsules,
    updateCapsule,
    deleteCapsule,
    getCapsuleById,
    unlockCapsule
 } from "../controllers/capsuleController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, upload.single("file"), createCapsule);
router.get("/", protect, getMyCapsules);
router.put("/:id", protect, updateCapsule);
router.delete("/:id", protect, deleteCapsule);
router.get("/:id", protect, getCapsuleById);
router.get("/unlock/:id", authMiddleware, unlockCapsule);




export default router;
