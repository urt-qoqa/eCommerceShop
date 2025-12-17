// Product data for the home page
const homePageProducts = [
    {
        id: 1,
        title: 'MacBook Pro 16" M3 Max',
        price: 3499.00,
        rating: 4.9,
        reviews: 2847,
        description: 'Powerful laptop with M3 Max chip, 36GB RAM, and stunning Liquid Retina XDR display for professional workflows.',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
        category: 'Laptops'
    },
    {
        id: 2,
        title: 'iPhone 15 Pro Max',
        price: 1199.00,
        rating: 4.8,
        reviews: 5621,
        description: 'Latest flagship smartphone with titanium design, A17 Pro chip, and advanced camera system with 5x optical zoom.',
        image: 'https://images.unsplash.com/photo-1592286927505-1def25115558?w=400&h=400&fit=crop',
        category: 'Phones'
    },
    {
        id: 3,
        title: 'Dell XPS 15 OLED',
        price: 2299.00,
        rating: 4.7,
        reviews: 1834,
        description: 'Premium Windows laptop featuring stunning 3.5K OLED display, Intel Core i9 processor, and sleek aluminum chassis.',
        image: 'https://images.unsplash.com/photo-1588872657840-790ff3bde08c?w=400&h=400&fit=crop',
        category: 'Laptops'
    },
    {
        id: 4,
        title: 'Samsung Galaxy S24 Ultra',
        price: 1299.00,
        rating: 4.9,
        reviews: 4293,
        description: 'Android flagship with built-in S Pen, 200MP camera, and powerful AI features for productivity and creativity.',
        image: 'https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=400&h=400&fit=crop',
        category: 'Phones'
    },
    {
        id: 5,
        title: 'Sony WH-1000XM5 Headphones',
        price: 399.00,
        rating: 4.8,
        reviews: 8742,
        description: 'Industry-leading noise canceling wireless headphones with exceptional sound quality and 30-hour battery life.',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
        category: 'Accessories'
    },
    {
        id: 6,
        title: 'iPad Pro 12.9" M2',
        price: 1099.00,
        rating: 4.7,
        reviews: 3156,
        description: 'Ultimate tablet experience with M2 chip, Liquid Retina XDR display, and support for Apple Pencil and Magic Keyboard.',
        image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=400&fit=crop',
        category: 'Tablets'
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
                <div class="stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5-Math.floor(product.rating))}</div>
                <span class="rating-count">(${product.reviews.toLocaleString()})</span>
            </div>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <p class="product-description">${product.description}</p>
            <div style="display: flex; gap: 8px;">
                <a href="product-detail.html?id=${product.id}" class="btn btn-secondary" style="flex: 1;">View Details</a>
                <button class="btn btn-secondary" onclick="addProductToCart(${product.id}, '${product.title}', ${product.price})" style="flex: 1;">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

// Add to cart function
function addProductToCart(id, title, price) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, title, price, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    showNotification(`${title} added to cart!`);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadHomeProducts();
});
