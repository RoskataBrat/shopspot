const checkboxes = document.querySelectorAll('input[name="category"]');
    const minPriceInput = document.getElementById('minPrice');
    const maxPriceInput = document.getElementById('maxPrice');
    const container = document.getElementById('productContainer');

    checkboxes.forEach(cb => cb.addEventListener('change', filterProducts));
    minPriceInput.addEventListener('input', filterProducts);
    maxPriceInput.addEventListener('input', filterProducts);

    function filterProducts() {
        const selectedCategories = Array.from(checkboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        const min = parseFloat(minPriceInput.value) || 0;
        const max = parseFloat(maxPriceInput.value) || Infinity;

        const products = container.getElementsByClassName('product');

        Array.from(products).forEach(product => {
            const category = product.getAttribute('data-category');
            const price = parseFloat(product.getAttribute('data-price'));

            const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(category);
            const priceMatch = price >= min && price <= max;

            product.style.display = (categoryMatch && priceMatch) ? 'block' : 'none';
        });
    }

    function sortAZ() {
        const products = Array.from(container.getElementsByClassName('product'));
        products.sort((a, b) => a.textContent.localeCompare(b.textContent));
        container.innerHTML = '';
        products.forEach(p => container.appendChild(p));
    }

    function sortZA() {
        const products = Array.from(container.getElementsByClassName('product'));
        products.sort((a, b) => b.textContent.localeCompare(a.textContent));
        container.innerHTML = '';
        products.forEach(p => container.appendChild(p));
    }

    // sidebar_products.js
document.addEventListener("DOMContentLoaded", () => {
  fetch("../data/products.json")
    .then((res) => res.json())
    .then((products) => renderProducts(products));
});

function renderProducts(products) {
  const container = document.getElementById("productContainer");
  container.innerHTML = ""; // Clear static HTML

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    productDiv.innerHTML = `
      <a href="../Components/ProductPage.html?id=${product.id}">
        <img src="${product.image}" alt="${product.name}">
      </a>
      <h4>${product.name}</h4>
      <h4>Цена: ${product.price} лв.</h4>
      <p>${product.description}</p>
    `;

    container.appendChild(productDiv);
  });
}