const mongoose = require('mongoose');

const GradelevelSchema = new mongoose.Schema({
  Name: { type: String, unique: true },
  Description: String,
  LevelCreateDate: Date,
  IntegerValue: [Number],
  DisplaySeq: [Number],
  GradeRateMultiplier: mongoose.Schema.Types.Decimal128,
  Active: Boolean
}, { timestamps: true });


const Gradelevel = mongoose.model('Gradelevel', GradelevelSchema);

module.exports = Gradelevel;
