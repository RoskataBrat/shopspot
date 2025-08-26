function loadCart() {
    const container = document.getElementById("cartItemsContainer");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        container.innerHTML = "<p style='text-align:center;'>Количката е празна.</p>";
        return;
    }

    container.innerHTML = "";

    cart.forEach((product, index) => {
        const item = document.createElement("div");
        item.className = "cart-item";
        item.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="item-details">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <span class="price">Цена: ${product.price} лв.</span>
            </div>
            <button class="remove-button" data-index="${index}">Премахни</button>
        `;
        container.appendChild(item);
    });

    // Remove item buttons
    document.querySelectorAll(".remove-button").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const indexToRemove = parseInt(e.target.getAttribute("data-index"));
            cart.splice(indexToRemove, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            loadCart();
        });
    });

    // Payment button click → store same cart under "cartItems"
    document.querySelectorAll(".payment-button").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.setItem("cartItems", JSON.stringify(cart));
            window.location.href = "../Components/Payment.html";
        });
    });
}

loadCart();

