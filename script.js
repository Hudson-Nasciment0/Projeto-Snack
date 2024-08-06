// Menu de hambúrguer para dispositivos móveis
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Modo escuro
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    updateDarkModeIcon();
    saveDarkModePreference();
});

function updateDarkModeIcon() {
    const sunIcon = darkModeToggle.querySelector('.fa-sun');
    const moonIcon = darkModeToggle.querySelector('.fa-moon');
    
    if (body.classList.contains('dark-mode')) {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'inline';
    } else {
        sunIcon.style.display = 'inline';
        moonIcon.style.display = 'none';
    }
}

function saveDarkModePreference() {
    localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
}

function loadDarkModePreference() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        body.classList.add('dark-mode');
    }
    updateDarkModeIcon();
}

loadDarkModePreference();

// Menu items
const menuItems = [
    { id: 1, name: 'Hambúrguer Clássico', price: 15.99, category: 'burger', image: 'classic-burger.jpg' },
    { id: 2, name: 'Hambúrguer Vegetariano', price: 14.99, category: 'burger', image: 'veggie-burger.jpg' },
    { id: 3, name: 'Batata Frita', price: 5.99, category: 'side', image: 'fries.jpg' },
    { id: 4, name: 'Refrigerante', price: 3.99, category: 'drink', image: 'soda.jpg' },
    // Adicione mais itens conforme necessário
];

const menuItemsContainer = document.querySelector('.menu-items');

function displayMenuItems(items) {
    menuItemsContainer.innerHTML = items.map(item => `
        <div class="menu-item" data-category="${item.category}">
            <img src="${item.image}" alt="${item.name}" loading="lazy">
            <h3>${item.name}</h3>
            <p>R$ ${item.price.toFixed(2)}</p>
            <button onclick="addToCart(${item.id})">Adicionar ao Carrinho</button>
        </div>
    `).join('');
}

displayMenuItems(menuItems);

// Filtro do menu
const menuFilters = document.querySelectorAll('.menu-filters button');

menuFilters.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.dataset.filter;
        const filteredItems = category === 'all' ? menuItems : menuItems.filter(item => item.category === category);
        displayMenuItems(filteredItems);
    });
});

// Carrinho de compras
let cart = [];

function addToCart(itemId) {
    const item = menuItems.find(item => item.id === itemId);
    cart.push(item);
    updateCartCount();
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;
}

// Modal do carrinho
const cartIcon = document.getElementById('cart-icon');
const cartModal = document.getElementById('cart-modal');
const closeCart = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');

cartIcon.addEventListener('click', openCart);
closeCart.addEventListener('click', closeCartModal);
checkoutBtn.addEventListener('click', checkout);

function openCart() {
    updateCartDisplay();
    cartModal.style.display = 'block';
}

function closeCartModal() {
    cartModal.style.display = 'none';
}

function updateCartDisplay() {
    cartItemsContainer.innerHTML = cart.map(item => `
        <div>
            <span>${item.name}</span>
            <span>R$ ${item.price.toFixed(2)}</span>
            <button onclick="removeFromCart(${item.id})">Remover</button>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotal.textContent = total.toFixed(2);
}

function removeFromCart(itemId) {
    const index = cart.findIndex(item => item.id === itemId);
    if (index !== -1) {
        cart.splice(index, 1);
        updateCartCount();
        updateCartDisplay();
    }
}

function checkout() {
    alert('Compra finalizada! Total: R$ ' + cartTotal.textContent);
    cart = [];
    updateCartCount();
    closeCartModal();
}

// Galeria
const galleryImages = [
    'gallery1.jpg',
    'gallery2.jpg',
    'gallery3.jpg',
    // Adicione mais imagens conforme necessário
];

const galleryContainer = document.querySelector('.gallery-images');

function displayGallery() {
    galleryContainer.innerHTML = galleryImages.map(image => `
        <img src="${image}" alt="Imagem da galeria" onclick="openLightbox('${image}')">
    `).join('');
}

displayGallery();

function openLightbox(imageUrl) {
    const lightbox = document.createElement('div');
    lightbox.classList.add('lightbox');
    lightbox.innerHTML = `
        <img src="${imageUrl}" alt="Imagem em tela cheia">
        <button class="close-lightbox" onclick="closeLightbox()">&times;</button>
    `;
    document.body.appendChild(lightbox);
}

function closeLightbox() {
    const lightbox = document.querySelector('.lightbox');
    if (lightbox) {
        lightbox.remove();
    }
}

// Formulário de contato
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    if (validateForm()) {
        alert('Mensagem enviada com sucesso!');
        contactForm.reset();
    }
});

function validateForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (!name || !email || !message) {
        alert('Por favor, preencha todos os campos.');
        return false;
    }

    return true;
}

// Google Maps (substitua YOUR_API_KEY pela sua chave de API do Google Maps)
function initMap() {
    const mapDiv = document.getElementById('map');
    const map = new google.maps.Map(mapDiv, {
        center: {lat: -23.550520, lng: -46.633309}, // Coordenadas de exemplo (São Paulo)
        zoom: 15
    });

    const marker = new google.maps.Marker({
        position: {lat: -23.550520, lng: -46.633309},
        map: map,
        title: 'Hamburgueria Delícia'
    });
}