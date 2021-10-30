const mongoose = require('mongoose');

const GradelevelSchema = new mongoose.Schema({
  Name: { type: String, unique: true },
  Description: String,
  LevelCreateDate: Date,
  IntegerValue: mongoose.Schema.Types.Number,
  DisplaySeq: mongoose.Schema.Types.Number,
  GradeRateMultiplier: mongoose.Schema.Types.Decimal128,
  Active: Boolean
}, { timestamps: true });


const Gradelevel = mongoose.model('Gradelevel', GradelevelSchema);

module.exports = Gradelevel;
