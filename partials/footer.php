    <!-- Footer -->
    <footer class="footer" role="contentinfo">
        <div class="container">
            <div class="footer-content">
                <div class="footer-col">
                    <div class="footer-logo">
                        <span class="footer-logo-text">ByteHub</span>
                    </div>
                    <p class="footer-description">Your trusted destination for premium tech products. We offer the latest laptops, smartphones, and accessories with exceptional service and competitive prices.</p>
                    <div class="social-links">
                        <a href="#" aria-label="Facebook" class="social-link"><i class="fab fa-facebook-f"></i></a>
                        <a href="#" aria-label="Twitter" class="social-link"><i class="fab fa-twitter"></i></a>
                        <a href="#" aria-label="Instagram" class="social-link"><i class="fab fa-instagram"></i></a>
                    </div>
                </div>

                <div class="footer-col">
                    <h3 class="footer-heading">Newsletter</h3>
                    <p class="newsletter-description">Subscribe for exclusive deals and tech updates</p>
                    <form class="newsletter-form" id="newsletterForm">
                        <input type="email" placeholder="Enter your email" required aria-label="Email for newsletter">
                        <button type="submit" aria-label="Subscribe to newsletter">
                            <i class="fas fa-arrow-right"></i>
                        </button>
                    </form>
                    <div id="newsletterMessage" style="display: none; margin-top: 10px; font-size: 14px;"></div>
                </div>

                <div class="footer-col">
                    <h3 class="footer-heading">Quick Links</h3>
                    <ul class="footer-links">
                        <li><a href="products.php">All Products</a></li>
                        <li><a href="products.php?category=Laptops">Laptops</a></li>
                        <li><a href="products.php?category=Phones">Smartphones</a></li>
                        <li><a href="products.php?category=Accessories">Accessories</a></li>
                        <li><a href="about.php">About Us</a></li>
                        <li><a href="contact.php">Contact Us</a></li>
                    </ul>
                </div>

                <div class="footer-col">
                    <h3 class="footer-heading">Customer Service</h3>
                    <ul class="footer-links">
                        <li><a href="#">Shipping Info</a></li>
                        <li><a href="#">Returns & Exchanges</a></li>
                        <li><a href="#">Warranty</a></li>
                        <li><a href="#">FAQ</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Terms of Service</a></li>
                    </ul>
                </div>
            </div>

            <div class="footer-watermark">BYTEHUB</div>

            <div class="footer-bottom">
                <p>&copy; <?php echo date('Y'); ?> ByteHub. All rights reserved.</p>
                <p>Powered by <a href="#" style="color: inherit;">ByteHub Team</a></p>
            </div>
        </div>
    </footer>

    <style>
        /* Enhanced footer styles */
        .social-links {
            display: flex;
            gap: 15px;
            margin-top: 20px;
        }
        
        .social-link {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: rgba(255,255,255,0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            color: rgba(255,255,255,0.7);
            transition: all 0.3s ease;
            text-decoration: none;
        }
        
        .social-link:hover {
            background: #204647;
            color: white;
            transform: translateY(-2px);
        }
        
        .newsletter-description {
            font-size: 14px;
            color: #999;
            margin-bottom: 15px;
        }
        
        .newsletter-form {
            display: flex;
            gap: 10px;
            margin-bottom: 15px;
        }
        
        .newsletter-form input {
            flex: 1;
            padding: 12px 16px;
            border: 1px solid rgba(255,255,255,0.1);
            background: rgba(255,255,255,0.05);
            color: white;
            border-radius: 8px;
            font-size: 14px;
        }
        
        .newsletter-form button {
            padding: 12px 16px;
            background: #204647;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: background 0.3s;
        }
        
        .newsletter-form button:hover {
            background: #163435;
        }
        
        @media (max-width: 768px) {
            .footer-content {
                grid-template-columns: 1fr 1fr !important;
                gap: 30px !important;
            }
            
            .social-links {
                margin-top: 15px;
            }
        }
    </style>

    <script src="script.js"></script>
    <script>
        // Newsletter form handling
        document.getElementById('newsletterForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            const message = document.getElementById('newsletterMessage');
            
            // Show loading state
            const button = this.querySelector('button');
            const originalContent = button.innerHTML;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            button.disabled = true;
            
            // Simulate newsletter subscription
            setTimeout(() => {
                message.style.display = 'block';
                message.style.color = '#28a745';
                message.textContent = 'Thank you for subscribing!';
                button.innerHTML = originalContent;
                button.disabled = false;
                this.reset();
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    message.style.display = 'none';
                }, 5000);
            }, 1000);
        });
    </script>
</body>
</html>
