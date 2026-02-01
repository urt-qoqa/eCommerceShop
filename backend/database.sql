-- Database Schema for ByteHub

CREATE DATABASE IF NOT EXISTS bytehub_db;
USE bytehub_db;

-- Tabelat per Perdoruesit (Users Table)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'manager', 'employee', 'user') DEFAULT 'user', -- Rolet: Admin, Menaxher, Punetor, Perdorues
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabelat per Produkte (Products Table)
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(50) NOT NULL,
    image_path VARCHAR(255),
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Tabelat per Lajme/Portofolio (News Table)
CREATE TABLE IF NOT EXISTS news (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    image_path VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabelat per Mesazhe Kontakti (Contact Messages)
CREATE TABLE IF NOT EXISTS contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Shto Admin Perdorues (Password: admin123)
INSERT INTO users (username, email, password, role) 
SELECT 'admin', 'admin@bytehub.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin'
WHERE NOT EXISTS (SELECT * FROM users WHERE email = 'admin@bytehub.com');

-- Shto Produkte Shembull me Foto Cilesore (Seed Products)
INSERT INTO products (name, description, price, category, image_path)
SELECT 'MacBook Pro 16 M3 Max', 'Powerful laptop with M3 Max chip, 36GB RAM, and stunning Liquid Retina XDR display.', 3499.00, 'Laptops', 'https://images.unsplash.com/photo-1517336714731-489689fd1ca4?w=800&q=80'
WHERE NOT EXISTS (SELECT * FROM products WHERE name = 'MacBook Pro 16 M3 Max');

INSERT INTO products (name, description, price, category, image_path)
SELECT 'iPhone 15 Pro Max', 'Latest flagship smartphone with titanium design, A17 Pro chip.', 1199.00, 'Phones', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80'
WHERE NOT EXISTS (SELECT * FROM products WHERE name = 'iPhone 15 Pro Max');

INSERT INTO products (name, description, price, category, image_path)
SELECT 'Sony WH-1000XM5', 'Industry-leading noise canceling wireless headphones.', 399.00, 'Accessories', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80'
WHERE NOT EXISTS (SELECT * FROM products WHERE name = 'Sony WH-1000XM5');

INSERT INTO products (name, description, price, category, image_path)
SELECT 'Dell XPS 15', 'Premium Windows laptop featuring stunning OLED display.', 2299.00, 'Laptops', 'https://images.unsplash.com/photo-1593642632823-8f78536788c6?w=800&q=80'
WHERE NOT EXISTS (SELECT * FROM products WHERE name = 'Dell XPS 15');

INSERT INTO products (name, description, price, category, image_path)
SELECT 'Samsung Galaxy S24', 'Android flagship with 200MP camera and AI features.', 1299.00, 'Phones', 'https://images.unsplash.com/photo-1610945265078-38584e2690e0?w=800&q=80'
WHERE NOT EXISTS (SELECT * FROM products WHERE name = 'Samsung Galaxy S24');

INSERT INTO products (name, description, price, category, image_path)
SELECT 'iPad Pro 12.9', 'Ultimate tablet experience with M2 chip.', 1099.00, 'Accessories', 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80'
WHERE NOT EXISTS (SELECT * FROM products WHERE name = 'iPad Pro 12.9');
