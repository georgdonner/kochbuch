const bcrypt = require('bcrypt');
const Joi = require('joi');

const util = require('../util');
const User = require('../models/user');
const StatusError = require('../routes/middleware/status-error');

const getUser = async ({
  userId, email, throwNotFound, includePassword,
}) => {
  let user;

  if (userId) {
    user = await User.findById(userId);
  } else if (email) {
    user = await User.findOne({ email });
  }

  if (!user && throwNotFound) {
    throw new Error('User not found');
  }

  if (user && !includePassword) {
    delete user.password;
  }

  return user;
};
module.exports.get = getUser;

const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .required(),
});

module.exports.login = async ({ body = {} }) => {
  const { email, password } = await loginSchema.validateAsync(body);

  const user = await getUser({ email, includePassword: true });

  if (!user) {
    throw new StatusError('Incorrect email or password', 401);
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new StatusError('Incorrect email or password', 401);
  }

  return user;
};

const signupSchema = loginSchema.append({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  repeatPassword: Joi.ref('password'),
});

module.exports.signup = async ({ body = {} }) => {
  const { username, email, password } = await signupSchema.validateAsync(body);

  const user = await getUser({ email });

  if (user) {
    throw new StatusError('User with this email address already exists', 400);
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const createdUser = await User
    .create({
      username,
      email,
      password: passwordHash,
    });

  return createdUser;
};

module.exports.isAuthorized = async ({ role, userId }) => {
  const user = await getUser({
    userId,
  });

  if (!user) {
    return false;
  }

  if (User.allowedUserRoles[role].includes(user.role)) {
    return true;
  }

  return false;
};

module.exports.update = async (userId, update = {}) => {
  const user = await getUser({
    userId,
  });

  if (!user) {
    return null;
  }

  const picked = util.pick(update, 'listCode', 'planCode', 'diet');

  if (!Object.keys(picked).length) {
    return user;
  }

  return User
    .findOneAndUpdate(
      { _id: userId },
      picked,
      { new: true },
    );
};
