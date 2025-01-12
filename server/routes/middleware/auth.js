const { getAuth } = require('@clerk/express');

module.exports.requireAuth = (role) => async (req, res, next) => {
  const auth = getAuth(req);

  if (!auth) {
    return res.sendStatus(401);
  }

  if (role && !auth.sessionClaims?.metadata?.role !== role) {
    return res.sendStatus(401);
  }

  return next();
};

// module.exports = (role = userRoles.member) => async (req, res, next) => {
//   if (!role) {
//     return next();
//   }

//   if (!req.session.userId) {
//     return res.sendStatus(401);
//   }

//   const isAuthorized = await UserService
//     .isAuthorized({
//       userId: req.session.userId,
//       role,
//     });

//   if (isAuthorized) {
//     return next();
//   }

//   return res.sendStatus(401);
// };
