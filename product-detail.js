// Import product data from products.js (copy of allProducts array)
const allProducts = [
    // LAPTOPS (10 products)
    {
        id: 1,
        name: "MacBook Pro 16\" M3 Max",
        category: "laptops",
        price: 3499,
        rating: 4.8,
        reviews: 2847,
        image: "prod-img/macbook-pro-16inch-m3-max.webp",
        description: "Powerful laptop with M3 Max chip, 36GB RAM, stunning display",
        specs: {
            processor: "Apple M3 Max chip",
            ram: "36GB Unified Memory",
            storage: "1TB SSD",
            display: "16-inch Liquid Retina XDR",
            graphics: "Integrated M3 Max GPU",
            battery: "Up to 22 hours"
        }
    },
    {
        id: 2,
        name: "Dell XPS 15 OLED",
        category: "laptops",
        price: 2299,
        rating: 4.6,
        reviews: 1834,
        image: "prod-img/dell-xps-15-oled.webp",
        description: "Premium Windows laptop with 3.5K OLED display and Intel i9",
        specs: {
            processor: "Intel Core i9-13900H",
            ram: "32GB DDR5",
            storage: "1TB NVMe SSD",
            display: "15.6\" 3.5K OLED Touch",
            graphics: "NVIDIA RTX 4060",
            battery: "86Wh, up to 13 hours"
        }
    },
    {
        id: 3,
        name: "HP Spectre x360",
        category: "laptops",
        price: 1599,
        rating: 4.5,
        reviews: 1203,
        image: "prod-img/hp-spectre-x360.jpg",
        description: "Convertible laptop with touchscreen and premium design",
        specs: {
            processor: "Intel Core i7-1355U",
            ram: "16GB LPDDR4x",
            storage: "512GB SSD",
            display: "13.5\" WUXGA+ Touch",
            graphics: "Intel Iris Xe",
            battery: "Up to 17 hours"
        }
    },
    {
        id: 4,
        name: "ASUS ROG Strix G16",
        category: "laptops",
        price: 2499,
        rating: 4.7,
        reviews: 987,
        image: "prod-img/asus-rog-strix-g16.png",
        description: "Gaming powerhouse with RTX 4080, RGB keyboard, 240Hz display",
        specs: {
            processor: "Intel Core i9-13980HX",
            ram: "32GB DDR5",
            storage: "1TB PCIe 4.0 SSD",
            display: "16\" QHD 240Hz",
            graphics: "NVIDIA RTX 4080",
            battery: "90Wh battery"
        }
    },
    {
        id: 5,
        name: "Lenovo ThinkPad X1 Carbon",
        category: "laptops",
        price: 1899,
        rating: 4.6,
        reviews: 1456,
        image: "prod-img/lenovo-thinkpad-x1-carbon.jpg",
        description: "Business laptop with military-grade durability",
        specs: {
            processor: "Intel Core i7-1365U",
            ram: "16GB LPDDR5",
            storage: "512GB SSD",
            display: "14\" WUXGA IPS",
            graphics: "Intel Iris Xe",
            battery: "Up to 15.5 hours"
        }
    },
    {
        id: 6,
        name: "Microsoft Surface Laptop 5",
        category: "laptops",
        price: 1399,
        rating: 4.4,
        reviews: 876,
        image: "prod-img/microsoft-surface-laptop-5.jpg",
        description: "Elegant design with Intel i7, 13.5\" PixelSense display",
        specs: {
            processor: "Intel Core i7-1255U",
            ram: "16GB LPDDR5x",
            storage: "512GB SSD",
            display: "13.5\" PixelSense Touch",
            graphics: "Intel Iris Xe",
            battery: "Up to 18 hours"
        }
    },
    {
        id: 7,
        name: "Acer Predator Helios 16",
        category: "laptops",
        price: 1799,
        rating: 4.5,
        reviews: 654,
        image: "prod-img/acer-predator-helios-16.jpg",
        description: "Gaming laptop with Intel i9, RTX 4070, advanced cooling",
        specs: {
            processor: "Intel Core i9-13900HX",
            ram: "16GB DDR5",
            storage: "1TB SSD",
            display: "16\" WQXGA 165Hz",
            graphics: "NVIDIA RTX 4070",
            battery: "90Wh battery"
        }
    },
    {
        id: 8,
        name: "Razer Blade 15",
        category: "laptops",
        price: 2599,
        rating: 4.7,
        reviews: 543,
        image: "prod-img/razer-blade-15.jpg",
        description: "Ultra-thin gaming laptop with premium build quality",
        specs: {
            processor: "Intel Core i7-13800H",
            ram: "32GB DDR5",
            storage: "1TB SSD",
            display: "15.6\" QHD 240Hz",
            graphics: "NVIDIA RTX 4070",
            battery: "Up to 6 hours gaming"
        }
    },
    {
        id: 9,
        name: "LG Gram 17",
        category: "laptops",
        price: 1699,
        rating: 4.3,
        reviews: 432,
        image: "prod-img/lg-gram-17.jpg",
        description: "Ultra-lightweight 17-inch laptop, only 2.98 lbs",
        specs: {
            processor: "Intel Core i7-1360P",
            ram: "16GB LPDDR5",
            storage: "512GB SSD",
            display: "17\" WQXGA IPS",
            graphics: "Intel Iris Xe",
            battery: "Up to 19.5 hours"
        }
    },
    {
        id: 10,
        name: "MSI Creator Z16",
        category: "laptops",
        price: 2199,
        rating: 4.6,
        reviews: 321,
        image: "prod-img/msi-creator-z16.png",
        description: "Content creation laptop with RTX graphics and pen display",
        specs: {
            processor: "Intel Core i9-12900H",
            ram: "32GB DDR5",
            storage: "1TB NVMe SSD",
            display: "16\" QHD+ Touch",
            graphics: "NVIDIA RTX 4060",
            battery: "90Wh battery"
        }
    },

    // PHONES (10 products)
    {
        id: 11,
        name: "iPhone 15 Pro Max",
        category: "phones",
        price: 1199,
        rating: 4.9,
        reviews: 5621,
        image: "prod-img/iphone-15-pro-max.avif",
        description: "Titanium design, A17 Pro chip, advanced camera system",
        specs: {
            display: "6.7\" Super Retina XDR",
            processor: "A17 Pro chip",
            camera: "48MP + 12MP + 12MP",
            storage: "256GB / 512GB / 1TB",
            battery: "Up to 29 hours video",
            os: "iOS 17"
        }
    },
    {
        id: 12,
        name: "Samsung Galaxy S24 Ultra",
        category: "phones",
        price: 1299,
        rating: 4.7,
        reviews: 4293,
        image: "prod-img/samsung-galaxy-s24-ultra.jpg",
        description: "Built-in S Pen, 200MP camera, powerful AI features",
        specs: {
            display: "6.8\" Dynamic AMOLED 2X",
            processor: "Snapdragon 8 Gen 3",
            camera: "200MP + 50MP + 12MP + 10MP",
            storage: "256GB / 512GB / 1TB",
            battery: "5000mAh, 45W charging",
            os: "Android 14"
        }
    },
    {
        id: 13,
        name: "Google Pixel 8 Pro",
        category: "phones",
        price: 999,
        rating: 4.6,
        reviews: 3124,
        image: "prod-img/google-pixel-8-pro.jpg",
        description: "AI-powered photography, Google Tensor G3 chip",
        specs: {
            display: "6.7\" LTPO OLED 120Hz",
            processor: "Google Tensor G3",
            camera: "50MP + 48MP + 48MP",
            storage: "128GB / 256GB / 512GB",
            battery: "5050mAh, 30W charging",
            os: "Android 14"
        }
    },
    {
        id: 14,
        name: "OnePlus 12",
        category: "phones",
        price: 799,
        rating: 4.5,
        reviews: 2156,
        image: "prod-img/oneplus-12.jpg",
        description: "Flagship killer with Snapdragon 8 Gen 3, 120Hz display",
        specs: {
            display: "6.82\" AMOLED 120Hz",
            processor: "Snapdragon 8 Gen 3",
            camera: "50MP + 64MP + 48MP",
            storage: "256GB / 512GB",
            battery: "5400mAh, 100W charging",
            os: "OxygenOS 14"
        }
    },
    {
        id: 15,
        name: "iPhone 14",
        category: "phones",
        price: 799,
        rating: 4.7,
        reviews: 8934,
        image: "prod-img/iphone-15-pro-max.avif",
        description: "Apple iPhone 14 with A15 Bionic, dual camera",
        specs: {
            display: "6.1\" Super Retina XDR",
            processor: "A15 Bionic chip",
            camera: "12MP + 12MP dual",
            storage: "128GB / 256GB / 512GB",
            battery: "Up to 20 hours video",
            os: "iOS 17"
        }
    },
    {
        id: 16,
        name: "Xiaomi 14 Pro",
        category: "phones",
        price: 899,
        rating: 4.6,
        reviews: 1876,
        image: "prod-img/xiaomi-14-pro.jpg",
        description: "Leica camera, 512GB storage, fast charging",
        specs: {
            display: "6.73\" AMOLED 120Hz",
            processor: "Snapdragon 8 Gen 3",
            camera: "50MP Leica triple camera",
            storage: "256GB / 512GB",
            battery: "4880mAh, 120W charging",
            os: "MIUI 15"
        }
    },
    {
        id: 17,
        name: "Samsung Galaxy Z Fold 5",
        category: "phones",
        price: 1799,
        rating: 4.5,
        reviews: 876,
        image: "prod-img/samsung-galaxy-z-fold-5.jpg",
        description: "Foldable phone with large inner display, multitasking",
        specs: {
            display: "7.6\" inner + 6.2\" cover",
            processor: "Snapdragon 8 Gen 2",
            camera: "50MP + 12MP + 10MP",
            storage: "256GB / 512GB / 1TB",
            battery: "4400mAh, wireless charging",
            os: "Android 13"
        }
    },
    {
        id: 18,
        name: "Nothing Phone 2",
        category: "phones",
        price: 699,
        rating: 4.4,
        reviews: 1234,
        image: "prod-img/nothing-phone-2.jpg",
        description: "Unique glyph interface, Snapdragon 8+ Gen 1",
        specs: {
            display: "6.7\" LTPO OLED 120Hz",
            processor: "Snapdragon 8+ Gen 1",
            camera: "50MP + 50MP dual",
            storage: "256GB / 512GB",
            battery: "4700mAh, 45W charging",
            os: "Nothing OS 2.0"
        }
    },
    {
        id: 19,
        name: "ASUS ROG Phone 7",
        category: "phones",
        price: 999,
        rating: 4.7,
        reviews: 654,
        image: "prod-img/asus-rog-phone-7.jpg",
        description: "Gaming phone with 165Hz display, 6000mAh battery",
        specs: {
            display: "6.78\" AMOLED 165Hz",
            processor: "Snapdragon 8 Gen 2",
            camera: "50MP + 13MP + 5MP",
            storage: "256GB / 512GB",
            battery: "6000mAh, 65W charging",
            os: "ROG UI (Android 13)"
        }
    },
    {
        id: 20,
        name: "Motorola Edge 40 Pro",
        category: "phones",
        price: 599,
        rating: 4.3,
        reviews: 432,
        image: "prod-img/motorola-edge-40-pro.jpg",
        description: "Curved display, wireless charging, clean Android",
        specs: {
            display: "6.67\" pOLED 165Hz",
            processor: "Snapdragon 8 Gen 2",
            camera: "50MP + 50MP + 12MP",
            storage: "256GB / 512GB",
            battery: "4600mAh, 125W charging",
            os: "Android 13"
        }
    },

    // ACCESSORIES (15 products)
    {
        id: 21,
        name: "Sony WH-1000XM5",
        category: "accessories",
        price: 399,
        rating: 4.8,
        reviews: 8742,
        image: "prod-img/sony-wh-1000xm5.jpg",
        description: "Industry-leading noise canceling, 30-hour battery",
        specs: {
            type: "Over-ear wireless headphones",
            noiseCancelling: "Advanced ANC technology",
            battery: "Up to 30 hours",
            connectivity: "Bluetooth 5.2, LDAC",
            drivers: "30mm custom drivers",
            weight: "250g"
        }
    },
    {
        id: 22,
        name: "Logitech MX Master 3S",
        category: "accessories",
        price: 99,
        rating: 4.7,
        reviews: 5432,
        image: "prod-img/logitech-mx-master-3s.jpg",
        description: "Advanced wireless mouse with precision scrolling",
        specs: {
            type: "Wireless ergonomic mouse",
            dpi: "Up to 8000 DPI",
            battery: "Up to 70 days",
            buttons: "7 programmable buttons",
            connectivity: "Bluetooth + USB receiver",
            weight: "141g"
        }
    },
    {
        id: 23,
        name: "Mechanical Keyboard RGB",
        category: "accessories",
        price: 149,
        rating: 4.6,
        reviews: 3210,
        image: "prod-img/mechanical-keyboard-rgb.jpg",
        description: "Cherry MX switches, RGB lighting, aluminum frame",
        specs: {
            type: "Mechanical gaming keyboard",
            switches: "Cherry MX Red/Blue/Brown",
            lighting: "Per-key RGB",
            connectivity: "USB-C wired",
            features: "Hot-swappable, aluminum",
            layout: "Full-size (104 keys)"
        }
    },
    {
        id: 24,
        name: "iPad Pro 12.9\" M2",
        category: "accessories",
        price: 1099,
        rating: 4.8,
        reviews: 3156,
        image: "prod-img/ipad-pro-12.9inch-m2.jpg",
        description: "Ultimate tablet with M2 chip, Liquid Retina XDR",
        specs: {
            display: "12.9\" Liquid Retina XDR",
            processor: "Apple M2 chip",
            storage: "128GB - 2TB options",
            camera: "12MP + 10MP ultra-wide",
            battery: "Up to 10 hours",
            os: "iPadOS 17"
        }
    },
    {
        id: 25,
        name: "Webcam HD Pro 1080p",
        category: "accessories",
        price: 79,
        rating: 4.4,
        reviews: 2876,
        image: "prod-img/webcam-hd-pro-1080p.jpg",
        description: "Full HD webcam with auto-focus, built-in microphone",
        specs: {
            resolution: "1080p @ 30fps",
            focusType: "Auto-focus",
            microphone: "Dual stereo mics",
            fieldOfView: "90 degrees",
            mounting: "Universal clip",
            compatibility: "Windows, Mac, Chrome"
        }
    },
    {
        id: 26,
        name: "Samsung T7 Portable SSD 2TB",
        category: "accessories",
        price: 199,
        rating: 4.7,
        reviews: 4321,
        image: "prod-img/samsung-t7-portable-ssd-2tb.jpg",
        description: "Ultra-fast external NVMe SSD with USB 3.2",
        specs: {
            capacity: "2TB",
            interface: "USB 3.2 Gen 2",
            readSpeed: "Up to 1050 MB/s",
            writeSpeed: "Up to 1000 MB/s",
            encryption: "AES 256-bit hardware",
            weight: "58g"
        }
    },
    {
        id: 27,
        name: "LG 27\" 4K UHD Monitor",
        category: "accessories",
        price: 449,
        rating: 4.6,
        reviews: 1987,
        image: "prod-img/lg-27-4k-uhd-monitor.jpg",
        description: "Professional monitor with HDR support, IPS panel",
        specs: {
            size: "27 inches",
            resolution: "3840 x 2160 (4K UHD)",
            panel: "IPS with HDR10",
            refreshRate: "60Hz",
            brightness: "400 nits",
            ports: "HDMI 2.0, DisplayPort, USB-C"
        }
    },
    {
        id: 28,
        name: "AirPods Pro 2nd Gen",
        category: "accessories",
        price: 249,
        rating: 4.8,
        reviews: 9876,
        image: "prod-img/airpods-pro-2nd-gen.jpg",
        description: "Premium TWS earbuds with ANC, spatial audio",
        specs: {
            type: "True wireless earbuds",
            noiseCancelling: "Active ANC + Transparency",
            battery: "6 hrs (30 hrs with case)",
            chip: "Apple H2 chip",
            audio: "Spatial audio, Adaptive EQ",
            waterproof: "IPX4 rated"
        }
    },
    {
        id: 29,
        name: "Anker PowerCore 26800mAh",
        category: "accessories",
        price: 65,
        rating: 4.5,
        reviews: 12543,
        image: "prod-img/anker-powercore-26800mah.jpg",
        description: "High-capacity power bank, fast charging",
        specs: {
            capacity: "26800mAh",
            output: "3 USB ports, 18W max",
            input: "Micro-USB + USB-C",
            charging: "PowerIQ + VoltageBoost",
            weight: "495g",
            rechargeTime: "6-7 hours"
        }
    },
    {
        id: 30,
        name: "Razer DeathAdder V3",
        category: "accessories",
        price: 69,
        rating: 4.7,
        reviews: 3456,
        image: "prod-img/razer-deathadder-v3.jpg",
        description: "Ergonomic gaming mouse with 30,000 DPI sensor",
        specs: {
            type: "Wired gaming mouse",
            sensor: "Focus Pro 30K optical",
            dpi: "Up to 30,000 DPI",
            buttons: "8 programmable buttons",
            weight: "59g (ultra-light)",
            polling: "1000Hz / 8000Hz"
        }
    },
    {
        id: 31,
        name: "USB-C Hub 7-in-1",
        category: "accessories",
        price: 39,
        rating: 4.3,
        reviews: 2345,
        image: "prod-img/usb-c-hub-7-in-1.jpg",
        description: "Multi-port adapter with HDMI, USB 3.0, SD card reader",
        specs: {
            ports: "HDMI, 3x USB 3.0, SD/microSD, USB-C PD",
            hdmiOutput: "4K @ 30Hz",
            dataTransfer: "Up to 5Gbps",
            powerDelivery: "100W passthrough",
            compatibility: "Mac, Windows, iPad",
            material: "Aluminum"
        }
    },
    {
        id: 32,
        name: "Blue Yeti USB Microphone",
        category: "accessories",
        price: 129,
        rating: 4.6,
        reviews: 8765,
        image: "prod-img/blue-yeti-usb-microphone.jpg",
        description: "Professional USB mic for streaming, podcasting",
        specs: {
            type: "Condenser USB microphone",
            patterns: "4 patterns (cardioid, stereo, etc)",
            sampleRate: "48kHz/16-bit",
            controls: "Gain, mute, pattern, volume",
            mounting: "Desktop stand included",
            compatibility: "Mac, Windows, PS4/5"
        }
    },
    {
        id: 33,
        name: "Elgato Stream Deck",
        category: "accessories",
        price: 149,
        rating: 4.7,
        reviews: 3210,
        image: "prod-img/elgato-stream-deck.jpg",
        description: "15 customizable LCD keys for content creation",
        specs: {
            keys: "15 LCD keys",
            display: "Customizable icons/GIFs",
            integration: "OBS, Twitch, YouTube, etc",
            software: "Stream Deck software (Mac/Win)",
            dimensions: "118 x 84 x 25mm",
            connectivity: "USB-C"
        }
    },
    {
        id: 34,
        name: "Logitech C920 Webcam",
        category: "accessories",
        price: 69,
        rating: 4.5,
        reviews: 15432,
        image: "prod-img/logitech-c920-webcam.jpg",
        description: "Full HD 1080p video calling, autofocus",
        specs: {
            resolution: "1080p @ 30fps",
            focusType: "Auto-focus",
            fieldOfView: "78 degrees diagonal",
            microphone: "Dual stereo mics",
            mounting: "Universal clip",
            compatibility: "Windows, Mac, Chrome"
        }
    },
    {
        id: 35,
        name: "HyperX Cloud Alpha",
        category: "accessories",
        price: 99,
        rating: 4.6,
        reviews: 5678,
        image: "prod-img/hyperx-cloud-alpha.jpg",
        description: "Gaming headset with dual chamber drivers",
        specs: {
            type: "Wired gaming headset",
            drivers: "50mm dual chamber",
            frequency: "13Hz - 27,000Hz",
            microphone: "Detachable noise-cancelling",
            comfort: "Memory foam ear cushions",
            compatibility: "PC, PS5, Xbox, Switch"
        }
    }
];

