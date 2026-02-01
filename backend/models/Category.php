<?php
require_once __DIR__ . '/../config/Database.php';

class Category {
    private $conn;
    private $table = 'categories';

    public function __construct() {
        $db = Database::getInstance();
        $this->conn = $db->getConnection();
    }

    // Validim per emrin e kategorise
    private function validateName($name) {
        return preg_match('/^[a-zA-Z0-9\s\-_]{2,50}$/', $name);
    }

    // Merr te gjitha kategorite
    public function getAll() {
        $query = "SELECT * FROM " . $this->table . " ORDER BY name ASC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Merr kategorine sipas ID
    public function getById($id) {
        $query = "SELECT * FROM " . $this->table . " WHERE id = :id LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Krijo kategorine e re
    public function create($name, $description, $image_url) {
        if (!$this->validateName($name)) {
            return ['success' => false, 'error' => 'Invalid category name'];
        }

        $query = "INSERT INTO " . $this->table . " (name, description, image_url) VALUES (:name, :description, :image_url)";
        $stmt = $this->conn->prepare($query);

        $name = htmlspecialchars(strip_tags($name));
        $description = htmlspecialchars(strip_tags($description));
        $image_url = htmlspecialchars(strip_tags($image_url));

        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':image_url', $image_url);

        if($stmt->execute()) {
            return ['success' => true, 'category_id' => $this->conn->lastInsertId()];
        }
        return ['success' => false, 'error' => 'Failed to create category'];
    }

    // Update kategorine
    public function update($id, $name, $description, $image_url) {
        if (!$this->validateName($name)) {
            return ['success' => false, 'error' => 'Invalid category name'];
        }

        $query = "UPDATE " . $this->table . " SET name = :name, description = :description, image_url = :image_url WHERE id = :id";
        $stmt = $this->conn->prepare($query);

        $name = htmlspecialchars(strip_tags($name));
        $description = htmlspecialchars(strip_tags($description));
        $image_url = htmlspecialchars(strip_tags($image_url));

        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':image_url', $image_url);

        return ['success' => $stmt->execute()];
    }

    // Fshij kategorine
    public function delete($id) {
        $query = "DELETE FROM " . $this->table . " WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        return $stmt->execute();
    }
}