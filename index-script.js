// Product data for the home page - Using VALIDATED Local Images & Accurate IDs from products.js
const homePageProducts = [
    {
        id: 1,
        title: 'MacBook Pro 16" M3 Max',
        price: 3499.00,
        rating: 4.8,
        reviews: 2847,
        description: 'Powerful laptop with M3 Max chip, 36GB RAM, stunning Liquid Retina XDR display.',
        image: 'prod-img/macbook-pro-16inch-m3-max.webp'
    },
    {
        id: 11,
        title: 'iPhone 15 Pro Max',
        price: 1199.00,
        rating: 4.8,
        reviews: 5621,
        description: 'Latest flagship smartphone with titanium design, A17 Pro chip, advanced camera system.',
        image: 'prod-img/iphone-15-pro-max.avif'
    },
    {
        id: 2,
        title: 'Dell XPS 15 OLED',
        price: 2299.00,
        rating: 4.6,
        reviews: 1834,
        description: 'Premium Windows laptop with 3.5K OLED display, Intel Core i9, and sleek chassis.',
        image: 'prod-img/dell-xps-15-oled.webp'
    },
    {
        id: 12,
        title: 'Samsung Galaxy S24 Ultra',
        price: 1299.00,
        rating: 4.9,
        reviews: 4293,
        description: 'Android flagship with built-in S Pen, 200MP camera, and powerful AI features.',
        image: 'prod-img/samsung-galaxy-s24-ultra.jpg'
    },
    {
        id: 21,
        title: 'Sony WH-1000XM5',
        price: 399.00,
        rating: 4.8,
        reviews: 8742,
        description: 'Industry-leading noise canceling wireless headphones with exceptional sound quality.',
        image: 'prod-img/sony-wh-1000xm5.jpg'
    },
    {
        id: 24,
        title: 'iPad Pro 12.9" M2',
        price: 1099.00,
        rating: 4.7,
        reviews: 3156,
        description: 'Ultimate tablet experience with M2 chip and Liquid Retina XDR display.',
        image: 'prod-img/ipad-pro-12.9inch-m2.jpg'
    }
];

// Load products on home page
function loadHomeProducts() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;

    productsGrid.innerHTML = homePageProducts.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}" onerror="this.src='https://via.placeholder.com/300x300?text=${encodeURIComponent(product.title)}'">
            </div>
            <h3 class="product-title">${product.title}</h3>
            <div class="product-rating">
                <div class="stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}</div>
                <span class="rating-count">(${product.reviews.toLocaleString()})</span>
            </div>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <p class="product-description">${product.description}</p>
            <div style="display: flex; gap: 8px;">
                <a href="product-detail.html?id=${product.id}" class="btn btn-secondary" style="flex: 1;">View Details</a>
                <button class="btn btn-secondary" onclick="addToCartFromHome(${product.id})" style="flex: 1;">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

// Special wrapper to add from home page list
window.addToCartFromHome = function (productId) {
    const product = homePageProducts.find(p => p.id === productId);
    if (product) {
        addToCart(product.id, product.title, product.price, product.image);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadHomeProducts();

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
    }
});

