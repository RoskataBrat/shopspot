import express from "express";
import Order from "../models/Order.js";
import { Resend } from "resend";

const router = express.Router();
const resend = new Resend(process.env.RESEND_API_KEY);

router.post("/", async (req, res) => {
  const { customerName, customerEmail, items, total } = req.body;

  try {
    const newOrder = new Order({ customerName, customerEmail, items, total });
    await newOrder.save();

    // Respond to frontend first
    res.json({ success: true, message: "Order finished successfully!" });

    // Admin email content
    const adminHTML = `
      <h2>🛒 Нова поръчка!</h2>
      <p><strong>Име:</strong> ${customerName}</p>
      <p><strong>Имейл:</strong> ${customerEmail}</p>
      <ul>
        ${items.map(i => `<li>${i.name} - ${i.price} лв.</li>`).join("")}
      </ul>
      <p><strong>Общо:</strong> ${total.toFixed(2)} лв.</p>
    `;

    await resend.emails.send({
      from: "Online Shop <onboarding@resend.dev>",
      to: "yourgmail@gmail.com", // <-- put your real Gmail
      subject: "🛒 Нова поръчка в магазина",
      html: adminHTML,
    });

    console.log("✅ Email sent to admin successfully!");
  } catch (error) {
    console.error("❌ Error saving order or sending email:", error);
  }
});

export default router;
