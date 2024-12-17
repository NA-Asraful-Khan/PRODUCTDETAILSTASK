// Cart state
let cartItems = [];
let isCartOpen = false;

function addToCart() {
  const selectedSizeData = product.sizes.find((s) => s.name === selectedSize);
  const item = {
    id: product.id,
    name: product.name,
    color: selectedColor,
    size: selectedSize,
    quantity: parseInt(document.getElementById("quantity").value),
    price: selectedSizeData.price,
    image: product.images[selectedColor],
  };

  const existingItemIndex = cartItems.findIndex(
    (i) => i.id === item.id && i.color === item.color && i.size === item.size
  );

  if (existingItemIndex !== -1) {
    cartItems[existingItemIndex].quantity += item.quantity;
  } else {
    cartItems.push(item);
  }

  updateCartCount();
  showToast("Item added to cart");
}

function updateCartCount() {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartCount = document.getElementById("cartCount");
  cartCount.textContent = totalItems;
  cartCount.classList.toggle("hidden", totalItems === 0);
}

function openCart() {
  isCartOpen = true;
  updateCartDisplay();
  document.getElementById("cartModal").classList.remove("hidden");
}

function closeCart() {
  isCartOpen = false;
  document.getElementById("cartModal").classList.add("hidden");
}

function updateCartDisplay() {
  const cartItemsContainer = document.getElementById("cartItems");
  const cartSummary = document.getElementById("cartSummary");

  cartItemsContainer.innerHTML = cartItems
    .map(
      (item) => `
        <div class="grid grid-cols-[2fr,1fr,1fr,1fr,1fr] gap-4 py-4 border-b items-center">
            <div class="flex items-center gap-3">
                <img src="${item.image}" alt="${
        item.name
      }" class="w-12 h-12 object-cover rounded">
                <span class="text-sm font-medium">${item.name}</span>
            </div>
            <div class="text-sm text-gray-600">${item.color}</div>
            <div class="text-sm text-gray-600">${item.size}</div>
            <div class="text-sm text-gray-600">${item.quantity}</div>
            <div class="text-right font-medium">$${(
              item.price * item.quantity
            ).toFixed(2)}</div>
        </div>
    `
    )
    .join("");

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  cartSummary.innerHTML = `
        <div class="grid grid-cols-[2fr,1fr,1fr,1fr,1fr] gap-4 py-4 border-t">
            <div class="font-medium">Total</div>
            <div></div>
            <div></div>
            <div class="text-sm font-medium">${totalQuantity}</div>
            <div class="text-right font-bold">$${totalPrice.toFixed(2)}</div>
        </div>
        <div class="flex justify-end gap-4 mt-6">
            <button onclick="closeCart()" class="px-6 py-2 text-gray-600 bg-white border border-gray-300 rounded hover:bg-gray-50">
                Continue Shopping
            </button>
            <button onclick="checkout()" class="px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
                Checkout
            </button>
        </div>
    `;
}

function checkout() {
  cartItems = [];
  closeCart();
  updateCartCount();
  showToast("Thanks for shopping with us!");
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.style.transform = "translateX(0)";

  setTimeout(() => {
    toast.style.transform = "translateX(100%)";
  }, 3000);
}

// Close modal when clicking outside
document.addEventListener("mousedown", (event) => {
  const modal = document.getElementById("cartModal");
  const modalContent = modal.querySelector(".bg-white");

  if (isCartOpen && !modalContent.contains(event.target)) {
    closeCart();
  }
});
