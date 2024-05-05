const { userRoles } = require('../../models/user');
const UserService = require('../../services/user');

module.exports = (role = userRoles.member) => async (req, res, next) => {
  if (!role) {
    return next();
  }

  if (!req.session.userId) {
    return res.sendStatus(401);
  }

  const isAuthorized = await UserService
    .isAuthorized({
      userId: req.session.userId,
      role,
    });

  if (isAuthorized) {
    return next();
  }

  return res.sendStatus(401);
};
