const morgan = require('morgan');
const express = require('express');
const tourRouter = require('./routers/tour-routers');
const userRouter = require('./routers/user-routers');

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

app.use((req, res, next) => {
  console.log(
    `Request Time: ${req.requestTime} and Client IPAddress: ${req.ip}`
  );
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
