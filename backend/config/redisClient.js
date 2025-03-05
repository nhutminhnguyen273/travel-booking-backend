const redis = require('redis');

const redisClient = redis.createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
});

redisClient.on('Connect', () => {
    console.log("✅ Connected to Redis");
});

redisClient.on('Error', (err) => {
    console.error("🚨 Redis error: ", err);
});

redisClient.connect();

module.exports = redisClient;