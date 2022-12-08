const AppError = require('../utils/appError');

const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = err => {
  const value = err.message.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value: ${value} Please use another value!`;
  return new AppError(message, 400);
};

const handlerValidationErrorDB = err => {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `Invalid input data. ${errors.join(', ')}`;
  return new AppError(message, 400);
};

const handleJWTError = err =>
  new AppError('Invalid token! Please log in again.', 401);

const handleTokenExpiredErrorDB = err =>
  new AppError('Your token has expired! Please log in again.', 401);

const sendErrorDev = (err, req, res) => {
  // A) API side
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  }

  // B) Rendered website
  console.log('Error: ', err.message);

  return res.status(err.statusCode).render('error', {
    title: 'Someting went wrong!',
    message: err.message
  });
};

const sendErrorProd = (err, req, res) => {
  // A) API side error
  if (req.originalUrl.startsWith('/api')) {
    // Operational trusted error: send message to client
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      });
    }
    // B) Programing or other unknown error: send message to client
    // 2) Send generic message to client
    return res.status(500).render('error', {
      status: 'error',
      message: 'Something went very wrong'
    });
  }
  // B) Web side error: send message to client
  if (err.isOperational) {
    return res.status(err.statusCode).render('error', {
      status: err.status,
      message: err.message
    });
  }

  // B) Programing or other unknown error: send message to client
  // 2) Send generic message to client
  return res.status(err.statusCode).render('error', {
    title: 'Someting went wrong!',
    message: 'Please try again later'
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV.trim() === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV.trim() === 'production') {
    let error = { ...err, name: err.name, message: err.message };

    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError')
      error = handlerValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError(error);
    if (error.name === 'TokenExpiredError')
      error = handleTokenExpiredErrorDB(error);

    sendErrorProd(error, req, res);
  }
};
