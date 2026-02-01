<<<<<<< HEAD
// All products database
const allProducts = [
    {
        id: 1,
        title: 'MacBook Pro 16" M3 Max',
        price: 3499.00,
        rating: 4.9,
        reviews: 2847,
        description: 'Powerful laptop with M3 Max chip, 36GB RAM, and stunning Liquid Retina XDR display for professional workflows.',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
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
        image: 'https://images.unsplash.com/photo-1592286927505-1def25115558?w=400&h=400&fit=crop',
        category: 'Phones',
        specs: {
            'Processor': 'Apple A17 Pro',
            'Display': '6.7-inch Super Retina XDR',
            'Camera': '48MP Main + 12MP Ultra Wide + 12MP 5x Zoom',
            'Battery': 'Up to 29 hours',
            'Storage': '256GB / 512GB / 1TB options'
        },
        stock: 12
    },
    {
        id: 3,
        title: 'Dell XPS 15 OLED',
        price: 2299.00,
        rating: 4.7,
        reviews: 1834,
        description: 'Premium Windows laptop featuring stunning 3.5K OLED display, Intel Core i9 processor, and sleek aluminum chassis.',
        image: 'https://images.unsplash.com/photo-1588872657840-790ff3bde08c?w=400&h=400&fit=crop',
        category: 'Laptops',
        specs: {
            'Processor': 'Intel Core i9 13th Gen',
            'Memory': '32GB DDR5 RAM',
            'Storage': '1TB NVMe SSD',
            'Display': '15.6-inch 3.5K OLED',
            'GPU': 'NVIDIA RTX 4070'
        },
        stock: 8
    },
    {
        id: 4,
        title: 'Samsung Galaxy S24 Ultra',
        price: 1299.00,
        rating: 4.9,
        reviews: 4293,
        description: 'Android flagship with built-in S Pen, 200MP camera, and powerful AI features for productivity and creativity.',
        image: 'https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=400&h=400&fit=crop',
        category: 'Phones',
        specs: {
            'Processor': 'Snapdragon 8 Gen 3 Leading',
            'Display': '6.8-inch Dynamic AMOLED 2X',
            'Camera': '200MP Main + 50MP Ultra Wide',
            'Battery': '5000mAh with fast charging',
            'Storage': '512GB / 1TB options'
        },
        stock: 10
    },
    {
        id: 5,
        title: 'Sony WH-1000XM5 Headphones',
        price: 399.00,
        rating: 4.8,
        reviews: 8742,
        description: 'Industry-leading noise canceling wireless headphones with exceptional sound quality and 30-hour battery life.',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
        category: 'Accessories',
        specs: {
            'Driver': '30mm with 4kHz resonance peak',
            'Noise Cancellation': 'Industry-leading ANC',
            'Battery': '30 hours (12 hrs with ANC)',
            'Weight': '250g',
            'Connectivity': 'Bluetooth 5.3'
        },
        stock: 20
    },
    {
        id: 6,
        title: 'iPad Pro 12.9" M2',
        price: 1099.00,
        rating: 4.7,
        reviews: 3156,
        description: 'Ultimate tablet experience with M2 chip, Liquid Retina XDR display, and support for Apple Pencil and Magic Keyboard.',
        image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=400&fit=crop',
        category: 'Tablets',
        specs: {
            'Processor': 'Apple M2 Chip',
            'Display': '12.9-inch Liquid Retina XDR',
            'Memory': '8GB / 16GB options',
            'Storage': '128GB to 2TB options',
            'Camera': '12MP Wide + 10MP Ultra Wide'
        },
        stock: 14
    },
    {
        id: 7,
        title: 'ASUS ROG Zephyrus G16',
        price: 2799.00,
        rating: 4.8,
        reviews: 2341,
        description: 'High-performance gaming laptop with RTX 4090, 240Hz display, and advanced cooling technology.',
        image: 'https://images.unsplash.com/photo-1587829191301-72e6c8e06f96?w=400&h=400&fit=crop',
        category: 'Laptops',
        specs: {
            'Processor': 'Intel Core i9 13th Gen',
            'GPU': 'NVIDIA RTX 4090',
            'Display': '16-inch 240Hz IPS',
            'Memory': '32GB DDR5 RAM',
            'Storage': '2TB NVMe SSD'
        },
        stock: 6
    },
    {
        id: 8,
        title: 'Google Pixel 8 Pro',
        price: 999.00,
        rating: 4.7,
        reviews: 4156,
        description: 'Google\'s flagship phone with advanced computational photography and Tensor chip for AI capabilities.',
        image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop',
        category: 'Phones',
        specs: {
            'Processor': 'Google Tensor G3',
            'Display': '6.7-inch OLED 120Hz',
            'Camera': '50MP Main + 48MP Zoom + 48MP Ultra Wide',
            'Battery': '5050mAh',
            'Storage': '256GB / 512GB options'
        },
        stock: 11
    },
    {
        id: 9,
        title: 'Apple AirPods Pro Max',
        price: 549.00,
        rating: 4.6,
        reviews: 1923,
        description: 'Premium over-ear headphones with spatial audio, active noise cancellation, and seamless Apple integration.',
        image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop',
        category: 'Accessories',
        specs: {
            'Driver': '40mm with advanced acoustic design',
            'Audio': 'Spatial Audio with Dolby Atmos',
            'Battery': '20+ hours',
            'Weight': '384.8g',
            'Connectivity': 'Bluetooth 5.3'
        },
        stock: 9
    },
    {
        id: 10,
        title: 'Lenovo ThinkPad X1 Carbon',
        price: 1899.00,
        rating: 4.5,
        reviews: 2456,
        description: 'Business laptop with premium build quality, long battery life, and excellent keyboard for professional work.',
        image: 'https://images.unsplash.com/photo-1588105565193-c3961ba5e0d8?w=400&h=400&fit=crop',
        category: 'Laptops',
        specs: {
            'Processor': 'Intel Core i7 13th Gen',
            'Memory': '16GB DDR5 RAM',
            'Storage': '512GB SSD',
            'Display': '14-inch FHD IPS',
            'Battery': 'Up to 15 hours'
        },
        stock: 13
    },
    {
        id: 11,
        title: 'Microsoft Surface Laptop 5',
        price: 1599.00,
        rating: 4.6,
        reviews: 1834,
        description: 'Elegant Windows laptop with touchscreen display, premium materials, and all-day battery.',
        image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b3f4?w=400&h=400&fit=crop',
        category: 'Laptops',
        specs: {
            'Processor': 'Intel Core i5 / i7 12th Gen',
            'Memory': '8GB / 16GB DDR5 RAM',
            'Storage': '512GB / 1TB SSD',
            'Display': '13.5-inch PixelSense Touchscreen',
            'Battery': 'Up to 17 hours'
        },
        stock: 7
    },
    {
        id: 12,
        title: 'Samsung Galaxy Buds Pro',
        price: 229.00,
        rating: 4.7,
        reviews: 5234,
        description: 'True wireless earbuds with active noise cancellation, high-quality sound, and comfortable fit.',
        image: 'https://images.unsplash.com/photo-1606841836239-c5a1a4a07af7?w=400&h=400&fit=crop',
        category: 'Accessories',
        specs: {
            'Driver': '5.4mm',
            'Battery': '8 hours (18 hours with case)',
            'Noise Cancellation': 'Active Noise Cancellation',
            'Weight': '5.4g per bud',
            'Connectivity': 'Bluetooth 5.2'
        },
        stock: 25
    },
    {
        id: 13,
        title: 'OnePlus 12',
        price: 799.00,
        rating: 4.6,
        reviews: 2987,
        description: 'Fast and fluid Android phone with Snapdragon 8 Gen 3, 120Hz display, and rapid charging.',
        image: 'https://images.unsplash.com/photo-1511557537129-247cffb9b996?w=400&h=400&fit=crop',
        category: 'Phones',
        specs: {
            'Processor': 'Snapdragon 8 Gen 3 Leading',
            'Display': '6.7-inch AMOLED 120Hz',
            'Camera': '50MP Main + 48MP Zoom + 48MP Ultra Wide',
            'Battery': '5400mAh with 100W charging',
            'Storage': '256GB / 512GB options'
        },
        stock: 9
    },
    {
        id: 14,
        title: 'Samsung Galaxy Tab S9 Ultra',
        price: 1199.00,
        rating: 4.8,
        reviews: 2156,
        description: 'Large-screen Android tablet with AMOLED display, S Pen included, perfect for productivity and entertainment.',
        image: 'https://images.unsplash.com/photo-1559339352-11d3b0ab9b6e?w=400&h=400&fit=crop',
        category: 'Tablets',
        specs: {
            'Processor': 'Snapdragon 8 Gen 1 Leading',
            'Display': '14.6-inch Dynamic AMOLED 2X',
            'Memory': '12GB RAM',
            'Storage': '256GB / 512GB options',
            'Battery': '10090mAh'
        },
        stock: 5
    },
    {
        id: 15,
        title: 'Beats Studio Pro',
        price: 399.00,
        rating: 4.5,
        reviews: 3421,
        description: 'Professional-grade wireless headphones with excellent noise cancellation and premium audio quality.',
        image: 'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=400&h=400&fit=crop',
        category: 'Accessories',
        specs: {
            'Driver': '40mm Apple W1 chip',
            'Noise Cancellation': 'Pure Adaptive Noise Cancellation',
            'Battery': '40 hours',
            'Weight': '267g',
            'Connectivity': 'Bluetooth 5.3'
        },
        stock: 11
    },
    {
        id: 16,
        title: 'MSI GE76 Raider',
        price: 2199.00,
        rating: 4.7,
        reviews: 1654,
        description: 'Gaming laptop with RTX 4080, Intel Core i9, 240Hz display for intense gaming sessions.',
        image: 'https://images.unsplash.com/photo-1588329997298-02b76b240176?w=400&h=400&fit=crop',
        category: 'Laptops',
        specs: {
            'Processor': 'Intel Core i9 12th Gen',
            'GPU': 'NVIDIA RTX 4080',
            'Display': '17.3-inch 240Hz FHD IPS',
            'Memory': '32GB DDR5 RAM',
            'Storage': '1TB NVMe SSD'
        },
        stock: 4
    }
];

