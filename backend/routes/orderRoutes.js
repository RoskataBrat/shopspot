const express = require("express");
const Order = require("../models/Order");
const { Resend } = require("resend");

const router = express.Router();
const resend = new Resend(process.env.RESEND_API_KEY);

router.post("/", async (req, res) => {
  const { customerName, customerEmail, items, total } = req.body;

  try {
    // 1️⃣ Save order in MongoDB
    const newOrder = new Order({ customerName, customerEmail, items, total });
    await newOrder.save();

    // 2️⃣ Respond immediately to frontend
    res.json({ success: true, message: "Order finished successfully!" });

    // 3️⃣ Build email content
    const adminHTML = `
      <h2>🛒 Нова поръчка!</h2>
      <p><strong>Име:</strong> ${customerName}</p>
      <p><strong>Имейл:</strong> ${customerEmail}</p>
      <ul>
        ${items.map(i => `<li>${i.name} - ${i.price} лв.</li>`).join("")}
      </ul>
      <p><strong>Общо:</strong> ${total.toFixed(2)} лв.</p>
    `;

    // 4️⃣ Send email to admin (Resend API)
    await resend.emails.send({
      from: "Online Shop <onboarding@resend.dev>", // or your verified domain
      to: "ruslant.20b@gmail.com", // your admin email
      subject: "🛒 Нова поръчка в магазина",
      html: adminHTML,
    });

    console.log("✅ Email sent to admin successfully!");
  } catch (error) {
    console.error("❌ Error saving order or sending email:", error);
  }
});

module.exports = router;
