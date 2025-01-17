import express from 'express';
import { fetchSimplePrice } from '../services/priceService'; // Adjust the import path as needed

const router = express.Router();

router.get('/prices', async (req, res) => {
  try {
    const prices = await fetchSimplePrice();
    res.json(prices); // Send the fetched prices as JSON
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch prices' });
  }
});

export default router;
