const products = [
    { id: 1, name: 'Item A', price: 19.99 },
    { id: 2, name: 'Item B', price: 29.99 },
    { id: 3, name: 'Item C', price: 39.99 }
];

const cart = [];

function renderProducts() {
    const container = document.getElementById('products');
    container.innerHTML = '';
    products.forEach(product => {
        const div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        container.appendChild(div);
    });
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    renderCart();
}

function renderCart() {
    const list = document.getElementById('cart-items');
    list.innerHTML = '';
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        list.appendChild(li);
    });
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('cart-total').textContent = `Total: $${total.toFixed(2)}`;
}

window.addEventListener('DOMContentLoaded', () => {
    renderProducts();

});

function addProduct() {
    const nameInput = document.getElementById('product-name');
    const priceInput = document.getElementById('product-price');
    const name = nameInput.value.trim();
    const price = parseFloat(priceInput.value);
    if (!name || isNaN(price)) {
        return;
    }
    const id = products.length ? products[products.length - 1].id + 1 : 1;
    products.push({ id, name, price });
    nameInput.value = '';
    priceInput.value = '';
    renderProducts();
}
function handleCredentialResponse(response) {
    const payload = JSON.parse(atob(response.credential.split('.')[1]));
    document.getElementById('user-name').textContent = payload.name || payload.email;
    document.getElementById('login-area').style.display = 'none';
    document.getElementById('logout-area').style.display = 'block';
}

function signOut() {
    if (window.google && google.accounts) {
        google.accounts.id.disableAutoSelect();
    }
    document.getElementById('user-name').textContent = '';
    document.getElementById('login-area').style.display = 'block';
    document.getElementById('logout-area').style.display = 'none';
}
