const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Order = require("../models/Order");

// Save new order + send email
router.post("/", async (req, res) => {
    try {
        const { customerName, items, total } = req.body;

        // 1. Save order to MongoDB
        const newOrder = new Order({ customerName, items, total });
        await newOrder.save();

        // 2. Setup Nodemailer with Gmail
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER,  // your Gmail (from .env)
                pass: process.env.GMAIL_PASS   // app password (not normal Gmail password)
            }
        });

        // 3. Format items into readable text
        const itemsList = items
            .map(p => `${p.name} - ${p.price} лв.`)
            .join("\n");

        // 4. Send email notification
        await transporter.sendMail({
            from: `"My Shop" <${process.env.GMAIL_USER}>`,
            to: process.env.GMAIL_RECEIVER || process.env.GMAIL_USER, // recipient
            subject: "⚠️ New Order Received",
            text: `Customer: ${customerName}\n\nItems:\n${itemsList}\n\nTotal: ${total} лв.`,
            headers: {
                "X-Priority": "1 (Highest)",
                "X-MSMail-Priority": "High",
                "Importance": "High"
            }
        });

        res.json({ success: true, message: "Order saved and email sent!" });
    } catch (err) {
        console.error("Order save/email error:", err);
        res.status(500).json({ success: false, message: err.message });
    }
});

// Get all orders (sorted newest first)
router.get("/", async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

