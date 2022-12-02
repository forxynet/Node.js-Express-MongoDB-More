const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');

dotenv.config({ path: './config.env' });

mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  },
  () => {
    console.log('database connected');
  }
);

// Read JSOn Files from
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

// Import fata into db
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfult loaded!');
  } catch (error) {
    console.log(error);
  }
  process.exit(0);
};

// Delete all data from collection DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfult loaded!');
  } catch (error) {
    console.log(error);
  }
  process.exit(0);
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
