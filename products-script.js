// Extended product data for all products
const allProducts = [
    {
        id: 1,
        title: 'MacBook Pro 16" M3 Max',
        price: 3499.00,
        rating: 4.9,
        reviews: 2847,
        description: 'Powerful laptop with M3 Max chip, 36GB RAM, and stunning Liquid Retina XDR display for professional workflows.',
        image: 'prod-img/macbook-pro-16inch-m3-max.webp',
        category: 'Laptops'
    },
    {
        id: 2,
        title: 'iPhone 15 Pro Max',
        price: 1199.00,
        rating: 4.8,
        reviews: 5621,
        description: 'Latest flagship smartphone with titanium design, A17 Pro chip, and advanced camera system with 5x optical zoom.',
        image: 'prod-img/iphone-15-pro-max.avif',
        category: 'Phones'
    },
    {
        id: 3,
        title: 'Dell XPS 15 OLED',
        price: 2299.00,
        rating: 4.7,
        reviews: 1834,
        description: 'Premium Windows laptop featuring stunning 3.5K OLED display, Intel Core i9 processor, and sleek aluminum chassis.',
        image: 'prod-img/dell-xps-15-oled.webp',
        category: 'Laptops'
    },
    {
        id: 4,
        title: 'Samsung Galaxy S24 Ultra',
        price: 1299.00,
        rating: 4.9,
        reviews: 4293,
        description: 'Android flagship with built-in S Pen, 200MP camera, and powerful AI features for productivity and creativity.',
        image: 'prod-img/samsung-galaxy-s24-ultra.jpg',
        category: 'Phones'
    },
    {
        id: 5,
        title: 'Sony WH-1000XM5 Headphones',
        price: 399.00,
        rating: 4.8,
        reviews: 8742,
        description: 'Industry-leading noise canceling wireless headphones with exceptional sound quality and 30-hour battery life.',
        image: 'prod-img/sony-wh-1000xm5.jpg',
        category: 'Accessories'
    },
    {
        id: 6,
        title: 'iPad Pro 12.9" M2',
        price: 1099.00,
        rating: 4.7,
        reviews: 3156,
        description: 'Ultimate tablet experience with M2 chip, Liquid Retina XDR display, and support for Apple Pencil and Magic Keyboard.',
        image: 'prod-img/ipad-pro-12.9inch-m2.jpg',
        category: 'Tablets'
    },
    {
        id: 7,
        title: 'ASUS ROG Zephyrus G16',
        price: 2799.00,
        rating: 4.8,
        reviews: 2341,
        description: 'High-performance gaming laptop with RTX 4090, 240Hz display, and advanced cooling technology.',
        image: 'prod-img/asus-rog-strix-g16.png',
        category: 'Laptops'
    },
    {
        id: 8,
        title: 'Google Pixel 8 Pro',
        price: 999.00,
        rating: 4.7,
        reviews: 4156,
        description: 'Google\'s flagship phone with advanced computational photography and Tensor chip for AI capabilities.',
        image: 'prod-img/google-pixel-8-pro.jpg',
        category: 'Phones'
    },
    {
        id: 9,
        title: 'Apple AirPods Pro Max',
        price: 549.00,
        rating: 4.6,
        reviews: 1923,
        description: 'Premium over-ear headphones with spatial audio, active noise cancellation, and seamless Apple integration.',
        image: 'prod-img/tech-accessories.jpg',
        category: 'Accessories'
    },
    {
        id: 10,
        title: 'Lenovo ThinkPad X1 Carbon',
        price: 1899.00,
        rating: 4.5,
        reviews: 2456,
        description: 'Business laptop with premium build quality, long battery life, and excellent keyboard for professional work.',
        image: 'prod-img/lenovo-thinkpad-x1-carbon.jpg',
        category: 'Laptops'
    },
    {
        id: 11,
        title: 'Microsoft Surface Laptop 5',
        price: 1599.00,
        rating: 4.6,
        reviews: 1834,
        description: 'Elegant Windows laptop with touchscreen display, premium materials, and all-day battery.',
        image: 'prod-img/microsoft-surface-laptop-5.jpg',
        category: 'Laptops'
    },
    {
        id: 12,
        title: 'Samsung Galaxy Buds Pro',
        price: 229.00,
        rating: 4.7,
        reviews: 5234,
        description: 'True wireless earbuds with active noise cancellation, high-quality sound, and comfortable fit.',
        image: 'prod-img/tech-accessories.jpg',
        category: 'Accessories'
    },
    {
        id: 13,
        title: 'OnePlus 12',
        price: 799.00,
        rating: 4.6,
        reviews: 2987,
        description: 'Fast and fluid Android phone with Snapdragon 8 Gen 3, 120Hz display, and rapid charging.',
        image: 'prod-img/oneplus-12.jpg',
        category: 'Phones'
    },
    {
        id: 14,
        title: 'Samsung Galaxy Tab S9 Ultra',
        price: 1199.00,
        rating: 4.8,
        reviews: 2156,
        description: 'Large-screen Android tablet with AMOLED display, S Pen included, perfect for productivity and entertainment.',
        image: 'prod-img/samsung-galaxy-z-fold-5.jpg',
        category: 'Tablets'
    },
    {
        id: 15,
        title: 'Beats Studio Pro',
        price: 399.00,
        rating: 4.5,
        reviews: 3421,
        description: 'Professional-grade wireless headphones with excellent noise cancellation and premium audio quality.',
        image: 'prod-img/hyperx-cloud-alpha.jpg',
        category: 'Accessories'
    },
    {
        id: 16,
        title: 'MSI GE76 Raider',
        price: 2199.00,
        rating: 4.7,
        reviews: 1654,
        description: 'Gaming laptop with RTX 4080, Intel Core i9, 240Hz display for intense gaming sessions.',
        image: 'prod-img/msi-creator-z16.png',
        category: 'Laptops'
    }
];

