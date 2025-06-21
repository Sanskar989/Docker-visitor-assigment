const express = require('express');
const redis = require('redis');

const app = express();
const client = redis.createClient({ host: 'redis-server', port: 6379 });

// Initialize visits to 0 if not set
client.get('visits', (err, visits) => {
  if (err) console.error(err);
  if (visits === null) client.set('visits', 0);
});

app.get('/', (req, res) => {
  client.get('visits', (err, visits) => {
    if (err) return res.status(500).send('Redis error');
    res.send('Number of visits is ' + visits);
    client.set('visits', parseInt(visits || '0', 10) + 1);
  });
});

app.listen(8081, () => {
  console.log('Listening on port 8081');
});