// Get product ID from URL
const params = new URLSearchParams(window.location.search);
const productId = parseInt(params.get('id')) || 1;
const product = allProducts.find(p => p.id === productId);

// Load product detail
function loadProductDetail() {
    if (!product) return;

    // Update breadcrumb
    document.getElementById('productBreadcrumb').textContent = product.title;

    // Update page title
    document.title = `${product.title} - ByteHub`;

    // Build product detail HTML
    const specsHTML = Object.entries(product.specs || {})
        .map(([key, value]) => `
            <div class="spec-row">
                <span class="spec-label">${key}</span>
                <span class="spec-value">${value}</span>
            </div>
        `).join('');

    const detailHTML = `
        <div class="product-image-section">
            <div class="product-image-main">
                <img src="${product.image}" alt="${product.title}" onerror="this.src='https://via.placeholder.com/500x500'">
            </div>
            <div class="product-image-gallery">
                <img src="${product.image}" alt="Gallery 1" class="gallery-thumb">
                <img src="${product.image}" alt="Gallery 2" class="gallery-thumb">
                <img src="${product.image}" alt="Gallery 3" class="gallery-thumb">
                <img src="${product.image}" alt="Gallery 4" class="gallery-thumb">
            </div>
        </div>
        <div class="product-info-section">
            <div class="product-category">${product.category}</div>
            <h1 class="product-detail-title">${product.title}</h1>
            <div class="product-rating-detail">
                <div class="stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5-Math.floor(product.rating))}</div>
                <span class="rating-count">(${product.reviews.toLocaleString()} reviews)</span>
            </div>
            <div class="product-price-detail">$${product.price.toFixed(2)}</div>
            <p class="product-description-detail">${product.description}</p>

            <div class="product-stock">
                <span class="stock-status">In Stock: ${product.stock} units available</span>
            </div>

            <div class="product-actions">
                <div class="quantity-selector">
                    <label>Quantity</label>
                    <div class="quantity-control">
                        <button class="qty-btn" onclick="decreaseQty()">−</button>
                        <input type="number" id="quantity" value="1" min="1" max="${product.stock}">
                        <button class="qty-btn" onclick="increaseQty()">+</button>
                    </div>
                </div>
                <button class="btn btn-primary" onclick="addToCart()">Add to Cart</button>
                <button class="btn btn-outline">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM16.5 11L11 5.5V13H9.5L15 18.5V11H16.5Z" fill="currentColor"/>
                    </svg>
                    Add to Wishlist
                </button>
            </div>

            <div class="product-benefits">
                <div class="benefit-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M12 1L15.09 9.26H24L17.18 14.66L20.27 22.92L12 17.5L3.73 22.92L6.82 14.66L0 9.26H8.91L12 1Z" fill="currentColor"/>
                    </svg>
                    <span>Free shipping on orders over $50</span>
                </div>
                <div class="benefit-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM16.5 11L11 5.5V13H9.5L15 18.5V11H16.5Z" fill="currentColor"/>
                    </svg>
                    <span>1 year warranty included</span>
                </div>
                <div class="benefit-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM16.5 11L11 5.5V13H9.5L15 18.5V11H16.5Z" fill="currentColor"/>
                    </svg>
                    <span>30-day return policy</span>
                </div>
            </div>

            <div class="product-specs">
                <h3>Key Specifications</h3>
                <div class="specs-list">
                    ${specsHTML}
                </div>
            </div>
        </div>
    `;

    document.getElementById('productDetail').innerHTML = detailHTML;
}

