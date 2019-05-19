const http = require('http');

module.exports = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  const { message, status = 500 } = err;

  // logging
  console.error(`Error: ${message}`);
  if (req.path.startsWith('/api')) {
    return res.status(status).json({ error: { message } });
  }
  return res.status(status).render('error', {
    statusCode: status,
    status: http.STATUS_CODES[status],
    message,
  });
};
