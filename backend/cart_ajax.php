<?php
require_once 'helpers/SessionHelper.php';
require_once 'models/Cart.php';

// Start session if not already started
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Get session ID for guests
if (!isset($_SESSION['cart_session_id'])) {
    $_SESSION['cart_session_id'] = session_id();
}

$cartModel = new Cart();
$user_id = SessionHelper::getCurrentUserId();
$session_id = $_SESSION['cart_session_id'];

// Handle AJAX requests
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
    header('Content-Type: application/json');
    
    switch ($_POST['action']) {
        case 'add':
            $product_id = intval($_POST['product_id']);
            $quantity = intval($_POST['quantity'] ?? 1);
            
            if ($product_id > 0 && $quantity > 0) {
                $result = $cartModel->addItem($product_id, $quantity, $user_id, $session_id);
                echo json_encode($result);
            } else {
                echo json_encode(['success' => false, 'error' => 'Invalid product or quantity']);
            }
            break;
            
        case 'update':
            $cart_id = intval($_POST['cart_id']);
            $quantity = intval($_POST['quantity']);
            
            if ($cart_id > 0 && $quantity >= 0) {
                $result = $cartModel->updateQuantity($cart_id, $quantity, $user_id, $session_id);
                echo json_encode($result);
            } else {
                echo json_encode(['success' => false, 'error' => 'Invalid parameters']);
            }
            break;
            
        case 'remove':
            $cart_id = intval($_POST['cart_id']);
            
            if ($cart_id > 0) {
                $result = $cartModel->removeItem($cart_id, $user_id, $session_id);
                echo json_encode($result);
            } else {
                echo json_encode(['success' => false, 'error' => 'Invalid cart item']);
            }
            break;
            
        case 'get':
            $items = $cartModel->getItems($user_id, $session_id);
            $count = $cartModel->countItems($user_id, $session_id);
            $total = $cartModel->getCartTotal($user_id, $session_id);
            
            echo json_encode([
                'success' => true,
                'items' => $items,
                'count' => $count,
                'total' => $total
            ]);
            break;
            
        default:
            echo json_encode(['success' => false, 'error' => 'Invalid action']);
    }
    exit;
}

// Handle GET request for cart content
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'get') {
    header('Content-Type: application/json');
    
    $items = $cartModel->getItems($user_id, $session_id);
    $count = $cartModel->countItems($user_id, $session_id);
    $total = $cartModel->getCartTotal($user_id, $session_id);
    
    echo json_encode([
        'success' => true,
        'items' => $items,
        'count' => $count,
        'total' => $total
    ]);
    exit;
}
?>

