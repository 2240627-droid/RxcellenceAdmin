/**
 * Generic error handler middleware.
 * This should be the last middleware added.
 */
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong on the server.',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
};

module.exports = errorHandler;