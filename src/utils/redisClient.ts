import { createClient } from 'redis';

const redisClient = createClient({
    url: "redis://127.0.0.1:6379",
});

redisClient.on('connect', () => {
    console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
    console.error('Failed to connect to Redis', err);
});

// Connect the client
(async () => {
    try {
        if (!redisClient.isOpen) {
            await redisClient.connect();
        }
    } catch (err) {
        console.error('Error connecting to Redis:', err);
    }
})();

export default redisClient;
