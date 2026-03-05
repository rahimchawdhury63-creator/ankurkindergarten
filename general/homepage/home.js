// Initialize Cart from LocalStorage
let cart = JSON.parse(localStorage.getItem('SylhetBitesCart')) || [];

function updateCartUI() {
    const countLabel = document.querySelector('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    countLabel.innerText = totalItems;
}

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: name, price: price, quantity: 1 });
    }
    
    localStorage.setItem('SylhetBitesCart', JSON.stringify(cart));
    updateCartUI();
    
    alert(`${name} added to cart!`);
}

// Open Cart (Simulation for now)
document.getElementById('cartBtn').addEventListener('click', () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        let itemsList = cart.map(item => `${item.name} (x${item.quantity}) - ${item.price * item.quantity} TK`).join('\n');
        alert("Your Cart:\n" + itemsList + "\n\nProceeding to payment coming soon!");
    }
});

// Initial Load
updateCartUI();

