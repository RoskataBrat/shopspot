// Register
document.getElementById('registerForm')?.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('registerName').value;
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;

  if (!email.includes('@') || password.length < 4) {
    document.getElementById('registerMessage').textContent = "Невалиден имейл или парола.";
    return;
  }

  const user = { name, email, password };
  localStorage.setItem('user', JSON.stringify(user));
  document.getElementById('registerMessage').style.color = 'green';
  document.getElementById('registerMessage').textContent = "Успешна регистрация!";
  setTimeout(() => window.location.href = "../SignIn.html", 1000);
});