const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Routes
const balanceRoutes = require('./routes/balance');
const eventRoutes = require('./routes/event');

app.use(bodyParser.json());
app.use('/balance', balanceRoutes);
app.use('/event', eventRoutes);

app.get('/', (req, res) => {
  res.send('EBANX Software Engineer Take-home assignment');
});

module.exports = app;
