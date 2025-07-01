import multer from "multer";
import { storage } from "../utils/cloudinary.js"; 

const memoryStorage = multer.memoryStorage(); 
const upload = multer({ storage: memoryStorage });

export default upload;
