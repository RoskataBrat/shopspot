document.addEventListener('DOMContentLoaded', () => {
  const id = localStorage.getItem('selectedProductId');
  if (!id) return;

  fetch(`/frontend/products.json`)
    .then(res => res.json())
    .then(product => {
      document.querySelector('.product-image img').src = product.image;
      document.querySelector('.product-details h1').textContent = `Смартфон ${product.name}`;
      document.querySelector('.product-details p').textContent = product.description;
      document.querySelector('.product-details .price').textContent = `Цена: ${product.price} лв.`;

      const featureList = document.querySelector('.product-details .features ul');
      featureList.innerHTML = '';
      product.features.forEach(f => {
        const li = document.createElement('li');
        li.textContent = f;
        featureList.appendChild(li);
      });
    });
});
