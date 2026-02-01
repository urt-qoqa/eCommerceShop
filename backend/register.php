<?php
require_once 'models/User.php';

$error = '';
$success = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username']);
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);
    $confirm_password = trim($_POST['confirm_password']);

    if (empty($username) || empty($email) || empty($password) || empty($confirm_password)) {
        $error = "All fields are required.";
    } elseif ($password !== $confirm_password) {
        $error = "Passwords do not match.";
    } else {
        $userModel = new User();
        $result = $userModel->register($username, $email, $password);
        
        if ($result['success']) {
            $success = "Registration successful! You can now <a href='login.php'>Login</a>.";
        } else {
            $error = $result['error'];
        }
    }
}

include '../partials/header.php';
?>

<style>
.register-container {
    max-width: 450px;
    margin: 80px auto;
    padding: 40px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.1);
}

.register-container h2 {
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

.success-message {
    color: #38a169;
    background: #f0fff4;
    padding: 12px;
    border-radius: 8px;
    text-align: center;
    margin-bottom: 20px;
    font-size: 14px;
}

.register-footer {
    text-align: center;
    margin-top: 20px;
    color: #666;
}

.register-footer a {
    color: #204647;
    font-weight: 600;
    text-decoration: none;
}

.register-footer a:hover {
    text-decoration: underline;
}

.password-hint {
    font-size: 12px;
    color: #666;
    margin-top: 5px;
}
</style>

<div class="register-container">
    <h2>Create Account</h2>
    <?php if($error): ?>
        <div class="error-message"><?php echo $error; ?></div>
    <?php endif; ?>
    <?php if($success): ?>
        <div class="success-message"><?php echo $success; ?></div>
    <?php endif; ?>
    
    <form method="POST" id="registerForm">
        <div class="form-group">
            <label>Username</label>
            <input type="text" name="username" required 
                   pattern="^[a-zA-Z0-9_]{3,20}$" 
                   title="3-20 characters: letters, numbers, underscore"
                   placeholder="Enter username">
        </div>
        <div class="form-group">
            <label>Email Address</label>
            <input type="email" name="email" required 
                   placeholder="you@example.com">
        </div>
        <div class="form-group">
            <label>Password</label>
            <input type="password" name="password" required 
                   pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$" 
                   title="8+ chars: uppercase, lowercase, number"
                   placeholder="Enter password">
            <div class="password-hint">Password must contain at least 8 characters with uppercase, lowercase, and number</div>
        </div>
        <div class="form-group">
            <label>Confirm Password</label>
            <input type="password" name="confirm_password" required 
                   placeholder="Confirm password">
        </div>
        <button type="submit" class="btn btn-primary" style="width: 100%; padding: 14px;">Register</button>
    </form>
    <div class="register-footer">
        Already have an account? <a href="login.php">Login</a>
    </div>
</div>

<?php include '../partials/footer.php'; ?>


