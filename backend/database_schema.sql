-- ByteHub Tech eCommerce Shop Database Schema
-- Created: 2026-02-01
-- Updated for enhanced backend functionality

-- Create database
CREATE DATABASE IF NOT EXISTS bytehub_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE bytehub_db;

-- Users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'manager', 'employee', 'user') DEFAULT 'user',
    full_name VARCHAR(100),
    phone VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX (email),
    INDEX (role)
);

-- Categories table
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category_id INT,
    image_url VARCHAR(255),
    stock_quantity INT DEFAULT 0,
    sku VARCHAR(50) UNIQUE,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX (category_id),
    INDEX (status),
    INDEX (created_by)
);

-- News table
CREATE TABLE news (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    image_url VARCHAR(255),
    status ENUM('published', 'draft') DEFAULT 'draft',
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX (status),
    INDEX (created_by)
);

-- Contact messages table
CREATE TABLE contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    subject VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    status ENUM('unread', 'read', 'replied') DEFAULT 'unread',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX (email),
    INDEX (status)
);

-- Orders table
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    order_number VARCHAR(50) NOT NULL UNIQUE,
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    shipping_address TEXT NOT NULL,
    billing_address TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX (user_id),
    INDEX (order_number),
    INDEX (status)
);

-- Order items table
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT,
    INDEX (order_id),
    INDEX (product_id)
);

-- Shopping cart table
CREATE TABLE cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    session_id VARCHAR(100),
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    INDEX (user_id),
    INDEX (session_id),
    INDEX (product_id),
    UNIQUE KEY unique_cart_item (user_id, product_id),
    UNIQUE KEY unique_cart_session (session_id, product_id)
);

-- Insert default admin user (password: admin123)
INSERT INTO users (username, email, password, role, full_name) VALUES 
('admin', 'admin@bytehub.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', 'Administrator');

-- Insert sample categories
INSERT INTO categories (name, description, image_url) VALUES 
('Laptops', 'High-performance laptops for work and gaming', 'https://ext.same-assets.com/4202132248/1096574833.jpeg'),
('Phones', 'Latest smartphones with advanced features', 'https://ext.same-assets.com/4202132248/4027324781.jpeg'),
('Accessories', 'Computer accessories and peripherals', 'https://ext.same-assets.com/4202132248/3870471073.jpeg');

-- Insert sample products with better images
INSERT INTO products (name, description, price, category_id, image_url, stock_quantity, sku, created_by) VALUES 
('MacBook Pro 14"', 'Apple MacBook Pro with M2 Pro chip, 16GB RAM, 512GB SSD', 1999.99, 1, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop', 10, 'MBP14-001', 1),
('iPhone 15 Pro', 'Apple iPhone 15 Pro with A17 Pro chip, 256GB storage', 1199.99, 2, 'https://images.unsplash.com/photo-1598327104095-b418aa0bd2eb?w=600&auto=format&fit=crop', 15, 'IP15P-001', 1),
('Wireless Mouse', 'Ergonomic wireless mouse with long battery life', 29.99, 3, 'https://images.unsplash.com/photo-1527864550417-7fd9fc6a0faf?w=600&auto=format&fit=crop', 50, 'WM-001', 1),
('Gaming Laptop', 'High-performance gaming laptop with RTX graphics', 1799.99, 1, 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&auto=format&fit=crop', 8, 'GL-001', 1),
('Samsung Galaxy S24', 'Premium Android phone with advanced camera system', 999.99, 2, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop', 20, 'SGS24-001', 1),
('USB-C Hub', 'Multi-port adapter with HDMI, USB 3.0, card reader', 39.99, 3, 'https://images.unsplash.com/photo-1527864550417-7fd9fc6a0faf?w=600&auto=format&fit=crop', 75, 'UCH-001', 1);

-- Insert sample news
INSERT INTO news (title, content, excerpt, status, created_by) VALUES 
('Welcome to ByteHub', 'We are excited to launch our new tech eCommerce platform with the latest products and best prices.', 'Discover our new platform with cutting-edge technology products.', 'published', 1),
('New Arrivals This Month', 'Check out our latest collection of laptops, smartphones, and accessories from top brands.', 'Explore our newest tech products and exclusive deals.', 'published', 1);