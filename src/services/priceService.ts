import axios from 'axios';
import redisClient from '../utils/redisClient';
import dotenv from 'dotenv';

dotenv.config();

const API_URL = 'https://api.coingecko.com/api/v3/simple/price';

export const fetchSimplePrice = async (): Promise<void> => {
    try {
        // Ensure Redis client is connected
        if (!redisClient.isOpen) {
            await redisClient.connect();
        }

        // Fetch cryptocurrency prices
        const response = await axios.get(API_URL, {
            params: {
                ids: 'bitcoin',
                vs_currencies: 'usd',
                x_cg_demo_api_key: process.env.CRYPTO_API_KEY,
            },
            headers: {
                accept: 'application/json',
            },
        });

        const prices = response.data;

        // Store the prices in Redis
        await redisClient.set('bitcoin', JSON.stringify(prices));

        console.log('Prices updated:', prices);

        return response.data;
    } catch (error) {
        console.error('Error fetching prices:', error);
    }
};