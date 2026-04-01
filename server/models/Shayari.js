import mongoose from 'mongoose';

const shayariSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: String, default: 'Anonymous' },
  category: {
    type: String,
    enum: ['ghalib', 'custom', 'compliment', 'quote'],
    default: 'custom'
  },
  language: { type: String, default: 'hindi' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Shayari', shayariSchema);
