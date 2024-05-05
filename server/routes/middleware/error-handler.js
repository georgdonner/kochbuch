const http = require('http');

module.exports = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  const { message, stack, status = 500 } = err;

  // logging
  console.error(`Error: ${message}\n${stack}`);
  if (req.path.startsWith('/api') || req.path.startsWith('/auth')) {
    return res.status(status).json({ error: { message } });
  }
  return res.status(status).render('error', {
    statusCode: status,
    status: http.STATUS_CODES[status],
    message,
  });
};
