 const products = [
      { name: "Redmi A3", id: 1 },
      { name: "Nokia Smart", id: 2 },
      { name: "Iphone 16", id: 3 },
      { name: "Samsung Galaxy S23", id: 4 },
      { name: "Huawei P30", id: 5 },
      { name: "Lenovo ThinkBook", id: 6 },
      {name: "Adidas Tshirt", id: 10}
    ];

    const searchInput = document.getElementById("searchInput");
    const suggestionsDiv = document.getElementById("suggestions");

    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase();
      suggestionsDiv.innerHTML = "";

      if (!query) return;

      const matches = products.filter(product =>
        product.name.toLowerCase().includes(query)
      );

      matches.forEach(product => {
        const div = document.createElement("div");
        div.classList.add("suggestion-item");
        div.textContent = product.name;
        div.onclick = () => {
          redirectToProduct(product.name);
        };
        suggestionsDiv.appendChild(div);
      });
    });

    document.querySelector(".searchButton").addEventListener("click", () => {
      const name = searchInput.value.trim();
      redirectToProduct(name);
    });

    function redirectToProduct(productName) {
      const product = products.find(p => p.name.toLowerCase() === productName.toLowerCase());
      if (product) {
        // 👇 redirect to Components folder
        window.location.href = "../Components/ProductPage.html?id=" + product.id;
      } else {
        alert("Продуктът не е намерен.");
      }
    }

    function viewProduct(id) {
      window.location.href = "../Components/ProductPage.html?id=" + id;
    }