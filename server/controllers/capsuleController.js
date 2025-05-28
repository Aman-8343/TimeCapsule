import Capsule from "../models/Capsule.js";

export const createCapsule = async (req, res) => {
  try {
    const { title, message, unlockDate } = req.body;
    const image = req.file?.path || req.body.image || null;


    if (!title || !message || !unlockDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newCapsule = new Capsule({
      owner: req.user._id, 
      title,
      message,
      unlockDate,
      image,
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

// GET: View a single capsule only if it's unlocked
export const getCapsuleById = async (req, res) => {
  const { id } = req.params;

  try {
    const capsule = await Capsule.findOne({
      _id: id,
      owner: req.user._id,
    });

    if (!capsule) {
      return res.status(404).json({ message: "Capsule not found" });
    }

    const currentDate = new Date();
    const unlockDate = new Date(capsule.unlockDate);

    if (currentDate < unlockDate) {
      return res.status(403).json({
        message: `This capsule will unlock on ${unlockDate.toDateString()}`,
      });
    }

    res.status(200).json(capsule);
  } catch (error) {
    console.error("Fetch capsule error:", error);
    res.status(500).json({ message: "Server error" });
  }
};




export const unlockCapsule = async (req, res) => {
  try {
    const capsule = await Capsule.findById(req.params.id);

    if (!capsule) {
      return res.status(404).json({ message: "Capsule not found" });
    }

    // Only allow access if user is the owner
    if (capsule.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const currentDate = new Date();
    const unlockDate = new Date(capsule.unlockDate);

    if (currentDate >= unlockDate) {
      return res.status(200).json({ capsule });
    } else {
      return res.status(403).json({ message: "Capsule is still locked" });
    }
  } catch (error) {
    console.error("Unlock capsule error:", error);
    res.status(500).json({ message: "Server error" });
  }
};



