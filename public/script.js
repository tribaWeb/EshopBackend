// Načtení produktů
async function fetchProducts() {
    try {
        const response = await fetch('/api/products');
        const products = await response.json();

        const productContainer = document.getElementById('productContainer');
        productContainer.innerHTML = ''; // Vyčistí předchozí produkty

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <h3>${product.name}</h3>
                <p>Cena: ${product.price} Kč</p>
                <p>Skladem: ${product.quantity}</p>
                <p>Kategorie: ${product.category}</p>
            `;
            productContainer.appendChild(productCard);
        });
    } catch (error) {
        console.error('Chyba při načítání produktů:', error);
    }
}

// Otevření modálního okna
const adminButton = document.getElementById('adminButton');
const loginModal = document.getElementById('loginModal');
adminButton.addEventListener('click', () => {
    loginModal.style.display = 'flex';
});

// Přihlášení
const loginButton = document.getElementById('loginButton');
loginButton.addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'Dominik' && password === '123') {
        alert('Přihlášení úspěšné!');
        window.location.href = '/admin.html';
    } else {
        alert('Neplatné jméno nebo heslo!');
    }
});

// Načti produkty při načtení stránky
fetchProducts();
