import multer from "multer";
import { storage } from "../utils/cloudinary.js";

const storage = multer.memoryStorage();
const upload = multer({ storage });

export default upload;
