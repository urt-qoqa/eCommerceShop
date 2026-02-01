// Product data for product detail page
const allProducts = [
    {
        id: 1,
        title: 'MacBook Pro 16" M3 Max',
        price: 3499.00,
        rating: 4.9,
        reviews: 2847,
        description: 'Powerful laptop with M3 Max chip, 36GB RAM, and stunning Liquid Retina XDR display for professional workflows.',
        image: 'prod-img/macbook-pro-16inch-m3-max.webp',
        category: 'Laptops',
        specs: {
            'Processor': 'Apple M3 Max Chip',
            'Memory': '36GB Unified Memory',
            'Storage': '1TB SSD Storage',
            'Display': '16.2-inch Liquid Retina XDR Display',
            'Battery': 'Up to 22 hours battery life'
        },
        stock: 15
    },
    {
        id: 2,
        title: 'iPhone 15 Pro Max',
        price: 1199.00,
        rating: 4.8,
        reviews: 5621,
        description: 'Latest flagship smartphone with titanium design, A17 Pro chip, and advanced camera system with 5x optical zoom.',
        image: 'prod-img/iphone-15-pro-max.avif',
        category: 'Phones',
        specs: {
            'Processor': 'Apple A17 Pro',
            'Display': '6.7-inch Super Retina XDR',
            'Camera': '48MP Main + 12MP Ultra Wide + 12MP 5x Zoom',
            'Battery': 'Up to 29 hours',
            'Storage': '256GB / 512GB / 1TB options'
        },
        stock: 12
    }
    // ... other products would be here
];

// Get product ID from URL
const params = new URLSearchParams(window.location.search);
const productId = parseInt(params.get('id')) || 1;
const product = allProducts.find(p => p.id === productId);

// Standardized Cart Storage Key
const CART_STORAGE_KEY = 'bytehub_cart';

function loadProductDetail() {
    if (!product) {
        const container = document.getElementById('productDetail');
        if (container) container.innerHTML = '<h2>Product Not Found</h2>';
        return;
    }

    // Basic implementation for compatibility
    document.title = `${product.title} - ByteHub`;
    const breadcrumb = document.getElementById('productBreadcrumb');
    if (breadcrumb) breadcrumb.textContent = product.title;

    const container = document.getElementById('productDetail');
    if (container) {
        container.innerHTML = `
            <div class="product-info">
                <h1>${product.title}</h1>
                <p class="price">$${product.price.toFixed(2)}</p>
                <div class="product-actions">
                    <button class="btn btn-primary" onclick="addToCart()">Add to Cart</button>
                </div>
            </div>
        `;
    }
}

function addToCart() {
    if (!product) return;
    const cart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
    const item = cart.find(i => i.id === product.id);
    if (item) {
        item.quantity += 1;
    } else {
        cart.push({ id: product.id, name: product.title, price: product.price, quantity: 1, image: product.image });
    }
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    alert(`${product.title} added to cart!`);
}

document.addEventListener('DOMContentLoaded', loadProductDetail);
