 function scrollCarousel(direction) {
    const container = document.getElementById('productList');
    const scrollAmount = 240; // width of one product + gap
    container.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth'
    });
  }