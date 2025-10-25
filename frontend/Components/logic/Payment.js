document.addEventListener("DOMContentLoaded", () => {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const summaryList = document.getElementById("summaryList");
  const totalPriceEl = document.getElementById("totalPrice");

  let total = 0;

  // Show products in summary
  cartItems.forEach(product => {
    const li = document.createElement("li");
    li.textContent = `${product.name} - ${product.price} лв.`;
    summaryList.appendChild(li);
    total += parseFloat(product.price);
  });

  totalPriceEl.innerHTML = `<strong>Общо:</strong> ${total.toFixed(2)} лв.`;

  // Payment form submit
  const form = document.getElementById("paymentForm");
  const successMsg = document.getElementById("successMessage");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const cardNumber = document.getElementById("card-number").value.trim();
    const expiry = document.getElementById("expiry").value.trim();
    const cvv = document.getElementById("cvv").value.trim();

    if (!name || !email || !cardNumber || !expiry || !cvv) {
      alert("Моля, попълнете всички полета.");
      return;
    }

    const orderData = {
      customerName: name,
      customerEmail: email,
      items: cartItems,
      total
    };

    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData)
      });

      const data = await res.json();
      if (data.success) {
        // ✅ Show confirmation message
        successMsg.innerHTML = `<h3>✅ Order finished!</h3><p>Благодарим Ви, ${orderData.customerName}!</p><p>Ще бъдете пренасочени към началната страница след 5 секунди...</p>`;
        successMsg.style.display = "block";

        // Clear cart
        localStorage.removeItem("cart");
        localStorage.removeItem("cartItems");

        // Redirect after delay
        setTimeout(() => {
          window.location.href = "../index.html";
        }, 5000);
      } else {
        alert("⚠️ Грешка при запазване на поръчката!");
      }
    } catch (err) {
      console.error("Error saving order:", err);
      alert("⚠️ Сървърна грешка!");
    }
  });
});
