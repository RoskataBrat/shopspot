// ------------------ LOAD PRODUCTS ------------------
document.addEventListener("DOMContentLoaded", () => {

    fetch("http://localhost:3000/api/products")
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById("product-list");
            data.forEach(product => {
                const div = document.createElement("div");
                div.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" />
                    <h3>${product.name}</h3>
                    <p>$${product.price}</p>
                `;
                container.appendChild(div);
            });
        });

    // ------------------ MOBILE MENU LOGIC ------------------
    const burger = document.getElementById("hamburger");
    const menu = document.querySelector(".section-buttons");
    const dropdowns = document.querySelectorAll(".dropdown-content");

    // Toggle hamburger menu
    burger.addEventListener("click", (e) => {
        e.stopPropagation();
        menu.classList.toggle("show");
    });

    // Dropdown click handling
    document.querySelectorAll(".dropdown > .header-button").forEach(button => {
        button.addEventListener("click", (e) => {
            e.stopPropagation();

            const parent = button.parentElement;

            // Close all others
            document.querySelectorAll(".dropdown").forEach(d => {
                if (d !== parent) d.classList.remove("show");
            });

            parent.classList.toggle("show");
        });
    });

    // Prevent menu clicks from closing it
    menu.addEventListener("click", (e) => {
        e.stopPropagation();
    });

    // Close menus on outside click
    document.addEventListener("click", () => {
        menu.classList.remove("show");
        document.querySelectorAll(".dropdown").forEach(d => d.classList.remove("show"));
    });

});
