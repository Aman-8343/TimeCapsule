import mongoose from 'mongoose';

const capsuleSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  files: [
    {
      url: String,
      type: String, 
    }
  ],
  image: {
  type: String,
  default: "",
},
  unlockDate: {
    type: Date,
    required: true
  },
  isUnlocked: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  reminderSent: {
  type: Boolean,
  default: false,
},
});

const Capsule = mongoose.model('Capsule', capsuleSchema);

export default Capsule;
