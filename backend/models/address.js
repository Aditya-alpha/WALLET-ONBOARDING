const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    address: {
        type: String,
        trim: true
    },
    xhandle: {
        type: String,
        trim: true
    }

}, { timestamps: true });

module.exports = mongoose.model("Address", addressSchema);