// Quantity controls
function increaseQty() {
    const qtyInput = document.getElementById('quantity');
    if (parseInt(qtyInput.value) < product.stock) {
        qtyInput.value = parseInt(qtyInput.value) + 1;
    }
}

function decreaseQty() {
    const qtyInput = document.getElementById('quantity');
    if (parseInt(qtyInput.value) > 1) {
        qtyInput.value = parseInt(qtyInput.value) - 1;
    }
}

// Add to cart
function addToCart() {
    const quantity = parseInt(document.getElementById('quantity').value);
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            quantity: quantity
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    showNotification(`${product.title} added to cart!`);
    document.getElementById('quantity').value = 1;
}

// Load related products
function loadRelatedProducts() {
    const related = allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
    const relatedHTML = related.map(p => `
        <div class="product-card">
            <div class="product-image">
                <img src="${p.image}" alt="${p.title}" onerror="this.src='https://via.placeholder.com/300x300'">
            </div>
            <h3 class="product-title">${p.title}</h3>
            <div class="product-rating">
                <div class="stars">${'★'.repeat(Math.floor(p.rating))}${'☆'.repeat(5-Math.floor(p.rating))}</div>
                <span class="rating-count">(${p.reviews.toLocaleString()})</span>
            </div>
            <div class="product-price">$${p.price.toFixed(2)}</div>
            <a href="product-detail.html?id=${p.id}" class="btn btn-secondary">View Details</a>
        </div>
    `).join('');
    document.getElementById('relatedProducts').innerHTML = relatedHTML;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadProductDetail();
    loadRelatedProducts();
});
=======
// All products database
const allProducts = [
    {
        id: 1,
        title: 'MacBook Pro 16" M3 Max',
        price: 3499.00,
        rating: 4.9,
        reviews: 2847,
        description: 'Powerful laptop with M3 Max chip, 36GB RAM, and stunning Liquid Retina XDR display for professional workflows.',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
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
        image: 'https://images.unsplash.com/photo-1592286927505-1def25115558?w=400&h=400&fit=crop',
        category: 'Phones',
        specs: {
            'Processor': 'Apple A17 Pro',
            'Display': '6.7-inch Super Retina XDR',
            'Camera': '48MP Main + 12MP Ultra Wide + 12MP 5x Zoom',
            'Battery': 'Up to 29 hours',
            'Storage': '256GB / 512GB / 1TB options'
        },
        stock: 12
    },
    {
        id: 3,
        title: 'Dell XPS 15 OLED',
        price: 2299.00,
        rating: 4.7,
        reviews: 1834,
        description: 'Premium Windows laptop featuring stunning 3.5K OLED display, Intel Core i9 processor, and sleek aluminum chassis.',
        image: 'https://images.unsplash.com/photo-1588872657840-790ff3bde08c?w=400&h=400&fit=crop',
        category: 'Laptops',
        specs: {
            'Processor': 'Intel Core i9 13th Gen',
            'Memory': '32GB DDR5 RAM',
            'Storage': '1TB NVMe SSD',
            'Display': '15.6-inch 3.5K OLED',
            'GPU': 'NVIDIA RTX 4070'
        },
        stock: 8
    },
    {
        id: 4,
        title: 'Samsung Galaxy S24 Ultra',
        price: 1299.00,
        rating: 4.9,
        reviews: 4293,
        description: 'Android flagship with built-in S Pen, 200MP camera, and powerful AI features for productivity and creativity.',
        image: 'https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=400&h=400&fit=crop',
        category: 'Phones',
        specs: {
            'Processor': 'Snapdragon 8 Gen 3 Leading',
            'Display': '6.8-inch Dynamic AMOLED 2X',
            'Camera': '200MP Main + 50MP Ultra Wide',
            'Battery': '5000mAh with fast charging',
            'Storage': '512GB / 1TB options'
        },
        stock: 10
    },
    {
        id: 5,
        title: 'Sony WH-1000XM5 Headphones',
        price: 399.00,
        rating: 4.8,
        reviews: 8742,
        description: 'Industry-leading noise canceling wireless headphones with exceptional sound quality and 30-hour battery life.',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
        category: 'Accessories',
        specs: {
            'Driver': '30mm with 4kHz resonance peak',
            'Noise Cancellation': 'Industry-leading ANC',
            'Battery': '30 hours (12 hrs with ANC)',
            'Weight': '250g',
            'Connectivity': 'Bluetooth 5.3'
        },
        stock: 20
    },
    {
        id: 6,
        title: 'iPad Pro 12.9" M2',
        price: 1099.00,
        rating: 4.7,
        reviews: 3156,
        description: 'Ultimate tablet experience with M2 chip, Liquid Retina XDR display, and support for Apple Pencil and Magic Keyboard.',
        image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=400&fit=crop',
        category: 'Tablets',
        specs: {
            'Processor': 'Apple M2 Chip',
            'Display': '12.9-inch Liquid Retina XDR',
            'Memory': '8GB / 16GB options',
            'Storage': '128GB to 2TB options',
            'Camera': '12MP Wide + 10MP Ultra Wide'
        },
        stock: 14
    },
    {
        id: 7,
        title: 'ASUS ROG Zephyrus G16',
        price: 2799.00,
        rating: 4.8,
        reviews: 2341,
        description: 'High-performance gaming laptop with RTX 4090, 240Hz display, and advanced cooling technology.',
        image: 'https://images.unsplash.com/photo-1587829191301-72e6c8e06f96?w=400&h=400&fit=crop',
        category: 'Laptops',
        specs: {
            'Processor': 'Intel Core i9 13th Gen',
            'GPU': 'NVIDIA RTX 4090',
            'Display': '16-inch 240Hz IPS',
            'Memory': '32GB DDR5 RAM',
            'Storage': '2TB NVMe SSD'
        },
        stock: 6
    },
    {
        id: 8,
        title: 'Google Pixel 8 Pro',
        price: 999.00,
        rating: 4.7,
        reviews: 4156,
        description: 'Google\'s flagship phone with advanced computational photography and Tensor chip for AI capabilities.',
        image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop',
        category: 'Phones',
        specs: {
            'Processor': 'Google Tensor G3',
            'Display': '6.7-inch OLED 120Hz',
            'Camera': '50MP Main + 48MP Zoom + 48MP Ultra Wide',
            'Battery': '5050mAh',
            'Storage': '256GB / 512GB options'
        },
        stock: 11
    },
    {
        id: 9,
        title: 'Apple AirPods Pro Max',
        price: 549.00,
        rating: 4.6,
        reviews: 1923,
        description: 'Premium over-ear headphones with spatial audio, active noise cancellation, and seamless Apple integration.',
        image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop',
        category: 'Accessories',
        specs: {
            'Driver': '40mm with advanced acoustic design',
            'Audio': 'Spatial Audio with Dolby Atmos',
            'Battery': '20+ hours',
            'Weight': '384.8g',
            'Connectivity': 'Bluetooth 5.3'
        },
        stock: 9
    },
    {
        id: 10,
        title: 'Lenovo ThinkPad X1 Carbon',
        price: 1899.00,
        rating: 4.5,
        reviews: 2456,
        description: 'Business laptop with premium build quality, long battery life, and excellent keyboard for professional work.',
        image: 'https://images.unsplash.com/photo-1588105565193-c3961ba5e0d8?w=400&h=400&fit=crop',
        category: 'Laptops',
        specs: {
            'Processor': 'Intel Core i7 13th Gen',
            'Memory': '16GB DDR5 RAM',
            'Storage': '512GB SSD',
            'Display': '14-inch FHD IPS',
            'Battery': 'Up to 15 hours'
        },
        stock: 13
    },
    {
        id: 11,
        title: 'Microsoft Surface Laptop 5',
        price: 1599.00,
        rating: 4.6,
        reviews: 1834,
        description: 'Elegant Windows laptop with touchscreen display, premium materials, and all-day battery.',
        image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b3f4?w=400&h=400&fit=crop',
        category: 'Laptops',
        specs: {
            'Processor': 'Intel Core i5 / i7 12th Gen',
            'Memory': '8GB / 16GB DDR5 RAM',
            'Storage': '512GB / 1TB SSD',
            'Display': '13.5-inch PixelSense Touchscreen',
            'Battery': 'Up to 17 hours'
        },
        stock: 7
    },
    {
        id: 12,
        title: 'Samsung Galaxy Buds Pro',
        price: 229.00,
        rating: 4.7,
        reviews: 5234,
        description: 'True wireless earbuds with active noise cancellation, high-quality sound, and comfortable fit.',
        image: 'https://images.unsplash.com/photo-1606841836239-c5a1a4a07af7?w=400&h=400&fit=crop',
        category: 'Accessories',
        specs: {
            'Driver': '5.4mm',
            'Battery': '8 hours (18 hours with case)',
            'Noise Cancellation': 'Active Noise Cancellation',
            'Weight': '5.4g per bud',
            'Connectivity': 'Bluetooth 5.2'
        },
        stock: 25
    },
    {
        id: 13,
        title: 'OnePlus 12',
        price: 799.00,
        rating: 4.6,
        reviews: 2987,
        description: 'Fast and fluid Android phone with Snapdragon 8 Gen 3, 120Hz display, and rapid charging.',
        image: 'https://images.unsplash.com/photo-1511557537129-247cffb9b996?w=400&h=400&fit=crop',
        category: 'Phones',
        specs: {
            'Processor': 'Snapdragon 8 Gen 3 Leading',
            'Display': '6.7-inch AMOLED 120Hz',
            'Camera': '50MP Main + 48MP Zoom + 48MP Ultra Wide',
            'Battery': '5400mAh with 100W charging',
            'Storage': '256GB / 512GB options'
        },
        stock: 9
    },
    {
        id: 14,
        title: 'Samsung Galaxy Tab S9 Ultra',
        price: 1199.00,
        rating: 4.8,
        reviews: 2156,
        description: 'Large-screen Android tablet with AMOLED display, S Pen included, perfect for productivity and entertainment.',
        image: 'https://images.unsplash.com/photo-1559339352-11d3b0ab9b6e?w=400&h=400&fit=crop',
        category: 'Tablets',
        specs: {
            'Processor': 'Snapdragon 8 Gen 1 Leading',
            'Display': '14.6-inch Dynamic AMOLED 2X',
            'Memory': '12GB RAM',
            'Storage': '256GB / 512GB options',
            'Battery': '10090mAh'
        },
        stock: 5
    },
    {
        id: 15,
        title: 'Beats Studio Pro',
        price: 399.00,
        rating: 4.5,
        reviews: 3421,
        description: 'Professional-grade wireless headphones with excellent noise cancellation and premium audio quality.',
        image: 'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=400&h=400&fit=crop',
        category: 'Accessories',
        specs: {
            'Driver': '40mm Apple W1 chip',
            'Noise Cancellation': 'Pure Adaptive Noise Cancellation',
            'Battery': '40 hours',
            'Weight': '267g',
            'Connectivity': 'Bluetooth 5.3'
        },
        stock: 11
    },
    {
        id: 16,
        title: 'MSI GE76 Raider',
        price: 2199.00,
        rating: 4.7,
        reviews: 1654,
        description: 'Gaming laptop with RTX 4080, Intel Core i9, 240Hz display for intense gaming sessions.',
        image: 'https://images.unsplash.com/photo-1588329997298-02b76b240176?w=400&h=400&fit=crop',
        category: 'Laptops',
        specs: {
            'Processor': 'Intel Core i9 12th Gen',
            'GPU': 'NVIDIA RTX 4080',
            'Display': '17.3-inch 240Hz FHD IPS',
            'Memory': '32GB DDR5 RAM',
            'Storage': '1TB NVMe SSD'
        },
        stock: 4
    }
];

