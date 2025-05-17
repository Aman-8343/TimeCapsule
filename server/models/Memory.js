import mongoose from "mongoose";

const memorySchema = new mongoose.Schema({
  capsuleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Capsule",
    required: true,
  },
  type: {
    type: String,
    enum: ["text", "image", "video"],
    required: true,
  },
  content: {
    type: String,
    required: true, // For text or URL of uploaded image/video
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
});

const Memory = mongoose.model("Memory", memorySchema);
export default Memory;
