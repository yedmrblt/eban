const express = require('express');
const router = express.Router();
const accounts = require('../data/accounts');

router.get('/', (req, res) => {
  const accountId = req.query.account_id;
  const destination = accounts.find((element) => {
    return element.id == accountId;
  });

  if (destination != null) {
    res.status(200).json(destination.balance);
  } else {
    res.status(404).json(0);
  }
});

module.exports = router;
