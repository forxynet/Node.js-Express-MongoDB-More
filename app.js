const morgan = require('morgan');
const express = require('express');

const AppError = require('./utils/appError');
const tourRouter = require('./routers/tour-routers');
const userRouter = require('./routers/user-routers');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

// MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// place is important for middleware routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this`));
});

app.use(globalErrorHandler);

module.exports = app;
