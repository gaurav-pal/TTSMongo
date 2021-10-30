const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  Name: { type: String, unique: true },
  Description: String,
  SubjectCreateDate: Date,
  DisplaySeq: mongoose.Schema.Types.Number,
  SubjectRateMultiplier: mongoose.Schema.Types.Decimal128,
  Active: Boolean
}, { timestamps: true });


const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;


