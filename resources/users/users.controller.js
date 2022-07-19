const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('./users.model');
const validatePayloadIncoming = require('../../middlewares/validatePayloadIncoming');
const validateToken = require('../../middlewares/validateToken');

const router = express.Router();

router.post('/signup', validatePayloadIncoming, async (req, res) => {
  let user = await User.findOne({ email: req.body.email });

  if (user)
    return res
      .status(400)
      .send({ error: true, message: 'User already registered' });

  //password : wsedcfr

  // guerre ==> anauhauhqh+salt
  const salt = await bcrypt.genSalt(10);

  req.body.password = await bcrypt.hash(req.body.password, salt);

  user = await User.create(req.body);

  const token = user.generateAuthToken();

  res.send(token);
});

router.post('/auth', validatePayloadIncoming, async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) return res.status(400).send('Invalid email or password');

  const validatePassword = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!validatePassword)
    return res.status(400).send('Invalid email or password');
  const token = user.generateAuthToken();

  res.send(token);
});

router.get('/me', validateToken, async (req, res) => {
  const user = await User.findById(req.user._id);
  res.status(200).send(user);
});

module.exports = router;
