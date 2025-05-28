import cron from "node-cron";
import Capsule from "./models/Capsule.js";
import User from "./models/User.js";
import { sendReminderEmail } from "./utils/emailService.js";

const runReminderNow = async () => {
  const today = new Date().toISOString().split("T")[0];

  const dueCapsules = await Capsule.find({
    unlockDate: { $lte: today },
    reminderSent: { $ne: true },
  });

  for (const capsule of dueCapsules) {
    const user = await User.findById(capsule.user);
    if (user) {
      await sendReminderEmail(
        user.email,
        "🎁 Your Time Capsule is ready to unlock!",
        `Hi ${user.name}, your capsule titled "${capsule.title}" is now available to open!`
      );
      capsule.reminderSent = true;
      await capsule.save();
    }
  }

  console.log("🔔 Manual reminder run complete");
};

runReminderNow(); // call it just once for testing
