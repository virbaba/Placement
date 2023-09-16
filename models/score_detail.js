const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentScoreSchema = new Schema({
  dsaScore: {
    type: Number,
    required: true
  },
  webDevelopmentScore: {
    type: Number,
    required: true
  },
  reactFrontEnd: {
    type: Number,
    required: true
  }
});

const StudentScoreModel = mongoose.model('Score', studentScoreSchema);

module.exports = StudentScoreModel;
