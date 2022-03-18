const mongoose = require('mongoose');

const PaypalResponseSchema = new mongoose.Schema({
    UserID:{
        type:mongoose.Schema.Types.ObjectId, ref:'User'
        }, Name: { type: String, unique: true },
        PaypalResponse:mongoose.Schema.Types.String
}, { timestamps: true });

const PaypalResponse = mongoose.model('PaypalResponse', PaypalResponseSchema);

module.exports = PaypalResponse;