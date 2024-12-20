// Initialize quantity input handler
document.getElementById("quantity").addEventListener("change", (e) => {
  const value = parseInt(e.target.value);
  if (isNaN(value) || value < 1) {
    e.target.value = 1;
    quantity = 1;
  } else {
    quantity = value;
  }
});
