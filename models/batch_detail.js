const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const batchSchema = new Schema({
  batchName: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  }
});

const BatchModel = mongoose.model('Batch', batchSchema);

module.exports = BatchModel;
