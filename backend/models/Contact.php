<?php
require_once __DIR__ . '/../config/Database.php';

class Contact {
    private $conn;
    private $table = 'contact_messages';

    public function __construct() {
        $db = Database::getInstance();
        $this->conn = $db->getConnection();
    }

    // Validim per emrin
    private function validateName($name) {
        return preg_match('/^[a-zA-Z\s\-\.]{2,100}$/', $name);
    }

    // Validim per email
    private function validateEmail($email) {
        return filter_var($email, FILTER_VALIDATE_EMAIL) && preg_match('/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/', $email);
    }

    // Validim per phone
    private function validatePhone($phone) {
        return empty($phone) || preg_match('/^[\d\s\-\+\(\)]{10,20}$/', $phone);
    }

    // Ruaj Mesazhin e Kontaktit
    public function saveMessage($full_name, $email, $phone, $subject, $message) {
        if (!$this->validateName($full_name)) {
            return ['success' => false, 'error' => 'Invalid name format'];
        }
        if (!$this->validateEmail($email)) {
            return ['success' => false, 'error' => 'Invalid email format'];
        }
        if (!$this->validatePhone($phone)) {
            return ['success' => false, 'error' => 'Invalid phone format'];
        }
        if (empty($subject) || strlen($subject) < 3) {
            return ['success' => false, 'error' => 'Subject must be at least 3 characters'];
        }
        if (empty($message) || strlen($message) < 10) {
            return ['success' => false, 'error' => 'Message must be at least 10 characters'];
        }

        $query = "INSERT INTO " . $this->table . " (full_name, email, phone, subject, message) 
                  VALUES (:full_name, :email, :phone, :subject, :message)";
        $stmt = $this->conn->prepare($query);

        $full_name = htmlspecialchars(strip_tags($full_name));
        $email = htmlspecialchars(strip_tags($email));
        $phone = htmlspecialchars(strip_tags($phone));
        $subject = htmlspecialchars(strip_tags($subject));
        $message = htmlspecialchars(strip_tags($message));

        $stmt->bindParam(':full_name', $full_name);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':phone', $phone);
        $stmt->bindParam(':subject', $subject);
        $stmt->bindParam(':message', $message);

        if($stmt->execute()) {
            return ['success' => true, 'message_id' => $this->conn->lastInsertId()];
        }
        return ['success' => false, 'error' => 'Failed to save message'];
    }

    // Merr te gjitha mesazhet
    public function getAll() {
        $query = "SELECT * FROM " . $this->table . " ORDER BY created_at DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Merr mesazhet sipas statusit
    public function getByStatus($status) {
        $query = "SELECT * FROM " . $this->table . " WHERE status = :status ORDER BY created_at DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':status', $status);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Update status i mesazhit
    public function updateStatus($id, $status) {
        $query = "UPDATE " . $this->table . " SET status = :status WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':status', $status);
        return $stmt->execute();
    }

    // Fshij mesazhin
    public function delete($id) {
        $query = "DELETE FROM " . $this->table . " WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        return $stmt->execute();
    }

    // Numro mesazhet pa lexuar
    public function countUnread() {
        $query = "SELECT COUNT(*) as count FROM " . $this->table . " WHERE status = 'unread'";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result['count'];
    }
}
