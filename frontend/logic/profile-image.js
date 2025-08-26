

window.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");

  if (token) {
    // Replace login buttons with profile icon
    document.querySelector(".login-container").innerHTML = `
    <style>
        .profile-dropdown {
  position: relative;
  display: inline-block;
}
.profile-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
}
.profile-dropdown i {
  font-size: 30px;
  color: #333;
  background-color: #8280ffff;
  padding: 10px;
  border-radius: 50%;
}
.dropdown-content {
  display: none;
  position: absolute;
  right: 0;
  background-color: white;
  border: 1px solid #ddd;
  min-width: 120px;
  z-index: 1;
}
.profile-dropdown:hover .dropdown-content {
  display: block;
}

    </style>
      <div class="profile-dropdown">
        <i class="fa-solid fa-user"></i>
        <div class="dropdown-content">
          <a href="/frontend/Pages/profile.html">Профил</a>
          <a href="#" id="logout">Изход</a>
        </div>
      </div>
    `;

    document.getElementById("logout").addEventListener("click", () => {
      localStorage.removeItem("token");
      window.location.reload();
    });
  }
});
