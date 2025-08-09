const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String, required: true },
    status: { type: String, default: "Active" }
}, { timestamps: true });

module.exports = mongoose.model("Customer", customerSchema);
