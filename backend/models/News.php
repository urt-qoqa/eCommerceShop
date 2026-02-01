<?php
require_once __DIR__ . '/../config/Database.php';

class News {
    private $conn;
    private $table = 'news';

    public function __construct() {
        $db = Database::getInstance();
        $this->conn = $db->getConnection();
    }

    // Validim per titull
    private function validateTitle($title) {
        return preg_match('/^[a-zA-Z0-9\s\-_.,!?;:()]{5,200}$/', $title);
    }

    // Merr te gjitha lajmet e publikuara
    public function getAllPublished($limit = null) {
        $query = "SELECT n.*, u.username as author_name FROM " . $this->table . " n 
                  LEFT JOIN users u ON n.created_by = u.id 
                  WHERE n.status = 'published' ORDER BY n.created_at DESC";
        if ($limit) {
            $query .= " LIMIT " . (int)$limit;
        }
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Merr te gjitha lajmet per admin
    public function getAllForAdmin() {
        $query = "SELECT n.*, u.username as author_name FROM " . $this->table . " n 
                  LEFT JOIN users u ON n.created_by = u.id 
                  ORDER BY n.created_at DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Merr lajmin sipas ID
    public function getById($id) {
        $query = "SELECT n.*, u.username as author_name FROM " . $this->table . " n 
                  LEFT JOIN users u ON n.created_by = u.id 
                  WHERE n.id = :id LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Krijo lajmin e ri
    public function create($title, $content, $excerpt, $image_url, $created_by) {
        if (!$this->validateTitle($title)) {
            return ['success' => false, 'error' => 'Invalid title (5-200 characters)'];
        }
        if (empty($content)) {
            return ['success' => false, 'error' => 'Content cannot be empty'];
        }

        $query = "INSERT INTO " . $this->table . " (title, content, excerpt, image_url, created_by, status) 
                  VALUES (:title, :content, :excerpt, :image_url, :created_by, 'draft')";
        $stmt = $this->conn->prepare($query);

        $title = htmlspecialchars(strip_tags($title));
        $excerpt = htmlspecialchars(strip_tags($excerpt));
        $image_url = htmlspecialchars(strip_tags($image_url));

        $stmt->bindParam(':title', $title);
        $stmt->bindParam(':content', $content);
        $stmt->bindParam(':excerpt', $excerpt);
        $stmt->bindParam(':image_url', $image_url);
        $stmt->bindParam(':created_by', $created_by);

        if($stmt->execute()) {
            return ['success' => true, 'news_id' => $this->conn->lastInsertId()];
        }
        return ['success' => false, 'error' => 'Failed to create news'];
    }

    // Update lajmin
    public function update($id, $title, $content, $excerpt, $image_url) {
        if (!$this->validateTitle($title)) {
            return ['success' => false, 'error' => 'Invalid title'];
        }
        if (empty($content)) {
            return ['success' => false, 'error' => 'Content cannot be empty'];
        }

        $query = "UPDATE " . $this->table . " SET title = :title, content = :content, excerpt = :excerpt, 
                  image_url = :image_url WHERE id = :id";
        $stmt = $this->conn->prepare($query);

        $title = htmlspecialchars(strip_tags($title));
        $excerpt = htmlspecialchars(strip_tags($excerpt));
        $image_url = htmlspecialchars(strip_tags($image_url));

        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':title', $title);
        $stmt->bindParam(':content', $content);
        $stmt->bindParam(':excerpt', $excerpt);
        $stmt->bindParam(':image_url', $image_url);

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

    // Fshij lajmin
    public function delete($id) {
        $query = "DELETE FROM " . $this->table . " WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        return $stmt->execute();
    }

    // Kerko lajme
    public function search($keyword) {
        $query = "SELECT n.*, u.username as author_name FROM " . $this->table . " n 
                  LEFT JOIN users u ON n.created_by = u.id 
                  WHERE n.status = 'published' AND (n.title LIKE :keyword OR n.content LIKE :keyword) 
                  ORDER BY n.created_at DESC";
        $stmt = $this->conn->prepare($query);
        $search_term = "%{$keyword}%";
        $stmt->bindParam(':keyword', $search_term);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
