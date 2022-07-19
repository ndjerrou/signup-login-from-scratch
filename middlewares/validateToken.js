const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.headers['auth-x'];

  if (!token) {
    return res.status(400).send({ error: true, message: 'No token provided' });
  }

  try {
    const payload = jwt.verify(token, process.env.PRIVATE_KEY);
    req.user = payload; //{_id: "..."}

    next();
  } catch (err) {
    return res.status(401).send({ error: true, message: 'Not authorized' });
  }
};
