<?php
// Konfigurimi i bazës së të dhënave
class Database {
    private $host = 'localhost';
    private $db_name = 'bytehub_db';
    private $username = 'root';
    private $password = '';
    private $conn;

    private static $instance = null; // Pattern Singleton

    private function __construct() {
        try {
            // Lidhja me databazen duke perdorur PDO
            $this->conn = new PDO('mysql:host=' . $this->host . ';dbname=' . $this->db_name, $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        } catch(PDOException $e) {
            echo 'Gabim ne lidhje: ' . $e->getMessage();
        }
    }

    // Merr instancen unike te klases
    public static function getInstance() {
        if (self::$instance == null) {
            self::$instance = new Database();
        }
        return self::$instance;
    }

    // Merr lidhjen (objektin PDO)
    public function getConnection() {
        return $this->conn;
    }
}
