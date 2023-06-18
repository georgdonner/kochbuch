const mongoose = require('mongoose');

const { Schema } = mongoose;
const schema = new Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  diet: String,
});

const User = mongoose.model('User', schema);
module.exports = User;

module.exports.getByEmail = (email) => User.findOne({ email });
