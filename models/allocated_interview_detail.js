const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const allcoatedInterviewSchema = new Schema({

  student:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },

    interview:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Interview'
    },
    status:{
        type: String,
        default: 'hold'
    }
}, {
  timestamps: true
});

const AllocatedInterviewModel = mongoose.model('Allocated_Interivew', allcoatedInterviewSchema);

module.exports = AllocatedInterviewModel;
