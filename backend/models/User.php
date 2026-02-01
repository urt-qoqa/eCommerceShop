<?php
require_once __DIR__ . '/../config/Database.php';

class User {
    private $conn;
    private $table = 'users';

    public function __construct() {
        $db = Database::getInstance();
        $this->conn = $db->getConnection();
    }

    // Validim me Regex per email
    private function validateEmail($email) {
        return filter_var($email, FILTER_VALIDATE_EMAIL) && preg_match('/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/', $email);
    }

    // Validim me Regex per username
    private function validateUsername($username) {
        return preg_match('/^[a-zA-Z0-9_]{3,20}$/', $username);
    }

    // Validim me Regex per password
    private function validatePassword($password) {
        return preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/', $password);
    }

    // Regjistro Perdorues te Ri (Register)
    public function register($username, $email, $password, $role = 'user') {
        // Validim i input-ve
        if (!$this->validateUsername($username)) {
            return ['success' => false, 'error' => 'Username must be 3-20 characters (letters, numbers, underscore)'];
        }
        if (!$this->validateEmail($email)) {
            return ['success' => false, 'error' => 'Invalid email format'];
        }
        if (!$this->validatePassword($password)) {
            return ['success' => false, 'error' => 'Password must be 8+ chars with uppercase, lowercase, and number'];
        }

        // Kontrollo nese user ekziston
        if ($this->getUserByEmail($email)) {
            return ['success' => false, 'error' => 'Email already exists'];
        }

        $query = "INSERT INTO " . $this->table . " (username, email, password, role) VALUES (:username, :email, :password, :role)";
        $stmt = $this->conn->prepare($query);

        $username = htmlspecialchars(strip_tags($username));
        $role = htmlspecialchars(strip_tags($role));
        $password_hash = password_hash($password, PASSWORD_DEFAULT);

        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $password_hash);
        $stmt->bindParam(':role', $role);

        if($stmt->execute()) {
            return ['success' => true, 'user_id' => $this->conn->lastInsertId()];
        }
        return ['success' => false, 'error' => 'Registration failed'];
    }

    // Kyqja e Perdoruesit (Login)
    public function login($email, $password) {
        if (!$this->validateEmail($email)) {
            return ['success' => false, 'error' => 'Invalid email format'];
        }

        $query = "SELECT * FROM " . $this->table . " WHERE email = :email LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':email', $email);
        $stmt->execute();

        if($stmt->rowCount() > 0) {
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            if(password_verify($password, $user['password'])) {
                return ['success' => true, 'user' => $user];
            }
        }
        return ['success' => false, 'error' => 'Invalid email or password'];
    }

    // Merr perdoruesin sipas email
    private function getUserByEmail($email) {
        $query = "SELECT id FROM " . $this->table . " WHERE email = :email LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Merr perdoruesin sipas ID
    public function getById($id) {
        $query = "SELECT id, username, email, role, full_name, phone, address, created_at FROM " . $this->table . " WHERE id = :id LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Update perdoruesin
    public function update($id, $username, $email, $full_name, $phone, $address, $role) {
        $query = "UPDATE " . $this->table . " SET username = :username, email = :email, full_name = :full_name, phone = :phone, address = :address, role = :role WHERE id = :id";
        $stmt = $this->conn->prepare($query);

        $username = htmlspecialchars(strip_tags($username));
        $email = htmlspecialchars(strip_tags($email));
        $full_name = htmlspecialchars(strip_tags($full_name));
        $phone = htmlspecialchars(strip_tags($phone));
        $address = htmlspecialchars(strip_tags($address));
        $role = htmlspecialchars(strip_tags($role));

        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':full_name', $full_name);
        $stmt->bindParam(':phone', $phone);
        $stmt->bindParam(':address', $address);
        $stmt->bindParam(':role', $role);

        return $stmt->execute();
    }

    // Merr te gjithe perdoruesit (Vetem per Admin)
    public function getAllUsers() {
        $query = "SELECT id, username, email, role, full_name, phone, created_at FROM " . $this->table . " ORDER BY created_at DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Fshij Perdoruesin (Delete User)
    public function deleteUser($id) {
        $query = "DELETE FROM " . $this->table . " WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        return $stmt->execute();
    }
}
