const express = require('express');
const redis = require('redis');

const app = express();
const client = redis.createClient({ url: 'redis://redis:6379' });

client.on('error', (err) => console.log('Redis Client Error', err));
client.connect();

app.get('/', async (req, res) => {
  const count = await client.incr('visits');
  res.send(`Hello! You are visitor number ${count}`);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
