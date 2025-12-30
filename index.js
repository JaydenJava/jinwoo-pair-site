const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require("body-parser");
const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');

// Railway provides PORT environment variable
const PORT = process.env.PORT || 3000;

// Middleware
app.use(compression());
app.use(helmet());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Import routes
const server = require('./qr');
const code = require('./pair');

// Routes
app.use('/server', server);
app.use('/code', code);

// HTML Routes
app.get('/pair', (req, res) => {
  res.sendFile(path.join(__dirname, 'pair.html'));
});

app.get('/qr', (req, res) => {
  res.sendFile(path.join(__dirname, 'qr.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'main.html'));
});

// Health check endpoint for Railway
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'JINWOO-XMD',
    version: '1.0.0'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// 404 handler
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════════╗
║             JINWOO-XMD STARTED                   ║
╠══════════════════════════════════════════════════╣
║   Server running on: http://localhost:${PORT}     ║
║   Health check: http://localhost:${PORT}/health   ║
║   QR Page: http://localhost:${PORT}/qr            ║
║   Pair Page: http://localhost:${PORT}/pair        ║
╚══════════════════════════════════════════════════╝
`);
});

module.exports = app;