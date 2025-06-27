const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.json(`Hello from Backend! Time: ${new Date().toISOString()}`);
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', service: 'backend' });
});

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});