import { Router, Request, Response } from 'express';
import AlertModel from '../models/alert';

const router = Router();

router.post('/alerts', async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, symbol, threshold, direction } = req.body;

    if (!userId || !symbol || threshold == null || !direction) {
      res.status(400).json({ message: 'All fields are required.' });
      return;
    }

    const alert = new AlertModel({ userId, symbol, threshold, direction });
    await alert.save();

    res.status(201).json({ message: 'Alert created successfully.', alert });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ message: 'Error fetching prices.', error: errorMessage });
  }
});

export default router;
