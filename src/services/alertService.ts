import redisClient from '../utils/redisClient';
import AlertModel from '../models/alert';

export const processAlerts = async (): Promise<void> => {
  const prices = JSON.parse(await redisClient.get('cryptoPrices') || '{}');
  const alerts = await AlertModel.find();

  for (const alert of alerts) {
    const { symbol, threshold, direction, userId } = alert;
    const currentPrice = prices[symbol]?.usd;

    if (
      (direction === 'above' && currentPrice > threshold) ||
      (direction === 'below' && currentPrice < threshold)
    ) {
      // Notify user logic here
      console.log(`Alert triggered for user ${userId}: ${symbol} is ${direction} ${threshold}`);
    }
  }
};
