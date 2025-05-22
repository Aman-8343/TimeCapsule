import Capsule from "../models/Capsule.js";

export const createCapsule = async (req, res) => {
  try {
    const { title, message, unlockDate } = req.body;

    if (!title || !message || !unlockDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newCapsule = new Capsule({
      owner: req.user._id, 
      title,
      message,
      unlockDate,
    });

    const savedCapsule = await newCapsule.save();
    res.status(201).json(savedCapsule);
  } catch (error) {
    console.error("Create capsule error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