// Local quantity state for product detail addition
let quantity = 1;

function changeQuantity(delta) {
    quantity = Math.max(1, quantity + delta);
    document.getElementById('quantityValue').textContent = quantity;
}

// Render product detail
function renderProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const product = allProducts.find(p => p.id === productId);

    const container = document.getElementById('productDetail');

    if (!product) {
        container.innerHTML = '<p style="text-align:center;grid-column:1/-1;">Product not found</p>';
        return;
    }

    container.innerHTML = `
        <div class="product-detail-image">
            <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/600x600?text=${encodeURIComponent(product.name)}'">
        </div>
        <div class="product-detail-info">
            <h1>${product.name}</h1>
            <div class="product-detail-rating">
                <div class="stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}</div>
                <span>(${product.reviews} reviews)</span>
            </div>
            <p class="product-detail-price">$${product.price.toFixed(2)}</p>
            <p class="product-detail-description">${product.description}</p>
            
            <div class="product-specs">
                <h3>Technical Specifications</h3>
                ${Object.entries(product.specs).map(([key, value]) => `
                    <div class="spec-item">
                        <span class="spec-label">${key.charAt(0).toUpperCase() + key.slice(1)}:</span>
                        <span class="spec-value">${value}</span>
                    </div>
                `).join('')}
            </div>
            
            <div class="quantity-selector">
                <span style="font-weight: 600;">Quantity:</span>
                <button class="quantity-btn" onclick="changeQuantity(-1)">−</button>
                <span class="quantity-value" id="quantityValue">1</span>
                <button class="quantity-btn" onclick="changeQuantity(1)">+</button>
            </div>
            
            <div class="product-actions">
                <button class="btn btn-primary" style="flex: 2;" onclick="const qty = parseInt(document.getElementById('quantityValue').textContent); addToCart(${product.id}, '${product.name.replace(/'/g, "\\'")}', ${product.price}, '${product.image}', qty)">
                    Add to Cart
                </button>
                <button class="btn btn-secondary" style="flex: 1;" onclick="window.location.href='products.html?category=${product.category}'">
                    Back to ${product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </button>
            </div>
        </div>
    `;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProductDetail();
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);
