import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  content: { type: String, required: true },
  type: {
    type: String,
    enum: ['compliment', 'love', 'proposal', 'celebration'],
    default: 'love'
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Message', messageSchema);
