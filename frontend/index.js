fetch('http://localhost:3000/api/products')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('product-list');
    data.forEach(product => {
      const div = document.createElement('div');
      div.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>$${product.price}</p>
      `;
      container.appendChild(div);
    });
  });
