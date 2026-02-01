<?php
require_once __DIR__ . '/../config/Database.php';

class Cart {
    private $conn;
    private $table = 'cart';

    public function __construct() {
        $db = Database::getInstance();
        $this->conn = $db->getConnection();
    }

    // Shto produkt në shportë
    public function addItem($product_id, $quantity = 1, $user_id = null, $session_id = null) {
        // Kontrollo nese produkti ekziston
        $product_query = "SELECT id, price, stock_quantity FROM products WHERE id = :id AND status = 'active'";
        $stmt = $this->conn->prepare($product_query);
        $stmt->bindParam(':id', $product_id);
        $stmt->execute();
        $product = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$product) {
            return ['success' => false, 'error' => 'Product not found'];
        }

        if ($product['stock_quantity'] < $quantity) {
            return ['success' => false, 'error' => 'Insufficient stock'];
        }

        // Kontrollo nese produkti tashme eshte ne shporte
        if ($user_id) {
            $check_query = "SELECT id, quantity FROM " . $this->table . " WHERE user_id = :user_id AND product_id = :product_id";
            $stmt = $this->conn->prepare($check_query);
            $stmt->bindParam(':user_id', $user_id);
        } else {
            $check_query = "SELECT id, quantity FROM " . $this->table . " WHERE session_id = :session_id AND product_id = :product_id";
            $stmt = $this->conn->prepare($check_query);
            $stmt->bindParam(':session_id', $session_id);
        }
        $stmt->bindParam(':product_id', $product_id);
        $stmt->execute();
        $existing = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($existing) {
            $new_quantity = $existing['quantity'] + $quantity;
            if ($product['stock_quantity'] < $new_quantity) {
                return ['success' => false, 'error' => 'Insufficient stock'];
            }

            $update_query = "UPDATE " . $this->table . " SET quantity = :quantity WHERE id = :id";
            $stmt = $this->conn->prepare($update_query);
            $stmt->bindParam(':quantity', $new_quantity);
            $stmt->bindParam(':id', $existing['id']);
            $stmt->execute();
        } else {
            if ($user_id) {
                $query = "INSERT INTO " . $this->table . " (user_id, product_id, quantity) VALUES (:user_id, :product_id, :quantity)";
                $stmt = $this->conn->prepare($query);
                $stmt->bindParam(':user_id', $user_id);
            } else {
                $query = "INSERT INTO " . $this->table . " (session_id, product_id, quantity) VALUES (:session_id, :product_id, :quantity)";
                $stmt = $this->conn->prepare($query);
                $stmt->bindParam(':session_id', $session_id);
            }
            $stmt->bindParam(':product_id', $product_id);
            $stmt->bindParam(':quantity', $quantity);
            $stmt->execute();
        }

        return ['success' => true];
    }

    // Merr produktet nga shporta
    public function getItems($user_id = null, $session_id = null) {
        if ($user_id) {
            $query = "SELECT c.*, p.name, p.price, p.image_url, p.stock_quantity FROM " . $this->table . " c 
                      JOIN products p ON c.product_id = p.id 
                      WHERE c.user_id = :user_id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':user_id', $user_id);
        } else {
            $query = "SELECT c.*, p.name, p.price, p.image_url, p.stock_quantity FROM " . $this->table . " c 
                      JOIN products p ON c.product_id = p.id 
                      WHERE c.session_id = :session_id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':session_id', $session_id);
        }
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Përditëso sasi
    public function updateQuantity($cart_id, $quantity, $user_id = null, $session_id = null) {
        if ($quantity <= 0) {
            return $this->removeItem($cart_id, $user_id, $session_id);
        }

        // Kontrollo stock
        $check_query = "SELECT c.product_id, p.stock_quantity FROM " . $this->table . " c 
                        JOIN products p ON c.product_id = p.id 
                        WHERE c.id = :cart_id";
        $stmt = $this->conn->prepare($check_query);
        $stmt->bindParam(':cart_id', $cart_id);
        $stmt->execute();
        $cart_item = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$cart_item || $cart_item['stock_quantity'] < $quantity) {
            return ['success' => false, 'error' => 'Insufficient stock'];
        }

        $query = "UPDATE " . $this->table . " SET quantity = :quantity WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':quantity', $quantity);
        $stmt->bindParam(':id', $cart_id);
        return ['success' => $stmt->execute()];
    }

    // Hiq produkt nga shporta
    public function removeItem($cart_id, $user_id = null, $session_id = null) {
        if ($user_id) {
            $query = "DELETE FROM " . $this->table . " WHERE id = :id AND user_id = :user_id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':user_id', $user_id);
        } else {
            $query = "DELETE FROM " . $this->table . " WHERE id = :id AND session_id = :session_id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':session_id', $session_id);
        }
        $stmt->bindParam(':id', $cart_id);
        return ['success' => $stmt->execute()];
    }

    // Bosh shporten
    public function clear($user_id = null, $session_id = null) {
        if ($user_id) {
            $query = "DELETE FROM " . $this->table . " WHERE user_id = :user_id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':user_id', $user_id);
        } else {
            $query = "DELETE FROM " . $this->table . " WHERE session_id = :session_id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':session_id', $session_id);
        }
        return $stmt->execute();
    }

    // Numri i produkteve në shportë
    public function countItems($user_id = null, $session_id = null) {
        if ($user_id) {
            $query = "SELECT SUM(quantity) as count FROM " . $this->table . " WHERE user_id = :user_id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':user_id', $user_id);
        } else {
            $query = "SELECT SUM(quantity) as count FROM " . $this->table . " WHERE session_id = :session_id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':session_id', $session_id);
        }
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result['count'] ? $result['count'] : 0;
    }
}