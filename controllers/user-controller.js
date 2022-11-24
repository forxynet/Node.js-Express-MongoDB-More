const fs = require('fs');

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
);

exports.getAllUser = (req, res) => {
  res.status(500).json({
    status: 'fail',
    message: 'This route is not yet defined!',
  });
};

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'fail',
    message: 'This route is not yet defined!',
  });
};

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'fail',
    message: 'This route is not yet defined!',
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'fail',
    message: 'This route is not yet defined!',
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'fail',
    message: 'This route is not yet defined!',
  });
};