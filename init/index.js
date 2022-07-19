const express = require('express');
const initConnectionToDb = require('../db/connection');

const users = require('../resources/users/users.controller');

module.exports = function init() {
  initConnectionToDb();

  const app = express();

  app.use(express.json()); // req.body
  app.use('/api/v1/users', users);

  app.get('*', (req, res) => {
    res.send('ok');
  });

  const port = process.env.PORT || 3000;

  app.listen(port, () => console.log(`Server at ${port}`));
};
