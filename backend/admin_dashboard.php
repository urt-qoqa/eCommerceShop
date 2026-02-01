<?php
require_once 'helpers/SessionHelper.php';
require_once 'models/User.php';
require_once 'models/Product.php';
require_once 'models/Contact.php';
require_once 'models/News.php';
require_once 'models/Category.php';

// Strict Access Control
SessionHelper::requireLogin();
SessionHelper::requireRole('manager');

$userModel = new User();
$productModel = new Product();
$contactModel = new Contact();
$newsModel = new News();
$categoryModel = new Category();

$success = '';
$error = '';

// Handle POST Actions
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // --- Product Actions ---
    if (isset($_POST['add_product'])) {
        $name = trim($_POST['name']);
        $price = floatval($_POST['price']);
        $description = trim($_POST['description']);
        $category_id = intval($_POST['category_id']);
        $stock_quantity = intval($_POST['stock_quantity'] ?? 0);
        $sku = trim($_POST['sku'] ?? '');
        $image_url = '';
        
        if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
            require_once 'helpers/FileHandler.php';
            $upload_result = FileHandler::uploadImage($_FILES['image']);
            if ($upload_result['success']) {
                $image_url = $upload_result['path'];
            } else {
                $error = $upload_result['message'];
                $image_url = '';
            }
        }
        
        $result = $productModel->create($name, $description, $price, $category_id, $image_url, $stock_quantity, $sku, SessionHelper::getCurrentUserId());
        if ($result['success']) {
            $success = "Product added successfully.";
        } else {
            $error = $result['error'];
        }
    }
    
    if (isset($_POST['update_product'])) {
        $id = intval($_POST['product_id']);
        $name = trim($_POST['name']);
        $price = floatval($_POST['price']);
        $description = trim($_POST['description']);
        $category_id = intval($_POST['category_id']);
        $stock_quantity = intval($_POST['stock_quantity'] ?? 0);
        $sku = trim($_POST['sku'] ?? '');
        $image_url = $_POST['existing_image'] ?? '';
        
        if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
            require_once 'helpers/FileHandler.php';
            $upload_result = FileHandler::uploadImage($_FILES['image']);
            if ($upload_result['success']) {
                $image_url = $upload_result['path'];
            } else {
                $error = $upload_result['message'];
            }
        }
        
        $result = $productModel->update($id, $name, $description, $price, $category_id, $image_url, $stock_quantity, $sku);
        if ($result['success']) {
            $success = "Product updated successfully.";
        } else {
            $error = $result['error'];
        }
    }
    
    if (isset($_POST['delete_product'])) {
        $id = intval($_POST['product_id']);
        if ($productModel->delete($id)) {
            $success = "Product deleted successfully.";
        } else {
            $error = "Failed to delete product.";
        }
    }

    // --- News Actions ---
    if (isset($_POST['add_news'])) {
        $title = trim($_POST['title']);
        $content = trim($_POST['content']);
        $excerpt = trim($_POST['excerpt'] ?? '');
        $image_url = '';
        
        if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
            require_once 'helpers/FileHandler.php';
            $upload_result = FileHandler::uploadImage($_FILES['image']);
            if ($upload_result['success']) {
                $image_url = $upload_result['path'];
            } else {
                $error = $upload_result['message'];
                $image_url = '';
            }
        }

        $result = $newsModel->create($title, $content, $excerpt, $image_url, SessionHelper::getCurrentUserId());
        if ($result['success']) {
            $success = "News item added successfully.";
        } else {
            $error = $result['error'];
        }
    }

    if (isset($_POST['publish_news'])) {
        $id = intval($_POST['news_id']);
        if ($newsModel->updateStatus($id, 'published')) {
            $success = "News published successfully.";
        } else {
            $error = "Failed to publish news.";
        }
    }

    if (isset($_POST['delete_news'])) {
        $id = intval($_POST['news_id']);
        if ($newsModel->delete($id)) {
            $success = "News item deleted successfully.";
        } else {
            $error = "Failed to delete news.";
        }
    }

    // --- User Actions ---
    if (isset($_POST['update_user']) && SessionHelper::isAdmin()) {
        $id = intval($_POST['user_id']);
        $username = trim($_POST['username']);
        $email = trim($_POST['email']);
        $full_name = trim($_POST['full_name']);
        $phone = trim($_POST['phone']);
        $address = trim($_POST['address']);
        $role = trim($_POST['role']);
        
        if ($userModel->update($id, $username, $email, $full_name, $phone, $address, $role)) {
            $success = "User updated successfully.";
        } else {
            $error = "Failed to update user.";
        }
    }
    
    if (isset($_POST['delete_user']) && SessionHelper::isAdmin()) {
        $id = intval($_POST['user_id']);
        if ($userModel->deleteUser($id)) {
            $success = "User deleted successfully.";
        } else {
            $error = "Failed to delete user.";
        }
    }

    // --- Contact Actions ---
    if (isset($_POST['mark_read'])) {
        $id = intval($_POST['message_id']);
        if ($contactModel->updateStatus($id, 'read')) {
            $success = "Message marked as read.";
        } else {
            $error = "Failed to update message status.";
        }
    }
}

