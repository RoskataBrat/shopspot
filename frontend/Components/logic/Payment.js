document.addEventListener("DOMContentLoaded", () => { 
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const summaryList = document.getElementById("summaryList");
    const totalPriceEl = document.getElementById("totalPrice");

    let total = 0;

    // Show products on the left
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
        const cardNumber = document.getElementById("card-number").value.trim();
        const expiry = document.getElementById("expiry").value.trim();
        const cvv = document.getElementById("cvv").value.trim();

        if (!name || !cardNumber || !expiry || !cvv) {
            alert("Моля, попълнете всички полета.");
            return;
        }

        // Prepare order data
        const orderData = {
            customerName: name,
            items: cartItems,
            total
        };

        try {
            const res = await fetch(" https://online-shop-backend-p9t4.onrender.com/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderData)
            });

            const data = await res.json();
            if (data.success) {
                successMsg.style.display = "block";

                // clear cart
                localStorage.removeItem("cart");
                localStorage.removeItem("cartItems");

                setTimeout(() => {
                    window.location.href = "../index.html";
                }, 3000);
            } else {
                alert("⚠️ Грешка при запазване на поръчката!");
            }
        } catch (err) {
            console.error("Error saving order:", err);
            alert("⚠️ Сървърна грешка!");
        }
    });
});
