const products = [
  {
    id: "fc-1888",
    name: "flux capacitor", 
    averagerating: 4.5},
  {
    id: "fc-2050", 
    name: "power laces", 
    averagerating: 4.7},
  {
    id: "fc-1978", 
    name: "time circuits", 
    averagerating: 3.5},
  {
    id: "fc-2000", 
    name: "low voltage reactor", 
    averagerating: 3.9},
  {
    id: "fc-1969", 
    name: "warp equalizer", 
    averagerating: 5}
];

document.addEventListener("DOMContentLoaded", () => {
  const productSelect = document.getElementById('product');
  if (productSelect) {
    products.forEach(product => {
      const option = document.createElement('option');
      option.value = product.id;
      option.textContent = product.name;
      productSelect.appendChild(option);
    });
  }

  const reviewCountElement = document.getElementById('reviewCount');
  if (reviewCountElement) {
    let count = localStorage.getItem("reviewCount") || 0;
    count++;
    localStorage.setItem("reviewCount", count);
    reviewCountElement.textContent = count;
  }
});


  