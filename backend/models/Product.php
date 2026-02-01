<?php
require_once __DIR__ . '/../config/Database.php';

class Product {
    private $conn;
    private $table = 'products';

    public function __construct() {
        $db = Database::getInstance();
        $this->conn = $db->getConnection();
    }

    // Validim per emrin e produktit
    private function validateName($name) {
        return preg_match('/^[a-zA-Z0-9\s\-_.,()]{3,100}$/', $name);
    }

    // Validim per price
    private function validatePrice($price) {
        return is_numeric($price) && $price > 0 && $price <= 999999.99;
    }

    // Merr te gjitha produktet (Get All Products)
    public function getAll($category = null, $limit = null) {
        if ($category) {
            $query = "SELECT p.*, c.name as category_name FROM " . $this->table . " p 
                      LEFT JOIN categories c ON p.category_id = c.id 
                      WHERE c.name = :category AND p.status = 'active' 
                      ORDER BY p.created_at DESC";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':category', $category);
        } else {
            $query = "SELECT p.*, c.name as category_name FROM " . $this->table . " p 
                      LEFT JOIN categories c ON p.category_id = c.id 
                      WHERE p.status = 'active' ORDER BY p.created_at DESC";
            $stmt = $this->conn->prepare($query);
        }
        
        if ($limit) {
            $query .= " LIMIT " . (int)$limit;
            $stmt = $this->conn->prepare($query);
        }
        
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Merr produktet per admin (me inactive)
    public function getAllForAdmin() {
        $query = "SELECT p.*, c.name as category_name, u.username as created_by_name 
                  FROM " . $this->table . " p 
                  LEFT JOIN categories c ON p.category_id = c.id 
                  LEFT JOIN users u ON p.created_by = u.id 
                  ORDER BY p.created_at DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Merr nje produkt sipas ID
    public function getById($id) {
        $query = "SELECT p.*, c.name as category_name FROM " . $this->table . " p 
                  LEFT JOIN categories c ON p.category_id = c.id 
                  WHERE p.id = :id LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Krijo Produkt te Ri
    public function create($name, $description, $price, $category_id, $image_url, $stock_quantity, $sku, $created_by) {
        if (!$this->validateName($name)) {
            return ['success' => false, 'error' => 'Invalid product name (3-100 chars, alphanumeric only)'];
        }
        if (!$this->validatePrice($price)) {
            return ['success' => false, 'error' => 'Invalid price (must be positive number)'];
        }

        $query = "INSERT INTO " . $this->table . " (name, description, price, category_id, image_url, stock_quantity, sku, created_by) 
                  VALUES (:name, :description, :price, :category_id, :image_url, :stock_quantity, :sku, :created_by)";
        $stmt = $this->conn->prepare($query);

        $name = htmlspecialchars(strip_tags($name));
        $description = htmlspecialchars(strip_tags($description));
        $image_url = htmlspecialchars(strip_tags($image_url));
        $sku = htmlspecialchars(strip_tags($sku));

        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':price', $price);
        $stmt->bindParam(':category_id', $category_id);
        $stmt->bindParam(':image_url', $image_url);
        $stmt->bindParam(':stock_quantity', $stock_quantity);
        $stmt->bindParam(':sku', $sku);
        $stmt->bindParam(':created_by', $created_by);

        if($stmt->execute()) {
            return ['success' => true, 'product_id' => $this->conn->lastInsertId()];
        }
        return ['success' => false, 'error' => 'Failed to create product'];
    }

    // Update produktin
    public function update($id, $name, $description, $price, $category_id, $image_url, $stock_quantity, $sku) {
        if (!$this->validateName($name)) {
            return ['success' => false, 'error' => 'Invalid product name'];
        }
        if (!$this->validatePrice($price)) {
            return ['success' => false, 'error' => 'Invalid price'];
        }

        $query = "UPDATE " . $this->table . " SET name = :name, description = :description, price = :price, 
                  category_id = :category_id, image_url = :image_url, stock_quantity = :stock_quantity, sku = :sku 
                  WHERE id = :id";
        $stmt = $this->conn->prepare($query);

        $name = htmlspecialchars(strip_tags($name));
        $description = htmlspecialchars(strip_tags($description));
        $image_url = htmlspecialchars(strip_tags($image_url));
        $sku = htmlspecialchars(strip_tags($sku));

        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':price', $price);
        $stmt->bindParam(':category_id', $category_id);
        $stmt->bindParam(':image_url', $image_url);
        $stmt->bindParam(':stock_quantity', $stock_quantity);
        $stmt->bindParam(':sku', $sku);

        return ['success' => $stmt->execute()];
    }

    // Update status
    public function updateStatus($id, $status) {
        $query = "UPDATE " . $this->table . " SET status = :status WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':status', $status);
        return $stmt->execute();
    }

    // Fshij Produktin
    public function delete($id) {
        $query = "DELETE FROM " . $this->table . " WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        return $stmt->execute();
    }

    // Kerko produkte
    public function search($keyword) {
        $query = "SELECT p.*, c.name as category_name FROM " . $this->table . " p 
                  LEFT JOIN categories c ON p.category_id = c.id 
                  WHERE p.status = 'active' AND (p.name LIKE :keyword OR p.description LIKE :keyword) 
                  ORDER BY p.created_at DESC";
        $stmt = $this->conn->prepare($query);
        $search_term = "%{$keyword}%";
        $stmt->bindParam(':keyword', $search_term);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
