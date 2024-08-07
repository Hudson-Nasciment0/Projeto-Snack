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

// Efeito de digitação no logo
const typedLogo = document.getElementById('typed-logo');
const logoText = typedLogo.textContent;
typedLogo.textContent = '';

function typeWriter(text, i = 0) {
    if (i < text.length) {
        typedLogo.textContent += text.charAt(i);
        setTimeout(() => typeWriter(text, i + 1), 100);
    }
}

typeWriter(logoText);

// Menu items
const menuItems = [
    { id: 1, name: 'Hambúrguer Clássico', price: 15.99, category: 'burger', image: '/img/classic-burger.jpg', description: 'Carne suculenta, queijo, alface e tomate.' },
    { id: 2, name: 'Hambúrguer Vegetariano', price: 14.99, category: 'burger', image: 'images/veggie-burger.jpg', description: 'Hambúrguer de grão-de-bico com legumes grelhados.' },
    { id: 3, name: 'Batata Frita', price: 5.99, category: 'side', image: 'images/fries.jpg', description: 'Batatas crocantes e douradas.' },
    { id: 4, name: 'Refrigerante', price: 3.99, category: 'drink', image: 'images/soda.jpg', description: 'Diversas opções de refrigerantes.' },
    { id: 5, name: 'Milk-shake', price: 7.99, category: 'drink', image: 'images/milkshake.jpg', description: 'Milk-shake cremoso em diversos sabores.' }
];

const menuItemsContainer = document.querySelector('.menu-items');

function displayMenuItems(items) {
    menuItemsContainer.innerHTML = items.map(item => `
        <div class="menu-item" data-category="${item.category}">
            <img src="${item.image}" alt="${item.name}" loading="lazy" style="width: 200px; ">
            <h3 id="testejs">${item.name}</h3>
            <p id="testejs2">${item.description}</p>
            <p id="testejs3" class="price">R$ ${item.price.toFixed(2)}</p>
            <button id="testebutton" onclick="addToCart(${item.id})">Adicionar ao Carrinho</button>
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
    showNotification(`${item.name} adicionado ao carrinho!`);
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 3000);
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
    cartItemsContainer.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <span>${item.name}</span>
            <span>R$ ${item.price.toFixed(2)}</span>
            <button onclick="removeFromCart(${index})">Remover</button>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotal.textContent = total.toFixed(2);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    updateCartDisplay();
}

function checkout() {
    if (cart.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }
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
    'gallery4.jpg',
    'gallery5.jpg'
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
        alert('Por favor, preencha todos os campos obrigatórios.');
        return false;
    }

    if (!isValidEmail(email)) {
        alert('Por favor, insira um endereço de e-mail válido.');
        return false;
    }

    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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

// Animação de rolagem suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});




/*========== scroll reveal ==========*/
ScrollReveal({
  //  reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
 });

 ScrollReveal().reveal('.home-content, #menu, #gallery, #location', { origin: 'top' });

 ScrollReveal().reveal('.home-img', { origin: 'bottom' });

 ScrollReveal().reveal('.home-content h1, .menu-filters, #contact', { origin: 'left' });

 ScrollReveal().reveal('.home-content p, #location', { origin: 'right' });