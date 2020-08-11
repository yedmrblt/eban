var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('EBANX Software Engineer Take-home assignment');
});

app.listen(PORT, () => {
  console.log('Server is running on port' + PORT);
});
