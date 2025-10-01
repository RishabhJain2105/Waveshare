const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

const files = {};

app.post('/api/share', (req, res) => {
  const { filePath } = req.body;
  if (!filePath) {
    return res.status(400).send('File path is required');
  }

  if (!fs.existsSync(filePath)) {
    return res.status(404).send('File not found');
  }

  const token = crypto.randomBytes(16).toString('hex');
  files[token] = filePath;

  res.json({ token });
});

app.get('/api/ip', async (req, res) => {
  try {
    const { internalIpV4 } = await import('internal-ip');
    const ip = await internalIpV4();
    res.json({ ip });
  } catch (error) {
    console.error('Failed to get IP address:', error);
    res.status(500).send('Failed to get IP address');
  }
});

app.get('/download/:token', (req, res) => {
  const { token } = req.params;
  const filePath = files[token];

  if (!filePath || !fs.existsSync(filePath)) {
    return res.status(404).send('File not found or link expired');
  }

  res.download(filePath, path.basename(filePath), (err) => {
    if (err) {
      console.error('Failed to download file:', err);
    }
    delete files[token];
  });
});

app.post('/api/shutdown', (req, res) => {
  res.send('Server is shutting down...');
  server.close(() => {
    console.log('Server has been shut down');
    process.exit(0);
  });
});

const server = app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
