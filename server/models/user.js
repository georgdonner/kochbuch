const mongoose = require('mongoose');

const USER_ROLES = {
  member: 'member',
  creator: 'creator',
};

const ALLOWED_ROLES = {
  member: [USER_ROLES.member, USER_ROLES.creator],
  creator: [USER_ROLES.creator],
};

const { Schema } = mongoose;
const schema = new Schema({
  username: {
    required: true,
    type: String,
  },
  email: {
    type: String,
    required: true,
    index: true,
  },
  password: {
    required: true,
    type: String,
  },
  role: {
    type: String,
    enum: Object.values(USER_ROLES),
    default: USER_ROLES.member,
  },

  diet: String,
});

const User = mongoose.model('User', schema);
module.exports = User;

module.exports.userRoles = USER_ROLES;
module.exports.allowedUserRoles = ALLOWED_ROLES;
