document.getElementById('registerForm')?.addEventListener('submit', async function (e) {
  e.preventDefault();
  const name = document.getElementById('registerName').value;
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;

  const response = await fetch("https://online-shop-backend-p9t4.onrender.com/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });

  const result = await response.json();

  if (response.ok) {
    document.getElementById('registerMessage').style.color = 'green';
    document.getElementById('registerMessage').textContent = result.message;
    setTimeout(() => window.location.href = "../../index.html", 1000);
  } else {
    document.getElementById('registerMessage').style.color = 'red';
    document.getElementById('registerMessage').textContent = result.message;
  }
});
