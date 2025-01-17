import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import priceRoutes from './routes/price';
import alertRoutes from './routes/alert';
import { processAlerts } from './services/alertService';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', priceRoutes);
app.use('/api', alertRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Database connection
mongoose
  .connect(process.env.MONGO_URI || '')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => console.error('Failed to connect to MongoDB', err));

// Alert processing loop
setInterval(async () => {
  await processAlerts();
}, 10000); // Check alerts every 10 seconds

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));