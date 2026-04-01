import express from 'express';
import Shayari from '../models/Shayari.js';

const router = express.Router();

// GET all shayaris
router.get('/', async (req, res) => {
  try {
    const shayaris = await Shayari.find().sort({ createdAt: -1 });
    res.json({ success: true, data: shayaris });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET shayaris by category
router.get('/category/:cat', async (req, res) => {
  try {
    const shayaris = await Shayari.find({ category: req.params.cat });
    res.json({ success: true, data: shayaris });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST new shayari
router.post('/', async (req, res) => {
  try {
    const shayari = new Shayari(req.body);
    await shayari.save();
    res.status(201).json({ success: true, data: shayari });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Seed default shayaris
router.post('/seed', async (req, res) => {
  try {
    await Shayari.deleteMany({});
    const defaults = [
      { text: "Hazaron khwahishen aisi ke har khwahish pe dam nikle...", author: "Mirza Ghalib", category: "ghalib", language: "hindi" },
      { text: "Dil hi to hai na sang-o-khisht, dard se bhar na aaye kyun.", author: "Mirza Ghalib", category: "ghalib", language: "hindi" },
      { text: "Ishq par zor nahin, hai ye woh aatish Ghalib, Jo lagaye na lage aur bujhaye na bane.", author: "Mirza Ghalib", category: "ghalib", language: "hindi" },
      { text: "Unke dekhe se jo aa jaati hai munh par raunak, Woh samajhte hain ke bimaar ka haal achha hai.", author: "Mirza Ghalib", category: "ghalib", language: "hindi" },
      { text: "Your smile is the sunrise that makes every morning worth waking up for.", author: "From the Heart", category: "compliment", language: "english" },
      { text: "Your eyes hold galaxies I could spend eternity exploring and still never reach the end.", author: "From the Heart", category: "compliment", language: "english" },
      { text: "The way you laugh makes the whole world feel lighter, brighter, and more beautiful.", author: "From the Heart", category: "compliment", language: "english" },
      { text: "Your kindness is the most beautiful thing about you — and you have so much beauty to offer.", author: "From the Heart", category: "compliment", language: "english" },
      { text: "Tum mile to jaana maine, mohabbat kya hoti hai — ek khwab jo aankhein khuli mein bhi dikhta hai.", author: "Unknown", category: "custom", language: "hindi" },
      { text: "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.", author: "Maya Angelou", category: "quote", language: "english" }
    ];
    const seeded = await Shayari.insertMany(defaults);
    res.json({ success: true, count: seeded.length, data: seeded });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
