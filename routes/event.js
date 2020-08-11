const express = require('express');
const router = express.Router();
const accounts = require('../data/accounts');

const deposit = function (destination, amount, callback) {
  const account = accounts.find((element) => {
    return element.id == destination;
  });

  if (account == null) {
    // Create account with initial balance
    const newAccount = {
      id: destination,
      balance: amount,
    };
    accounts.push(newAccount);
    callback(newAccount);
  } else {
    // Deposit into existing account
    account.balance += amount;
    callback(account);
  }
};
const withdraw = function (origin, amount, callback, error) {
  const account = accounts.find((element) => {
    return element.id == origin;
  });

  if (account == null) {
    // Origin couldn't find
    error();
  } else {
    // Deposit into existing account
    account.balance -= amount;
    callback(account);
  }
};

router.post('/', (req, res) => {
  const body = req.body;

  switch (body.type) {
    case 'deposit':
      deposit(body.destination, body.amount, (destination) => {
        res.status(201).json({ destination: destination });
      });
      break;

    case 'withdraw':
      withdraw(
        body.origin,
        body.amount,
        (origin) => {
          res.status(201).json({ origin: origin });
        },
        () => {
          res.status(404).json(0);
        }
      );
      break;

    case 'transfer':
      withdraw(
        body.origin,
        body.amount,
        (origin) => {
          deposit(body.destination, body.amount, (destination) => {
            res.status(201).json({ origin: origin, destination: destination });
          });
        },
        () => {
          res.status(404).json(0);
        }
      );
      break;
  }
});

module.exports = router;
