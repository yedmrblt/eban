const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var accounts = require('./data/accounts');

// Routes
const balanceRoutes = require('./routes/balance');
const eventRoutes = require('./routes/event');

app.use(bodyParser.json());
app.use('/balance', balanceRoutes);
app.use('/event', eventRoutes);

app.get('/', (req, res) => {
  res.send('EBANX Software Engineer Take-home assignment');
});

app.post('/reset', (req, res) => {
  accounts.length = 0;
  res.status(200).json('OK');
});

module.exports = app;