// Pagination state
let currentPage = 1;
const itemsPerPage = 12;
let filteredProducts = [...allProducts];

// Load and display products
function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;

    // Calculate pagination
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedProducts = filteredProducts.slice(start, end);

    // Display products
    productsGrid.innerHTML = paginatedProducts.map(product => `
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
                <button class="btn btn-secondary" onclick="addProductToCart(${product.id}, '${product.title.replace(/'/g, "\\'")}', ${product.price})" style="flex: 1;">Add to Cart</button>
            </div>
        </div>
    `).join('');

    // Update pagination info
    const showingCount = document.getElementById('showingCount');
    const totalCount = document.getElementById('totalCount');
    if (showingCount && totalCount) {
        showingCount.textContent = `${start + 1}-${Math.min(end, filteredProducts.length)}`;
        totalCount.textContent = filteredProducts.length;
    }

    // Update pagination buttons
    updatePagination();
}

// Filter products
function filterProducts() {
    const category = document.getElementById('categoryFilter').value;
    const sort = document.getElementById('sortFilter').value;

    // Apply category filter
    filteredProducts = allProducts.filter(product => {
        if (category === '') return true;
        return product.category === category;
    });

    // Apply sorting
    switch (sort) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        default:
            // Featured (original order)
            break;
    }

    currentPage = 1;
    loadProducts();
}

// Update pagination buttons
function updatePagination() {
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginationNumbers = document.getElementById('paginationNumbers');
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');

    if (!paginationNumbers) return;

    // Generate page numbers
    let html = '';
    for (let i = 1; i <= totalPages; i++) {
        html += `<button class="pagination-number ${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">${i}</button>`;
    }
    paginationNumbers.innerHTML = html;

    // Update prev/next buttons
    if (prevBtn) prevBtn.disabled = currentPage === 1;
    if (nextBtn) nextBtn.disabled = currentPage === totalPages;
}

// Go to specific page
function goToPage(page) {
    currentPage = page;
    loadProducts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Previous page
function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        loadProducts();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Next page
function nextPage() {
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        loadProducts();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Add to cart
function addProductToCart(id, title, price) {
    const cart = JSON.parse(localStorage.getItem('bytehub_cart')) || [];
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name: title, price, quantity: 1 });
    }

    localStorage.setItem('bytehub_cart', JSON.stringify(cart));
    if (typeof updateCartCount === 'function') updateCartCount();
    if (typeof showNotification === 'function') showNotification(`${title} added to cart!`);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    const categoryFilter = document.getElementById('categoryFilter');
    const sortFilter = document.getElementById('sortFilter');
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');

    if (categoryFilter) categoryFilter.addEventListener('change', filterProducts);
    if (sortFilter) sortFilter.addEventListener('change', filterProducts);
    if (prevPageBtn) prevPageBtn.addEventListener('click', previousPage);
    if (nextPageBtn) nextPageBtn.addEventListener('click', nextPage);

    // Load initial products
    loadProducts();

    // Check URL params for category filter
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    if (category && categoryFilter) {
        categoryFilter.value = category;
        filterProducts();
    }
});
