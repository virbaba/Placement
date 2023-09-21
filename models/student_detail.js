const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentDetailSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true // Assuming email is unique for each user
  },
  mobileNumber: {
    type: Number, 
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'] 
  },
  address: {
    type: String,
    required: true
  },
  
  education:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Education'
    },
    batch:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Batch'
    },
    score:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Score'
    },

    interview:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      status:String
}],
}, {
  timestamps: true
});

const StudentDetailModel = mongoose.model('Student', studentDetailSchema);

module.exports = StudentDetailModel;
