/**
* Force a redirect to HTTPS
* https://devcenter.heroku.com/articles/http-routing#heroku-headers
*/
module.exports = () => (req, res, next) => {
  if (process.env.NODE_ENV === 'test') {
    return next();
  }
  if (req.secure) {
    return next();
  }
  const protoHeader = req.headers['x-forwarded-proto'];
  if (protoHeader === 'https') {
    return next();
  }
  return res.redirect(301, `https://${req.hostname}${req.originalUrl}`);
};
