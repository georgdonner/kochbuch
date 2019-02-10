module.exports = (req, res, next) => {
  if (req.session.authenticated) {
    return next();
  }
  return res.sendStatus(401);
};
