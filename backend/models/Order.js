const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    customerName: String,
    cardNumber: String, // ⚠️ Don't store real card numbers in production
    expiry: String,
    cvv: String, // ⚠️ Same here — remove for real payments
    items: Array,
    total: Number,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema);
