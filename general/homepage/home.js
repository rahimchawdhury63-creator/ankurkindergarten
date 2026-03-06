document.addEventListener("DOMContentLoaded", () => {
    // Product details (In a real DB, this comes from the server)
    const product = {
        id: "samosa_10_pack",
        name: "Mini Chicken Samosa (10 Pack)",
        price: 180,
        image: "https://sylhetbites.pages.dev/img/vibrant-bangladeshi-homemade-healthy-mini-chiken-samosa-SylhetBites.png"
    };

    // --- Cart State Management ---
    // We use localStorage so the cart persists when users navigate to "About Us" and back
    let cart = JSON.parse(localStorage.getItem("sylhetBitesCart")) || [];

    // DOM Elements
    const cartBtn = document.getElementById("cart-btn");
    const closeCartBtn = document.getElementById("close-cart");
    const cartDrawer = document.getElementById("cart-drawer");
    const cartOverlay = document.getElementById("cart-overlay");
    const addToCartBtn = document.getElementById("add-to-cart-btn");
    const cartItemsContainer = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotalPrice = document.getElementById("cart-total-price");

    // --- Functions ---

    // Save to LocalStorage
    function saveCart() {
        localStorage.setItem("sylhetBitesCart", JSON.stringify(cart));
        renderCart();
    }

    // Add item to cart
    function addToCart() {
        // Check if already in cart
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        
        saveCart();
        openCart(); // Show drawer immediately for good UX
    }

    // Remove item
    window.removeFromCart = function(id) {
        cart = cart.filter(item => item.id !== id);
        saveCart();
    }

    // Update UI
    function renderCart() {
        cartItemsContainer.innerHTML = "";
        let totalItems = 0;
        let totalPrice = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<p style='text-align:center; color:#777; margin-top:20px;'>Your cart is empty.</p>";
        } else {
            cart.forEach(item => {
                totalItems += item.quantity;
                totalPrice += item.price * item.quantity;

                const itemElement = document.createElement("div");
                itemElement.classList.add("cart-item");
                itemElement.innerHTML = `
                    <div>
                        <h4 style="font-size:14px;">${item.name}</h4>
                        <p style="font-size:12px; color:#777;">৳${item.price} x ${item.quantity}</p>
                    </div>
                    <button onclick="removeFromCart('${item.id}')" style="background:none; border:none; color:red; cursor:pointer;">Remove</button>
                `;
                cartItemsContainer.appendChild(itemElement);
            });
        }

        cartCount.innerText = totalItems;
        cartTotalPrice.innerText = `৳${totalPrice}`;
    }

    // Drawer toggles
    function openCart() {
        cartDrawer.classList.add("open");
        cartOverlay.classList.add("show");
    }

    function closeCart() {
        cartDrawer.classList.remove("open");
        cartOverlay.classList.remove("show");
    }

    // --- Event Listeners ---
    addToCartBtn.addEventListener("click", addToCart);
    cartBtn.addEventListener("click", openCart);
    closeCartBtn.addEventListener("click", closeCart);
    cartOverlay.addEventListener("click", closeCart);

    // Initial render on page load
    renderCart();
});
