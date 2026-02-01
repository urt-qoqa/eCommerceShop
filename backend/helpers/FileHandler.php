<?php
class FileHandler {
    // Ngarko imazh me validim te plote
    public static function uploadImage($file, $targetDir = "uploads/") {
        if (!file_exists($targetDir)) {
            mkdir($targetDir, 0777, true);
        }

        // Validim per gabime bazë
        if (!isset($file) || $file['error'] !== UPLOAD_ERR_OK) {
            return ['success' => false, 'message' => "No file uploaded or upload error"];
        }

        $fileName = basename($file["name"]);
        $imageFileType = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
        
        // Gjenero emër unik për të shmangur overwrite
        $uniqueName = uniqid('img_') . '.' . $imageFileType;
        $targetFile = $targetDir . $uniqueName;

        // Kontrollo nese file është imazh i vërtetë
        $check = getimagesize($file["tmp_name"]);
        if($check === false) {
            return ['success' => false, 'message' => "File is not an image."];
        }

        // Kontrollo dimensionet maksimale (2048x2048)
        list($width, $height) = $check;
        if ($width > 2048 || $height > 2048) {
            return ['success' => false, 'message' => "Image dimensions too large (max 2048x2048)."];
        }

        // Kontrollo madhësinë e file (5MB limit)
        if ($file["size"] > 5000000) {
            return ['success' => false, 'message' => "File too large (max 5MB)."];
        }

        // Lejo formatet e specifikuara
        $allowedTypes = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
        if (!in_array($imageFileType, $allowedTypes)) {
            return ['success' => false, 'message' => "Only JPG, JPEG, PNG, GIF & WEBP files allowed."];
        }

        // Kontrollo MIME type për siguri shtesë
        $allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $mime = finfo_file($finfo, $file["tmp_name"]);
        finfo_close($finfo);
        
        if (!in_array($mime, $allowedMimes)) {
            return ['success' => false, 'message' => "Invalid file type."];
        }

        if (move_uploaded_file($file["tmp_name"], $targetFile)) {
            return ['success' => true, 'path' => $targetFile, 'filename' => $uniqueName];
        } else {
            return ['success' => false, 'message' => "Error uploading file."];
        }
    }

    // Ngarko dokumente (PDF, DOC, DOCX)
    public static function uploadDocument($file, $targetDir = "uploads/documents/") {
        if (!file_exists($targetDir)) {
            mkdir($targetDir, 0777, true);
        }

        if (!isset($file) || $file['error'] !== UPLOAD_ERR_OK) {
            return ['success' => false, 'message' => "No file uploaded or upload error"];
        }

        $fileName = basename($file["name"]);
        $fileType = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
        
        // Gjenero emër unik
        $uniqueName = uniqid('doc_') . '.' . $fileType;
        $targetFile = $targetDir . $uniqueName;

        // Kontrollo madhësinë (10MB limit për dokumente)
        if ($file["size"] > 10000000) {
            return ['success' => false, 'message' => "File too large (max 10MB)."];
        }

        // Lejo vetëm dokumente
        $allowedTypes = ['pdf', 'doc', 'docx', 'txt'];
        if (!in_array($fileType, $allowedTypes)) {
            return ['success' => false, 'message' => "Only PDF, DOC, DOCX & TXT files allowed."];
        }

        if (move_uploaded_file($file["tmp_name"], $targetFile)) {
            return ['success' => true, 'path' => $targetFile, 'filename' => $uniqueName];
        } else {
            return ['success' => false, 'message' => "Error uploading file."];
        }
    }

    // Fshi file nga serveri
    public static function deleteFile($filePath) {
        if (file_exists($filePath)) {
            return unlink($filePath);
        }
        return false;
    }

    // Kontrollo nese file ekziston
    public static function fileExists($filePath) {
        return file_exists($filePath);
    }

    // Merr informacione rreth file
    public static function getFileInfo($filePath) {
        if (!file_exists($filePath)) {
            return null;
        }
        
        return [
            'size' => filesize($filePath),
            'type' => mime_content_type($filePath),
            'modified' => filemtime($filePath)
        ];
    }
}
