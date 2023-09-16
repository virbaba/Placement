const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const collegeSchema = new Schema({
  collegeName: {
    type: String,
    required: true
  },
  specialization: {
    type: String,
    required: true
  },
  cgpa: {
    type: Number,
    required: true
  },
  startYear: {
    type: Number,
    required: true
  },
  endYear: {
    type: Number,
    required: true
  }
});

const CollegeModel = mongoose.model('Education', collegeSchema);
module.exports = CollegeModel;
