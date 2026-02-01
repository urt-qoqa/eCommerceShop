<?php
require_once 'models/Contact.php';

$success = '';
$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $full_name = trim($_POST['full_name']);
    $email = trim($_POST['email']);
    $phone = trim($_POST['phone']);
    $subject = trim($_POST['subject']);
    $message = trim($_POST['message']);

    $contactModel = new Contact();
    $result = $contactModel->saveMessage($full_name, $email, $phone, $subject, $message);
    
    if ($result['success']) {
        $success = "Thank you! Your message has been sent successfully. We'll get back to you soon.";
        // Clear form
        $_POST = [];
    } else {
        $error = $result['error'];
    }
}

include '../partials/header.php';
?>

<style>
.contact-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 50px;
    max-width: 1000px;
    margin: 60px auto;
    padding: 0 20px;
}

.contact-info {
    background: #f8f9fa;
    padding: 40px;
    border-radius: 16px;
    height: fit-content;
}

.contact-form {
    background: white;
    padding: 40px;
    border-radius: 16px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.08);
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: #333;
}

.form-group input,
.form-group textarea,
.form-group select {
    width: 100%;
    padding: 14px 16px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 15px;
    transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
    outline: none;
    border-color: #204647;
}

.alert {
    padding: 16px 20px;
    border-radius: 8px;
    margin-bottom: 25px;
    font-weight: 500;
}

.alert-success {
    background: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
}

.alert-error {
    background: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
}

.contact-item {
    margin-bottom: 25px;
}

.contact-item h4 {
    margin-bottom: 8px;
    color: #204647;
    font-size: 16px;
}

.contact-item p {
    color: #666;
    line-height: 1.6;
}

@media (max-width: 768px) {
    .contact-container {
        grid-template-columns: 1fr;
        gap: 30px;
        padding: 0 15px;
    }
    
    .contact-info,
    .contact-form {
        padding: 30px 25px;
    }
}
</style>

<div class="contact-container">
    <!-- Contact Information -->
    <div class="contact-info">
        <h2 style="margin-bottom: 30px; color: #1a1a1a;">Get in Touch</h2>
        <p style="color: #666; line-height: 1.8; margin-bottom: 30px;">
            Have questions about our products or services? We're here to help. Reach out to us through any of the following methods:
        </p>
        
        <div class="contact-item">
            <h4>ðŸ“ Address</h4>
            <p>123 Tech Street<br>Digital City, DC 12345<br>United States</p>
        </div>
        
        <div class="contact-item">
            <h4>ðŸ“§ Email</h4>
            <p>info@bytehub.com<br>support@bytehub.com</p>
        </div>
        
        <div class="contact-item">
            <h4>ðŸ“ž Phone</h4>
            <p>Main: +1 (555) 123-4567<br>Support: +1 (555) 123-4568</p>
        </div>
        
        <div class="contact-item">
            <h4>ðŸ• Business Hours</h4>
            <p>Monday - Friday: 9:00 AM - 6:00 PM<br>Saturday: 10:00 AM - 4:00 PM<br>Sunday: Closed</p>
        </div>
    </div>

    <!-- Contact Form -->
    <div class="contact-form">
        <h2 style="margin-bottom: 30px; color: #1a1a1a;">Send Us a Message</h2>
        
        <?php if($success): ?>
            <div class="alert alert-success"><?php echo $success; ?></div>
        <?php endif; ?>
        <?php if($error): ?>
            <div class="alert alert-error"><?php echo $error; ?></div>
        <?php endif; ?>

        <form method="POST" id="contactForm">
            <div class="form-group">
                <label for="full_name">Full Name *</label>
                <input type="text" name="full_name" id="full_name" required 
                       pattern="^[a-zA-Z\s\-\.]{2,100}$" 
                       title="Please enter your full name"
                       value="<?php echo isset($_POST['full_name']) ? htmlspecialchars($_POST['full_name']) : ''; ?>">
            </div>
            
            <div class="form-group">
                <label for="email">Email Address *</label>
                <input type="email" name="email" id="email" required
                       value="<?php echo isset($_POST['email']) ? htmlspecialchars($_POST['email']) : ''; ?>">
            </div>
            
            <div class="form-group">
                <label for="phone">Phone Number</label>
                <input type="tel" name="phone" id="phone" 
                       pattern="^[\d\s\-\+\(\)]{10,20}$"
                       title="Enter a valid phone number"
                       value="<?php echo isset($_POST['phone']) ? htmlspecialchars($_POST['phone']) : ''; ?>">
            </div>
            
            <div class="form-group">
                <label for="subject">Subject *</label>
                <select name="subject" id="subject" required>
                    <option value="">Select a subject</option>
                    <option value="Product Inquiry" <?php echo (isset($_POST['subject']) && $_POST['subject'] == 'Product Inquiry') ? 'selected' : ''; ?>>Product Inquiry</option>
                    <option value="Technical Support" <?php echo (isset($_POST['subject']) && $_POST['subject'] == 'Technical Support') ? 'selected' : ''; ?>>Technical Support</option>
                    <option value="Order Status" <?php echo (isset($_POST['subject']) && $_POST['subject'] == 'Order Status') ? 'selected' : ''; ?>>Order Status</option>
                    <option value="Partnership" <?php echo (isset($_POST['subject']) && $_POST['subject'] == 'Partnership') ? 'selected' : ''; ?>>Partnership</option>
                    <option value="Other" <?php echo (isset($_POST['subject']) && $_POST['subject'] == 'Other') ? 'selected' : ''; ?>>Other</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="message">Message *</label>
                <textarea name="message" id="message" rows="6" required 
                          minlength="10" 
                          placeholder="Please describe your inquiry in detail..."
                          ><?php echo isset($_POST['message']) ? htmlspecialchars($_POST['message']) : ''; ?></textarea>
            </div>
            
            <button type="submit" class="btn btn-primary" style="width: 100%; padding: 16px; font-size: 16px; font-weight: 600;">
                Send Message
            </button>
        </form>
    </div>
</div>

<script>
// Form validation feedback
document.getElementById('contactForm').addEventListener('submit', function(e) {
    const form = this;
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#dc3545';
            isValid = false;
        } else {
            input.style.borderColor = '#e0e0e0';
        }
    });
    
    if (!isValid) {
        e.preventDefault();
        alert('Please fill in all required fields correctly.');
    }
});

// Remove red border on input
document.querySelectorAll('.form-group input, .form-group textarea, .form-group select').forEach(input => {
    input.addEventListener('input', function() {
        if (this.value.trim()) {
            this.style.borderColor = '#28a745';
        }
    });
});
</script>

<?php include '../partials/footer.php'; ?>


