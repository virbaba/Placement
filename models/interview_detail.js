const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const inteviewDetailSchema = new Schema({
  companyName: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true,
    unique: true // Assuming email is unique for each user
  },
  date: {
    type: Date, 
    required: true
  },
  
  students:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }]
}, {
  timestamps: true
});

const InterviewDetailModel = mongoose.model('Interview', inteviewDetailSchema);

module.exports = InterviewDetailModel;
