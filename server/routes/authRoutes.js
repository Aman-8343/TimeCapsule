import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
import protect from '../middlewares/authMiddleware.js';
import {createCapsule} from "../controllers/capsuleController.js";

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/', protect,createCapsule);

export default router;