// Fetch Data for View
$users = $userModel->getAllUsers();
$products = $productModel->getAllForAdmin();
$categories = $categoryModel->getAll();
$messages = $contactModel->getAll();
$newsList = $newsModel->getAllForAdmin();
$unread_count = $contactModel->countUnread();

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Admin Dashboard - ByteHub</title>
    <link rel="stylesheet" href="../styles.css">
    <link rel="icon" type="image/svg+xml" href="../logo.svg">
    <style>
        .dashboard-container { padding: 40px 0; max-width: 1200px; margin: 0 auto; }
        .dashboard-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
        
        .dashboard-tabs { display: flex; gap: 10px; margin-bottom: 30px; border-bottom: 2px solid #eee; }
        .tab-btn { background: none; border: none; font-size: 16px; cursor: pointer; padding: 15px 25px; font-weight: 600; color: #666; transition: all 0.3s; }
        .tab-btn:hover { color: #000; background: #f9f9f9; }
        .tab-btn.active { color: #000; border-bottom: 2px solid #000; margin-bottom: -2px; }
        
        .tab-content { display: none; animation: fadeIn 0.3s; }
        .tab-content.active { display: block; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        
        .admin-table { width: 100%; border-collapse: collapse; background: white; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
        .admin-table th, .admin-table td { padding: 15px; border-bottom: 1px solid #eee; text-align: left; }
        .admin-table th { background-color: #f8f9fa; font-weight: 600; color: #333; }
        .admin-table tr:hover { background-color: #fcfcfc; }
        
        .action-btn { padding: 6px 12px; border-radius: 4px; color: white; border: none; cursor: pointer; font-size: 13px; transition: opacity 0.2s; }
        .action-btn:hover { opacity: 0.9; }
        .btn-delete { background-color: #dc3545; }
        
        .add-form { background: #fff; padding: 25px; border-radius: 8px; margin-bottom: 30px; box-shadow: 0 2px 15px rgba(0,0,0,0.05); border: 1px solid #eee; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 15px; }
        
        .form-input { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; }
        .form-textarea { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; min-height: 100px; }
        
        .alert { padding: 15px; border-radius: 5px; margin-bottom: 20px; }
        .alert-success { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
        .alert-error { background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
    </style>
</head>
<body>

<header class="header">
    <div class="container">
        <div class="header-content">
            <a href="index.php" class="logo"><span class="logo-text">ByteHub Admin</span></a>
            <nav class="nav">
                <a href="index.php" class="nav-link">View Site</a>
                <span class="nav-link">Logged in as <strong><?php echo htmlspecialchars($_SESSION['username']); ?></strong></span>
                <a href="logout.php" class="nav-link" style="color: #dc3545;">Logout</a>
            </nav>
        </div>
    </div>
</header>

<div class="container dashboard-container">
    <div class="dashboard-header">
        <h1>Dashboard Overview</h1>
    </div>
    
    <?php if($success): ?><div class="alert alert-success"><?php echo $success; ?></div><?php endif; ?>
    <?php if($error): ?><div class="alert alert-error"><?php echo $error; ?></div><?php endif; ?>

    <div class="dashboard-tabs">
        <button class="tab-btn active" onclick="openTab('products')">Products</button>
        <button class="tab-btn" onclick="openTab('news')">News</button>
        <button class="tab-btn" onclick="openTab('users')">Users</button>
        <button class="tab-btn" onclick="openTab('messages')">Messages</button>
    </div>

    <!-- Products Tab -->
    <div id="products" class="tab-content active">
        <div class="add-form">
            <h3>Add New Product</h3>
            <form method="POST" enctype="multipart/form-data">
                <input type="hidden" name="add_product" value="1">
                <div class="form-row">
                    <input type="text" name="name" class="form-input" placeholder="Product Name" required>
                    <input type="text" name="sku" class="form-input" placeholder="SKU (optional)">
                </div>
                <div class="form-row">
                    <input type="number" name="price" step="0.01" class="form-input" placeholder="Price ($)" required>
                    <input type="number" name="stock_quantity" class="form-input" placeholder="Stock Quantity" min="0">
                </div>
                <div class="form-row">
                    <select name="category_id" class="form-input" required>
                        <option value="">Select Category</option>
                        <?php foreach($categories as $category): ?>
                        <option value="<?php echo $category['id']; ?>"><?php echo htmlspecialchars($category['name']); ?></option>
                        <?php endforeach; ?>
                    </select>
                    <input type="file" name="image" class="form-input" accept="image/*">
                </div>
                <textarea name="description" class="form-textarea" placeholder="Product Description" required></textarea>
                <button type="submit" class="btn btn-primary" style="margin-top: 15px;">Add Product</button>
            </form>
        </div>

        <table class="admin-table">
            <thead>
                <tr>
                    <th width="60">Image</th>
                    <th>Name</th>
                    <th>SKU</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach($products as $product): ?>
                <tr>
                    <td>
                        <?php if($product['image_url']): ?>
                        <img src="<?php echo htmlspecialchars($product['image_url']); ?>" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;">
                        <?php else: ?>
                        <div style="width: 50px; height: 50px; background: #f0f0f0; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: #999;">No img</div>
                        <?php endif; ?>
                    </td>
                    <td><strong><?php echo htmlspecialchars($product['name']); ?></strong></td>
                    <td><?php echo htmlspecialchars($product['sku'] ?? 'N/A'); ?></td>
                    <td>$<?php echo number_format($product['price'], 2); ?></td>
                    <td><?php echo intval($product['stock_quantity']); ?></td>
                    <td><?php echo htmlspecialchars($product['category_name'] ?? 'N/A'); ?></td>
                    <td>
                        <span style="padding: 4px 8px; border-radius: 12px; font-size: 12px; font-weight: bold; 
                              background: <?php echo $product['status'] == 'active' ? '#d4edda' : '#f8d7da'; ?>; 
                              color: <?php echo $product['status'] == 'active' ? '#155724' : '#721c24'; ?>;">
                            <?php echo strtoupper($product['status']); ?>
                        </span>
                    </td>
                    <td>
                        <form method="POST" style="display:inline;">
                            <input type="hidden" name="product_id" value="<?php echo $product['id']; ?>">
                            <button type="submit" name="delete_product" class="action-btn btn-delete" onclick="return confirm('Delete this product?')">Delete</button>
                        </form>
                    </td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>

    <!-- News Tab -->
    <div id="news" class="tab-content">
        <div class="add-form">
            <h3>Add News / Portfolio Item</h3>
            <form method="POST" enctype="multipart/form-data">
                <input type="hidden" name="add_news" value="1">
                <div class="form-row">
                    <input type="text" name="title" class="form-input" placeholder="News Title" required>
                    <input type="file" name="image" class="form-input" accept="image/*">
                </div>
                <textarea name="excerpt" class="form-textarea" placeholder="Short excerpt (optional)" rows="2"></textarea>
                <textarea name="content" class="form-textarea" placeholder="Full news content" required rows="6"></textarea>
                <button type="submit" class="btn btn-primary" style="margin-top: 15px;">Add as Draft</button>
            </form>
        </div>

        <table class="admin-table">
            <thead>
                <tr>
                    <th width="60">Image</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach($newsList as $item): ?>
                <tr>
                    <td>
                        <?php if($item['image_url']): ?>
                        <img src="<?php echo htmlspecialchars($item['image_url']); ?>" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;">
                        <?php else: ?>
                        <div style="width: 50px; height: 50px; background: #f0f0f0; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: #999;">No img</div>
                        <?php endif; ?>
                    </td>
                    <td><strong><?php echo htmlspecialchars($item['title']); ?></strong></td>
                    <td><?php echo htmlspecialchars($item['author_name'] ?? 'Unknown'); ?></td>
                    <td>
                        <span style="padding: 4px 8px; border-radius: 12px; font-size: 12px; font-weight: bold; 
                              background: <?php echo $item['status'] == 'published' ? '#d4edda' : '#fff3cd'; ?>; 
                              color: <?php echo $item['status'] == 'published' ? '#155724' : '#856404'; ?>;">
                            <?php echo ucfirst($item['status']); ?>
                        </span>
                    </td>
                    <td><?php echo date('M d, Y', strtotime($item['created_at'])); ?></td>
                    <td>
                        <?php if($item['status'] == 'draft'): ?>
                        <form method="POST" style="display:inline;">
                            <input type="hidden" name="news_id" value="<?php echo $item['id']; ?>">
                            <button type="submit" name="publish_news" class="action-btn" style="background: #28a745; margin-right: 5px;">Publish</button>
                        </form>
                        <?php endif; ?>
                        <form method="POST" style="display:inline;">
                            <input type="hidden" name="news_id" value="<?php echo $item['id']; ?>">
                            <button type="submit" name="delete_news" class="action-btn btn-delete" onclick="return confirm('Delete this news item?')">Delete</button>
                        </form>
                    </td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>

    <!-- Users Tab -->
    <div id="users" class="tab-content">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <h3>User Management</h3>
            <div style="color: #666; font-size: 14px;">
                Total Users: <?php echo count($users); ?>
            </div>
        </div>
        <table class="admin-table">
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Role</th>
                    <th>Registered</th>
                    <?php if(SessionHelper::isAdmin()): ?><th>Actions</th><?php endif; ?>
                </tr>
            </thead>
            <tbody>
                <?php foreach($users as $user): ?>
                <tr>
                    <td><strong><?php echo htmlspecialchars($user['username']); ?></strong></td>
                    <td><?php echo htmlspecialchars($user['full_name'] ?? 'N/A'); ?></td>
                    <td><?php echo htmlspecialchars($user['email']); ?></td>
                    <td><?php echo htmlspecialchars($user['phone'] ?? 'N/A'); ?></td>
                    <td>
                        <span style="padding: 4px 8px; border-radius: 12px; font-size: 12px; font-weight: bold; 
                              background: <?php 
                                switch($user['role']) {
                                    case 'admin': echo '#f8d7da; color: #721c24'; break;
                                    case 'manager': echo '#d1ecf1; color: #0c5460'; break;
                                    case 'employee': echo '#fff3cd; color: #856404'; break;
                                    default: echo '#d4edda; color: #155724';
                                } ?>;">
                            <?php echo strtoupper($user['role']); ?>
                        </span>
                    </td>
                    <td><?php echo date('M d, Y', strtotime($user['created_at'])); ?></td>
                    <?php if(SessionHelper::isAdmin()): ?>
                    <td>
                        <?php if($user['role'] !== 'admin' && $user['id'] != SessionHelper::getCurrentUserId()): ?>
                        <form method="POST" style="display:inline;">
                            <input type="hidden" name="user_id" value="<?php echo $user['id']; ?>">
                            <button type="submit" name="delete_user" class="action-btn btn-delete" onclick="return confirm('Delete user <?= htmlspecialchars($user['username']) ?>?')">Delete</button>
                        </form>
                        <?php else: ?>
                        <span style="color: #999;">Protected</span>
                        <?php endif; ?>
                    </td>
                    <?php endif; ?>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>

    <!-- Messages Tab -->
    <div id="messages" class="tab-content">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <h3>Contact Messages</h3>
            <div style="color: #666; font-size: 14px;">
                <?php if($unread_count > 0): ?>
                    <span style="background: #dc3545; color: white; padding: 4px 8px; border-radius: 12px; font-weight: bold;">
                        <?php echo $unread_count; ?> Unread
                    </span>
                <?php else: ?>
                    All messages read
                <?php endif; ?>
            </div>
        </div>
        <table class="admin-table">
            <thead>
                <tr>
                    <th>From</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Subject</th>
                    <th>Message</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach($messages as $msg): ?>
                <tr style="background: <?php echo $msg['status'] == 'unread' ? '#fff8e1' : 'transparent'; ?>;">
                    <td style="font-weight: 500;"><?php echo htmlspecialchars($msg['full_name']); ?></td>
                    <td><a href="mailto:<?php echo htmlspecialchars($msg['email']); ?>" style="color: #0066cc;"><?php echo htmlspecialchars($msg['email']); ?></a></td>
                    <td><?php echo htmlspecialchars($msg['phone'] ?? 'N/A'); ?></td>
                    <td><strong><?php echo htmlspecialchars($msg['subject']); ?></strong></td>
                    <td style="max-width: 300px; color: #555;"><?php echo substr(htmlspecialchars($msg['message']), 0, 100); ?>...</td>
                    <td>
                        <span style="padding: 4px 8px; border-radius: 12px; font-size: 12px; font-weight: bold; 
                              background: <?php 
                                switch($msg['status']) {
                                    case 'unread': echo '#fff3cd; color: #856404'; break;
                                    case 'read': echo '#d4edda; color: #155724'; break;
                                    case 'replied': echo '#d1ecf1; color: #0c5460'; break;
                                } ?>;">
                            <?php echo ucfirst($msg['status']); ?>
                        </span>
                    </td>
                    <td><?php echo date('M d H:i', strtotime($msg['created_at'])); ?></td>
                    <td>
                        <?php if($msg['status'] == 'unread'): ?>
                        <form method="POST" style="display:inline;">
                            <input type="hidden" name="message_id" value="<?php echo $msg['id']; ?>">
                            <button type="submit" name="mark_read" class="action-btn" style="background: #28a745; margin-right: 5px;">Mark Read</button>
                        </form>
                        <?php endif; ?>
                        <form method="POST" style="display:inline;">
                            <input type="hidden" name="message_id" value="<?php echo $msg['id']; ?>">
                            <button type="submit" name="delete_message" class="action-btn btn-delete" onclick="return confirm('Delete this message?')">Delete</button>
                        </form>
                    </td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
</div>

<script>
    function openTab(tabName) {
        var i;
        var x = document.getElementsByClassName("tab-content");
        var tabs = document.getElementsByClassName("tab-btn");
        for (i = 0; i < x.length; i++) {
            x[i].classList.remove("active");
            x[i].style.display = "none";
        }
        for (i = 0; i < tabs.length; i++) {
            tabs[i].classList.remove("active");
        }
        document.getElementById(tabName).style.display = "block";
        // Small timeout to allow display:block to apply before adding opacity class if needed, 
        // but here we just use the class
        setTimeout(() => {
             document.getElementById(tabName).classList.add("active");
        }, 10);
       
        event.currentTarget.classList.add("active");
    }
</script>

</body>
</html>


