import express from 'express';
import Message from '../models/Message.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json({ success: true, data: messages });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const message = new Message(req.body);
    await message.save();
    res.status(201).json({ success: true, data: message });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

router.post('/seed', async (req, res) => {
  try {
    await Message.deleteMany({});
    const defaults = [
      { content: "Your smile is the most beautiful thing I have ever seen. It lights up every room and makes my heart skip a beat.", type: "compliment" },
      { content: "Your eyes hold a universe I never want to escape from. In them I see my past, my present, and my entire future.", type: "compliment" },
      { content: "You make my world brighter every single day. Just knowing you exist makes life infinitely more beautiful.", type: "love" },
      { content: "Since the day you came into my life, every moment feels like a beautiful dream I never want to wake up from.", type: "love" },
      { content: "Will you do me the greatest honor and go on a date with me?", type: "proposal" },
      { content: "You just made me the happiest person in the entire world! 💖", type: "celebration" }
    ];
    const seeded = await Message.insertMany(defaults);
    res.json({ success: true, count: seeded.length });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
