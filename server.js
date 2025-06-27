const express = require('express');
const redis = require('redis');

const app = express();
const port = 3000;

// Redis client
const redisClient = redis.createClient({
  host: 'redis-service',
  port: 6379
});

redisClient.on('error', (err) => {
  console.log('Redis Client Error', err);
});

redisClient.connect();

app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'backend-api'
  });
});

// Redis test endpoint
app.get('/api/redis-test', async (req, res) => {
  try {
    const key = 'test-key';
    const value = `Hello from Redis! Time: ${new Date().toISOString()}`;
    
    // Set value in Redis
    await redisClient.set(key, value);
    
    // Get value from Redis
    const retrievedValue = await redisClient.get(key);
    
    res.json({
      status: 'success',
      message: 'Redis connection working',
      stored_value: retrievedValue,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

app.listen(port, () => {
  console.log(`Backend API listening on port ${port}`);
});
