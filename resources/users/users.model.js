const { model, Schema } = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 1000,
  },
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id }, process.env.PRIVATE_KEY);
};

const User = model('user', userSchema);

module.exports = User;
