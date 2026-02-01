-- Add more products to ByteHub database
USE bytehub_db;

-- Insert additional laptops
INSERT INTO products (name, description, price, category_id, image_url, stock_quantity, sku, created_by) VALUES 
('Dell XPS 15', 'Premium ultrabook with Intel Core i7, 32GB RAM, 1TB SSD, and stunning OLED display', 2299.99, 1, 'https://images.unsplash.com/photo-1593642632823-8f78536788c6?w=600&auto=format&fit=crop', 12, 'DXP15-001', 1),
('HP Spectre x360', 'Convertible laptop with 11th Gen Intel i7, 16GB RAM, touchscreen', 1599.99, 1, 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&auto=format&fit=crop', 8, 'HPSX-001', 1),
('ASUS ROG Strix', 'Gaming powerhouse with AMD Ryzen 9, RTX 4080, 32GB RAM, RGB keyboard', 2499.99, 1, 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&auto=format&fit=crop', 5, 'ASROG-001', 1),
('Lenovo ThinkPad X1', 'Business laptop with Intel i7, 16GB RAM, military-grade durability', 1899.99, 1, 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&auto=format&fit=crop', 15, 'LNVTP-001', 1),
('Microsoft Surface Laptop 5', 'Elegant design with Intel i7, 16GB RAM, 13.5" PixelSense display', 1399.99, 1, 'https://images.unsplash.com/photo-1593642532502-a927d8d2293c?w=600&auto=format&fit=crop', 10, 'MSL5-001', 1);

-- Insert additional phones
INSERT INTO products (name, description, price, category_id, image_url, stock_quantity, sku, created_by) VALUES 
('Google Pixel 8 Pro', 'AI-powered photography with Google Tensor G3 chip, 256GB storage', 899.99, 2, 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=600&auto=format&fit=crop', 25, 'GP8P-001', 1),
('OnePlus 12', 'Flagship killer with Snapdragon 8 Gen 3, 120Hz AMOLED display', 799.99, 2, 'https://images.unsplash.com/photo-1592286927505-c3b446686dd1?w=600&auto=format&fit=crop', 18, 'OP12-001', 1),
('Xiaomi 14 Pro', 'Premium smartphone with Leica camera, 512GB storage, fast charging', 949.99, 2, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop', 22, 'XM14P-001', 1),
('iPhone 14', 'Apple iPhone 14 with A15 Bionic, 128GB, dual camera system', 799.99, 2, 'https://images.unsplash.com/photo-1632661674596-df8be070a5c7?w=600&auto=format&fit=crop', 30, 'IP14-001', 1);

-- Insert additional accessories
INSERT INTO products (name, description, price, category_id, image_url, stock_quantity, sku, created_by) VALUES 
('Logitech MX Master 3S', 'Advanced wireless mouse with precision scrolling and ergonomic design', 99.99, 3, 'https://images.unsplash.com/photo-1527864550417-7fd9fc6a0faf?w=600&auto=format&fit=crop', 40, 'LMXM3S-001', 1),
('Mechanical Keyboard RGB', 'Gaming mechanical keyboard with Cherry MX switches and RGB lighting', 149.99, 3, 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop', 35, 'MKR-001', 1),
('Sony WH-1000XM5', 'Industry-leading noise canceling headphones with 30hr battery life', 399.99, 3, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop', 28, 'SWXM5-001', 1),
('Webcam HD Pro', 'Full HD 1080p webcam with auto-focus and built-in microphone', 79.99, 3, 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=600&auto=format&fit=crop', 45, 'WCHD-001', 1),
('Portable SSD 2TB', 'Ultra-fast external NVMe SSD with 2TB capacity and USB 3.2', 199.99, 3, 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&auto=format&fit=crop', 50, 'PSSD2T-001', 1),
('Monitor 27" 4K', 'Professional 4K UHD monitor with HDR support and IPS panel', 449.99, 3, 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop', 20, 'MON27-001', 1),
('Wireless Earbuds Pro', 'Premium TWS earbuds with ANC and spatial audio', 179.99, 3, 'https://images.unsplash.com/photo-1590658165737-15a047b7a2e0?w=600&auto=format&fit=crop', 60, 'WEB-001', 1),
('USB-C Charging Cable', 'Fast charging USB-C cable with braided design and 100W support', 19.99, 3, 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=600&auto=format&fit=crop', 100, 'USBC-001', 1);