// Get product ID from URL
const params = new URLSearchParams(window.location.search);
const productId = parseInt(params.get('id')) || 1;
const product = allProducts.find(p => p.id === productId);

// Load product detail
function loadProductDetail() {
    if (!product) return;

    // Update breadcrumb
    document.getElementById('productBreadcrumb').textContent = product.title;

    // Update page title
    document.title = `${product.title} - ByteHub`;

    // Build product detail HTML
    const specsHTML = Object.entries(product.specs || {})
        .map(([key, value]) => `
            <div class="spec-row">
                <span class="spec-label">${key}</span>
                <span class="spec-value">${value}</span>
            </div>
        `).join('');

    const detailHTML = `
        <div class="product-image-section">
            <div class="product-image-main">
                <img src="${product.image}" alt="${product.title}" onerror="this.src='https://via.placeholder.com/500x500'">
            </div>
            <div class="product-image-gallery">
                <img src="${product.image}" alt="Gallery 1" class="gallery-thumb">
                <img src="${product.image}" alt="Gallery 2" class="gallery-thumb">
                <img src="${product.image}" alt="Gallery 3" class="gallery-thumb">
                <img src="${product.image}" alt="Gallery 4" class="gallery-thumb">
            </div>
        </div>
        <div class="product-info-section">
            <div class="product-category">${product.category}</div>
            <h1 class="product-detail-title">${product.title}</h1>
            <div class="product-rating-detail">
                <div class="stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5-Math.floor(product.rating))}</div>
                <span class="rating-count">(${product.reviews.toLocaleString()} reviews)</span>
            </div>
            <div class="product-price-detail">$${product.price.toFixed(2)}</div>
            <p class="product-description-detail">${product.description}</p>

            <div class="product-stock">
                <span class="stock-status">In Stock: ${product.stock} units available</span>
            </div>

            <div class="product-actions">
                <div class="quantity-selector">
                    <label>Quantity</label>
                    <div class="quantity-control">
                        <button class="qty-btn" onclick="decreaseQty()">−</button>
                        <input type="number" id="quantity" value="1" min="1" max="${product.stock}">
                        <button class="qty-btn" onclick="increaseQty()">+</button>
                    </div>
                </div>
                <button class="btn btn-primary" onclick="addToCart()">Add to Cart</button>
                <button class="btn btn-outline">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM16.5 11L11 5.5V13H9.5L15 18.5V11H16.5Z" fill="currentColor"/>
                    </svg>
                    Add to Wishlist
                </button>
            </div>

            <div class="product-benefits">
                <div class="benefit-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M12 1L15.09 9.26H24L17.18 14.66L20.27 22.92L12 17.5L3.73 22.92L6.82 14.66L0 9.26H8.91L12 1Z" fill="currentColor"/>
                    </svg>
                    <span>Free shipping on orders over $50</span>
                </div>
                <div class="benefit-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM16.5 11L11 5.5V13H9.5L15 18.5V11H16.5Z" fill="currentColor"/>
                    </svg>
                    <span>1 year warranty included</span>
                </div>
                <div class="benefit-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM16.5 11L11 5.5V13H9.5L15 18.5V11H16.5Z" fill="currentColor"/>
                    </svg>
                    <span>30-day return policy</span>
                </div>
            </div>

            <div class="product-specs">
                <h3>Key Specifications</h3>
                <div class="specs-list">
                    ${specsHTML}
                </div>
            </div>
        </div>
    `;

    document.getElementById('productDetail').innerHTML = detailHTML;
}

