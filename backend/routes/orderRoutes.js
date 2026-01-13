const express = require("express");
const Order = require("../models/Order");
const { Resend } = require("resend");

const router = express.Router();
const resend = new Resend(process.env.RESEND_API_KEY);

router.post("/", async (req, res) => {
  const { customerName, customerEmail, items, total } = req.body;

  try {
    // 1️⃣ Save order
    const newOrder = new Order({ customerName, customerEmail, items, total });
    await newOrder.save();

    // 2️⃣ Build email
    const adminHTML = `
      <h2>🛒 Нова поръчка!</h2>
      <p><strong>Име:</strong> ${customerName}</p>
      <p><strong>Имейл:</strong> ${customerEmail}</p>
      <ul>
        ${items.map(i => `<li>${i.name} - ${i.price} лв.</li>`).join("")}
      </ul>
      <p><strong>Общо:</strong> ${total.toFixed(2)} лв.</p>
    `;

    // 3️⃣ Send email
    await resend.emails.send({
      from: "Online Shop <onboarding@resend.dev>",
      to: "ruslant.20b@gmail.com",
      subject: "🛒 Нова поръчка в магазина",
      html: adminHTML,
    });

    // 4️⃣ Respond ONLY after everything succeeds
    res.json({ success: true, message: "Order finished successfully!" });

  } catch (error) {
    console.error("❌ Error:", error);

    res.status(500).json({
      success: false,
      message: "Order failed. Please try again."
    });
  }
});
