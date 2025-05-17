import mongoose from "mongoose";

const unlockRequestSchema = new mongoose.Schema({
  capsuleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Capsule",
    required: true,
  },
  requestedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  requestedAt: {
    type: Date,
    default: Date.now,
  },
  reviewedAt: {
    type: Date,
  }
});

const UnlockRequest = mongoose.model("UnlockRequest", unlockRequestSchema);
export default UnlockRequest;
