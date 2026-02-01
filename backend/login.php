<?php
require_once 'helpers/SessionHelper.php';
require_once 'models/User.php';

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);

    // Basic client-side validation feedback
    if (empty($email) || empty($password)) {
        $error = "All fields are required.";
    } else {
        $userModel = new User();
        $result = $userModel->login($email, $password);

        if ($result['success']) {
            SessionHelper::login($result['user']);
            if (SessionHelper::isManager()) {
                header('Location: admin_dashboard.php');
            } else {
                header('Location: index.php');
            }
            exit();
        } else {
            $error = $result['error'];
        }
    }
}

include '../partials/header.php';
?>

<style>
.login-container {
    max-width: 450px;
    margin: 80px auto;
    padding: 40px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.1);
}

.login-container h2 {
    text-align: center;
    margin-bottom: 30px;
    font-size: 28px;
    color: #1a1a1a;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #333;
}

.form-group input {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 15px;
    transition: border-color 0.3s;
}

.form-group input:focus {
    outline: none;
    border-color: #204647;
}

.error-message {
    color: #e53e3e;
    background: #fff5f5;
    padding: 12px;
    border-radius: 8px;
    text-align: center;
    margin-bottom: 20px;
    font-size: 14px;
}

.login-footer {
    text-align: center;
    margin-top: 20px;
    color: #666;
}

.login-footer a {
    color: #204647;
    font-weight: 600;
    text-decoration: none;
}

.login-footer a:hover {
    text-decoration: underline;
}
</style>

<div class="login-container">
    <h2>Welcome Back</h2>
    <?php if($error): ?>
        <div class="error-message"><?php echo $error; ?></div>
    <?php endif; ?>
    <form method="POST">
        <div class="form-group">
            <label>Email Address</label>
            <input type="email" name="email" required placeholder="you@example.com">
        </div>
        <div class="form-group">
            <label>Password</label>
            <input type="password" name="password" required placeholder="Enter your password">
        </div>
        <button type="submit" class="btn btn-primary" style="width: 100%; padding: 14px;">Login</button>
    </form>
    <div class="login-footer">
        Don't have an account? <a href="register.php">Create one</a>
    </div>
</div>

<?php include '../partials/footer.php'; ?>


