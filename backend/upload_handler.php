<?php
require_once 'helpers/SessionHelper.php';

// Kontrollo a Ã«shtÃ« file upload request
if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'No file uploaded or upload error']);
    exit;
}

// Kontrollo nese useri Ã«shtÃ« i kyqur
if (!SessionHelper::isLoggedIn()) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

// Kontrollo permissions (vetem admin/manager/employee mund tÃ« ngarkojnÃ« file)
if (!SessionHelper::isEmployee()) {
    http_response_code(403);
    echo json_encode(['success' => false, 'message' => 'Insufficient permissions']);
    exit;
}

require_once 'helpers/FileHandler.php';

// PÃ«rcakto tipin e file sipas parametrit
$fileType = $_POST['type'] ?? 'image';

if ($fileType === 'image') {
    $result = FileHandler::uploadImage($_FILES['file']);
} elseif ($fileType === 'document') {
    $result = FileHandler::uploadDocument($_FILES['file']);
} else {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid file type']);
    exit;
}

// Ktheje pÃ«rgjigjen si JSON
header('Content-Type: application/json');
echo json_encode($result);
?>

