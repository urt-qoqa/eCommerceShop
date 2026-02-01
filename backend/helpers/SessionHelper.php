<?php
// Konfigurimi i sesionit (Session Configuration)
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

class SessionHelper {
    public static function isLoggedIn() {
        return isset($_SESSION['user_id']);
    }

    public static function isAdmin() {
        return isset($_SESSION['role']) && $_SESSION['role'] === 'admin';
    }

    public static function isManager() {
        return isset($_SESSION['role']) && ($_SESSION['role'] === 'manager' || $_SESSION['role'] === 'admin');
    }

    public static function isEmployee() {
        return isset($_SESSION['role']) && ($_SESSION['role'] === 'employee' || $_SESSION['role'] === 'manager' || $_SESSION['role'] === 'admin');
    }

    public static function getCurrentUserId() {
        return $_SESSION['user_id'] ?? null;
    }

    public static function getCurrentUserRole() {
        return $_SESSION['role'] ?? null;
    }

    public static function getCurrentUsername() {
        return $_SESSION['username'] ?? null;
    }

    public static function requireLogin() {
        if (!self::isLoggedIn()) {
            $_SESSION['redirect_after_login'] = $_SERVER['REQUEST_URI'];
            header('Location: login.php');
            exit();
        }
    }

    public static function requireRole($required_role) {
        self::requireLogin();
        
        $user_role = self::getCurrentUserRole();
        
        switch($required_role) {
            case 'admin':
                if (!self::isAdmin()) {
                    header('HTTP/1.0 403 Forbidden');
                    header('Location: index.php');
                    exit();
                }
                break;
            case 'manager':
                if (!self::isManager()) {
                    header('HTTP/1.0 403 Forbidden');
                    header('Location: index.php');
                    exit();
                }
                break;
            case 'employee':
                if (!self::isEmployee()) {
                    header('HTTP/1.0 403 Forbidden');
                    header('Location: index.php');
                    exit();
                }
                break;
        }
    }

    public static function login($user) {
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['username'];
        $_SESSION['email'] = $user['email'];
        $_SESSION['role'] = $user['role'];
        $_SESSION['full_name'] = $user['full_name'] ?? $user['username'];
        $_SESSION['login_time'] = time();
        $_SESSION['last_activity'] = time();

        // Clear any redirect URL after successful login
        if (isset($_SESSION['redirect_after_login'])) {
            $redirect = $_SESSION['redirect_after_login'];
            unset($_SESSION['redirect_after_login']);
        } else {
            $redirect = null;
        }

        return $redirect;
    }

    public static function logout() {
        session_unset();
        session_destroy();
        header('Location: login.php');
        exit();
    }

    public static function checkSessionTimeout() {
        if (!self::isLoggedIn()) {
            return;
        }

        $timeout = 3600; // 1 hour timeout
        $last_activity = $_SESSION['last_activity'] ?? 0;

        if (time() - $last_activity > $timeout) {
            self::logout();
        }

        $_SESSION['last_activity'] = time();
    }

    public static function hasPermission($permission) {
        if (!self::isLoggedIn()) {
            return false;
        }

        $role = self::getCurrentUserRole();

        switch($permission) {
            case 'view_admin_panel':
                return self::isManager();
            case 'manage_users':
                return self::isAdmin();
            case 'manage_products':
                return self::isEmployee();
            case 'manage_news':
                return self::isEmployee();
            case 'view_contacts':
                return self::isEmployee();
            default:
                return false;
        }
    }
}
