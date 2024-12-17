// Product data
const product = {
  id: "1",
  name: "Classy Modern Smart watch",
  description:
    "I must explain to you how all this mistaken idea of denoun cing ple praising pain was born and I will give you a complete account of the system, and expound the actual teaching.",
  images: {
    purple:
      "https://images.unsplash.com/photo-1544117519-31a4b719223d?auto=format&fit=crop&q=80&w=1000",
    cyan: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1000",
    blue: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=1000",
    black:
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80&w=1000",
  },
  colors: ["purple", "cyan", "blue", "black"],
  sizes: [
    { name: "S", price: 69.0 },
    { name: "M", price: 79.0 },
    { name: "L", price: 89.0 },
    { name: "XL", price: 99.0 },
  ],
};

// Product state
let selectedColor = product.colors[0];
let selectedSize = product.sizes[0].name;
let quantity = 1;

// Initialize product display
function initializeProduct() {
  updateProductImage();
  initializeColorSelector();
  initializeSizeSelector();
}

function updateProductImage() {
  const productImage = document.getElementById("productImage");
  productImage.src = product.images[selectedColor];
  productImage.alt = `${product.name} in ${selectedColor}`;
}

function initializeColorSelector() {
  const colorSelector = document.getElementById("colorSelector");
  product.colors.forEach((color) => {
    const button = document.createElement("button");
    button.className = `color-option ${
      color === selectedColor ? "selected" : ""
    }`;
    button.style.backgroundColor = color;
    button.onclick = () => selectColor(color);
    colorSelector.appendChild(button);
  });
}

function initializeSizeSelector() {
  const sizeSelector = document.getElementById("sizeSelector");
  product.sizes.forEach((size) => {
    const button = document.createElement("button");
    button.className = `px-4 py-2 text-sm font-medium rounded-md ${
      selectedSize === size.name
        ? "bg-blue-600 text-white"
        : "bg-gray-200 text-gray-900 hover:bg-gray-300"
    }`;
    button.textContent = `${size.name} $${size.price}`;
    button.onclick = () => selectSize(size.name);
    sizeSelector.appendChild(button);
  });
}

function selectColor(color) {
  selectedColor = color;
  updateProductImage();
  document.querySelectorAll(".color-option").forEach((button) => {
    button.classList.toggle("selected", button.style.backgroundColor === color);
  });
}

function selectSize(size) {
  selectedSize = size;
  const selectedSizeData = product.sizes.find((s) => s.name === size);
  document.getElementById(
    "productPrice"
  ).textContent = `$${selectedSizeData.price.toFixed(2)}`;

  document.querySelectorAll("#sizeSelector button").forEach((button) => {
    button.className = `px-4 py-2 text-sm font-medium rounded-md ${
      size === button.textContent.split(" ")[0]
        ? "bg-blue-600 text-white"
        : "bg-gray-200 text-gray-900 hover:bg-gray-300"
    }`;
  });
}

function incrementQuantity() {
  quantity++;
  document.getElementById("quantity").value = quantity;
}

function decrementQuantity() {
  if (quantity > 1) {
    quantity--;
    document.getElementById("quantity").value = quantity;
  }
}

// Initialize product when DOM is loaded
document.addEventListener("DOMContentLoaded", initializeProduct);
