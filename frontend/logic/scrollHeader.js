window.onscroll = function() { toggleSticky() };

  const header = document.getElementById("firstHeader");
  const sticky = header.offsetTop;

  function toggleSticky() {
    if (window.pageYOffset > sticky) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  }