document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const res = await fetch("https://mongodb-e1oa-production.up.railway.app/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user)); // Optional: store user info
      window.location.href = "../index.html"; // Redirect to homepage
    } else {
      document.getElementById("loginMessage").textContent = data.message || "Грешен имейл или парола.";
    }
  } catch (err) {
    console.error("Login error:", err);
    document.getElementById("loginMessage").textContent = "Възникна грешка при връзката със сървъра.";
  }
});

