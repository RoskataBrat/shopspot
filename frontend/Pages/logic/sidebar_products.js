/*NEW UPGRADE*/

function applyFilters() {
  const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked'))
    .map(cb => cb.value);

  const minPrice = parseFloat(document.getElementById('minPrice').value) || 0;
  const maxPrice = parseFloat(document.getElementById('maxPrice').value) || Infinity;

  const products = document.querySelectorAll('.product');

  products.forEach(product => {
    const category = product.getAttribute('data-category');
    const price = parseFloat(product.getAttribute('data-price'));

    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(category);
    const priceMatch = price >= minPrice && price <= maxPrice;

    if (categoryMatch && priceMatch) {
      product.style.display = '';
    } else {
      product.style.display = 'none';
    }
  });
}

function sortAZ() {
  const container = document.getElementById('productContainer');
  const products = Array.from(container.children);

  products.sort((a, b) => {
    return a.querySelector('h4').innerText.localeCompare(b.querySelector('h4').innerText, 'bg');
  });

  products.forEach(p => container.appendChild(p));
}

function sortZA() {
  const container = document.getElementById('productContainer');
  const products = Array.from(container.children);

  products.sort((a, b) => {
    return b.querySelector('h4').innerText.localeCompare(a.querySelector('h4').innerText, 'bg');
  });

  products.forEach(p => container.appendChild(p));
}