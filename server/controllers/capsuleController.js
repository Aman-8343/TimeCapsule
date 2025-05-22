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


export const getMyCapsules = async (req, res) => {
  try {
    const capsules = await Capsule.find({ owner: req.user._id });
    res.status(200).json(capsules);
  } catch (error) {
    console.error("Get capsules error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// PUT: Update a capsule
export const updateCapsule = async (req, res) => {
  const { id } = req.params;
  const { title, message, unlockDate } = req.body;

  try {
    const capsule = await Capsule.findOneAndUpdate(
      { _id: id, owner: req.user._id },
      { title, message, unlockDate },
      { new: true }
    );

    if (!capsule) {
      return res.status(404).json({ message: "Capsule not found" });
    }

    res.status(200).json(capsule);
  } catch (error) {
    console.error("Update capsule error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// DELETE: Delete a capsule
export const deleteCapsule = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Capsule.findOneAndDelete({
      _id: id,
      owner: req.user._id,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Capsule not found" });
    }

    res.status(200).json({ message: "Capsule deleted" });
  } catch (error) {
    console.error("Delete capsule error:", error);
    res.status(500).json({ message: "Server error" });
  }
};