// Quantity controls
function increaseQty() {
    const qtyInput = document.getElementById('quantity');
    if (parseInt(qtyInput.value) < product.stock) {
        qtyInput.value = parseInt(qtyInput.value) + 1;
    }
}

function decreaseQty() {
    const qtyInput = document.getElementById('quantity');
    if (parseInt(qtyInput.value) > 1) {
        qtyInput.value = parseInt(qtyInput.value) - 1;
    }
}

// Add to cart
function addToCart() {
    const quantity = parseInt(document.getElementById('quantity').value);
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            quantity: quantity
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    showNotification(`${product.title} added to cart!`);
    document.getElementById('quantity').value = 1;
}

// Load related products
function loadRelatedProducts() {
    const related = allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
    const relatedHTML = related.map(p => `
        <div class="product-card">
            <div class="product-image">
                <img src="${p.image}" alt="${p.title}" onerror="this.src='https://via.placeholder.com/300x300'">
            </div>
            <h3 class="product-title">${p.title}</h3>
            <div class="product-rating">
                <div class="stars">${'★'.repeat(Math.floor(p.rating))}${'☆'.repeat(5-Math.floor(p.rating))}</div>
                <span class="rating-count">(${p.reviews.toLocaleString()})</span>
            </div>
            <div class="product-price">$${p.price.toFixed(2)}</div>
            <a href="product-detail.html?id=${p.id}" class="btn btn-secondary">View Details</a>
        </div>
    `).join('');
    document.getElementById('relatedProducts').innerHTML = relatedHTML;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadProductDetail();
    loadRelatedProducts();
});
>>>>>>> 830211d (	new file:   auth-script.js)
