const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must be have a name'],
    unique: true
  },
  duration: {
    type: Number,
    required: [true, 'A tour must be have a duraiton']
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a maximum group size']
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty'],
    trim: true
  },
  ratingsAverage: {
    type: Number,
    default: 4.5
  },
  ratingsQuantity: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    required: [true, 'A tour must be have a price']
  },
  summary: {
    type: String,
    trim: true,
    required: [true, 'A tour must have a description']
  },
  description: {
    type: String,
    trim: true
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a cover image'],
    trim: true
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false
  },
  startDates: [Date]
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
