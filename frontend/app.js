const express = require('express');
const axios = require('axios');
const app = express();
const port = 3001;

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>Multi-Container App</title></head>
      <body>
        <h1>Frontend Service</h1>
        <button onclick="callBackend()">Call Backend</button>
        <div id="result"></div>
        <script>
          async function callBackend() {
            try {
              const response = await fetch('/api/data');
              const data = await response.text();
              document.getElementById('result').innerHTML = '<p>' + data + '</p>';
            } catch (error) {
              document.getElementById('result').innerHTML = '<p>Error: ' + error + '</p>';
            }
          }
        </script>
      </body>
    </html>
  `);
});

app.get('/api/data', async (req, res) => {
  try {
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';
    const response = await axios.get(`${backendUrl}/api/hello`);
    res.send(`Frontend received: ${response.data}`);
  } catch (error) {
    res.status(500).send(`Error calling backend: ${error.message}`);
  }
});

app.listen(port, () => {
  console.log(`Frontend running on port ${port}`);
});