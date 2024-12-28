const form = document.getElementById('productForm');
const productList = document.getElementById('productList');

async function fetchProducts() {
    const response = await fetch('/api/products');
    const products = await response.json();

    productList.innerHTML = '';
    products.forEach(product => {
        const li = document.createElement('li');
        li.textContent = `${product.name} - ${product.price} Kč (Skladem: ${product.quantity}, Kategorie: ${product.category})`;
        productList.appendChild(li);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Smazat';
        deleteButton.addEventListener('click', () => deleteProduct(product.id));
        li.appendChild(deleteButton);
    });
}

async function addProduct(product) {
    await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    });
    fetchProducts();
}

async function deleteProduct(id) {
    await fetch(`/api/products/${id}`, { method: 'DELETE' });
    fetchProducts();
}

form.addEventListener('submit', event => {
    event.preventDefault();
    const product = {
        name: form.name.value,
        price: form.price.value,
        quantity: form.quantity.value,
        category: form.category.value
    };
    addProduct(product);
    form.reset();
});

fetchProducts();
