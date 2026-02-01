<?php
require_once __DIR__ . '/../config/Database.php';

class Order {
    private $conn;
    private $table = 'orders';

    public function __construct() {
        $db = Database::getInstance();
        $this->conn = $db->getConnection();
    }

    // Validim per total amount
    private function validateAmount($amount) {
        return is_numeric($amount) && $amount > 0 && $amount <= 999999.99;
    }

    // Gjenero numrin unike te porosis
    private function generateOrderNumber() {
        return 'ORD-' . date('Y') . '-' . str_pad(mt_rand(1, 99999), 5, '0', STR_PAD_LEFT);
    }

    // Krijo porosi te re
    public function create($user_id, $total_amount, $shipping_address, $payment_method = null) {
        if (!$this->validateAmount($total_amount)) {
            return ['success' => false, 'error' => 'Invalid total amount'];
        }
        if (empty($shipping_address)) {
            return ['success' => false, 'error' => 'Shipping address is required'];
        }

        $order_number = $this->generateOrderNumber();
        
        $query = "INSERT INTO " . $this->table . " (user_id, order_number, total_amount, shipping_address, payment_method) 
                  VALUES (:user_id, :order_number, :total_amount, :shipping_address, :payment_method)";
        $stmt = $this->conn->prepare($query);

        $shipping_address = htmlspecialchars(strip_tags($shipping_address));
        $payment_method = $payment_method ? htmlspecialchars(strip_tags($payment_method)) : null;

        $stmt->bindParam(':user_id', $user_id);
        $stmt->bindParam(':order_number', $order_number);
        $stmt->bindParam(':total_amount', $total_amount);
        $stmt->bindParam(':shipping_address', $shipping_address);
        $stmt->bindParam(':payment_method', $payment_method);

        if($stmt->execute()) {
            return ['success' => true, 'order_id' => $this->conn->lastInsertId(), 'order_number' => $order_number];
        }
        return ['success' => false, 'error' => 'Failed to create order'];
    }

    // Shto produkt ne porosi
    public function addItem($order_id, $product_id, $quantity, $price) {
        if ($quantity <= 0 || $price <= 0) {
            return ['success' => false, 'error' => 'Invalid quantity or price'];
        }

        $query = "INSERT INTO order_items (order_id, product_id, quantity, price) 
                  VALUES (:order_id, :product_id, :quantity, :price)";
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':order_id', $order_id);
        $stmt->bindParam(':product_id', $product_id);
        $stmt->bindParam(':quantity', $quantity);
        $stmt->bindParam(':price', $price);

        return $stmt->execute();
    }

    // Merr porosine sipas ID
    public function getById($id) {
        $query = "SELECT o.*, u.username, u.email FROM " . $this->table . " o 
                  LEFT JOIN users u ON o.user_id = u.id 
                  WHERE o.id = :id LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Merr porosine me items
    public function getOrderWithItems($order_id) {
        $order = $this->getById($order_id);
        if ($order) {
            $query = "SELECT oi.*, p.name as product_name, p.image_url 
                      FROM order_items oi 
                      LEFT JOIN products p ON oi.product_id = p.id 
                      WHERE oi.order_id = :order_id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':order_id', $order_id);
            $stmt->execute();
            $order['items'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        return $order;
    }

    // Merr te gjitha porosite (per admin)
    public function getAll($limit = null, $offset = null) {
        $query = "SELECT o.*, u.username FROM " . $this->table . " o 
                  LEFT JOIN users u ON o.user_id = u.id 
                  ORDER BY o.created_at DESC";
        
        if ($limit) {
            $query .= " LIMIT " . (int)$limit;
        }
        if ($offset) {
            $query .= " OFFSET " . (int)$offset;
        }
        
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Merr porosite e nje useri
    public function getByUser($user_id) {
        $query = "SELECT * FROM " . $this->table . " WHERE user_id = :user_id ORDER BY created_at DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Update status i porosis
    public function updateStatus($id, $status) {
        $valid_statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
        if (!in_array($status, $valid_statuses)) {
            return ['success' => false, 'error' => 'Invalid status'];
        }

        $query = "UPDATE " . $this->table . " SET status = :status WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':status', $status);
        
        return $stmt->execute();
    }

    // Numro porosite sipas statusit
    public function countByStatus($status = null) {
        if ($status) {
            $query = "SELECT COUNT(*) as count FROM " . $this->table . " WHERE status = :status";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':status', $status);
        } else {
            $query = "SELECT COUNT(*) as count FROM " . $this->table;
            $stmt = $this->conn->prepare($query);
        }
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result['count'];
    }

    // Kerko porosi
    public function search($keyword) {
        $query = "SELECT o.*, u.username FROM " . $this->table . " o 
                  LEFT JOIN users u ON o.user_id = u.id 
                  WHERE o.order_number LIKE :keyword OR u.username LIKE :keyword OR u.email LIKE :keyword 
                  ORDER BY o.created_at DESC";
        $stmt = $this->conn->prepare($query);
        $search_term = "%{$keyword}%";
        $stmt->bindParam(':keyword', $search_term);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}