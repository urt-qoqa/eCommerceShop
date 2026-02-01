<?php include '../partials/header.php'; ?>

<style>
.about-container {
    padding: 60px 0;
}

.hero-section {
    text-align: center;
    margin-bottom: 60px;
}

.hero-section h1 {
    font-size: 48px;
    margin-bottom: 20px;
    color: #1a1a1a;
}

.hero-section p {
    font-size: 20px;
    color: #666;
    max-width: 600px;
    margin: 0 auto 40px;
    line-height: 1.6;
}

.stats-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 30px;
    margin-bottom: 60px;
}

.stat-card {
    background: white;
    padding: 30px;
    border-radius: 16px;
    box-shadow: 0 8px 30px rgba(0,0,0,0.08);
    text-align: center;
    transition: transform 0.3s ease;
}

.stat-card:hover {
    transform: translateY(-5px);
}

.stat-number {
    font-size: 36px;
    font-weight: bold;
    color: #204647;
    margin-bottom: 10px;
}

.stat-label {
    color: #666;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.story-section {
    background: #f8f9fa;
    padding: 60px 40px;
    border-radius: 20px;
    margin-bottom: 60px;
    text-align: center;
}

.story-section h2 {
    font-size: 32px;
    margin-bottom: 20px;
    color: #1a1a1a;
}

.story-content {
    max-width: 700px;
    margin: 0 auto;
    line-height: 1.8;
    color: #555;
    font-size: 17px;
}

.team-section {
    margin-bottom: 60px;
}

.team-section h2 {
    text-align: center;
    font-size: 32px;
    margin-bottom: 50px;
    color: #1a1a1a;
}

.team-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 40px;
}

.team-member {
    text-align: center;
    background: white;
    padding: 40px 30px;
    border-radius: 16px;
    box-shadow: 0 8px 30px rgba(0,0,0,0.08);
    transition: transform 0.3s ease;
}

.team-member:hover {
    transform: translateY(-5px);
}

.avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
    font-size: 48px;
    color: white;
}

.team-member h3 {
    font-size: 20px;
    margin-bottom: 5px;
    color: #1a1a1a;
}

.team-role {
    color: #204647;
    font-weight: 600;
    margin-bottom: 15px;
}

.team-bio {
    color: #666;
    font-size: 14px;
    line-height: 1.5;
}

.values-section {
    background: linear-gradient(135deg, #204647 0%, #2B7CB8 100%);
    color: white;
    padding: 60px 40px;
    border-radius: 20px;
    text-align: center;
}

.values-section h2 {
    font-size: 32px;
    margin-bottom: 40px;
}

.values-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 40px;
}

.value-item {
    padding: 20px;
}

.value-icon {
    font-size: 48px;
    margin-bottom: 20px;
}

.value-item h3 {
    font-size: 18px;
    margin-bottom: 10px;
}

.value-item p {
    font-size: 14px;
    opacity: 0.9;
    line-height: 1.5;
}

@media (max-width: 768px) {
    .hero-section h1 {
        font-size: 32px;
    }
    
    .story-section,
    .values-section {
        padding: 40px 20px;
    }
}
</style>

<div class="container about-container">
    <!-- Hero Section -->
    <div class="hero-section">
        <h1>About ByteHub</h1>
        <p>Your trusted partner for cutting-edge technology and exceptional service</p>
    </div>

    <!-- Stats Section -->
    <div class="stats-container">
        <div class="stat-card">
            <div class="stat-number">5000+</div>
            <div class="stat-label">Happy Customers</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">200+</div>
            <div class="stat-label">Tech Products</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">50+</div>
            <div class="stat-label">Tech Brands</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">24/7</div>
            <div class="stat-label">Customer Support</div>
        </div>
    </div>

    <!-- Our Story Section -->
    <div class="story-section">
        <h2>Our Story</h2>
        <div class="story-content">
            <p style="margin-bottom: 20px;">
                Welcome to <strong>ByteHub</strong>, your premier destination for cutting-edge technology products. Founded in 2025 by a team of passionate tech enthusiasts, we started with a simple mission: to make the latest technology accessible to everyone.
            </p>
            <p style="margin-bottom: 20px;">
                What began as a small startup has grown into a trusted name in the tech retail industry. Our journey started when we noticed a gap in the market for quality tech products that don't break the bank. We believe that everyone deserves access to the best technology without compromise.
            </p>
            <p>
                Today, ByteHub stands at the forefront of tech innovation, offering everything from the latest laptops and smartphones to essential accessories. We carefully curate our product selection to ensure that every item meets our high standards for quality, performance, and value.
            </p>
        </div>
    </div>

    <!-- Team Section -->
    <div class="team-section">
        <h2>Meet Our Team</h2>
        <div class="team-grid">
            <div class="team-member">
                <div class="avatar">ðŸ‘¨â€ðŸ’¼</div>
                <h3>Alex Johnson</h3>
                <div class="team-role">CEO & Founder</div>
                <div class="team-bio">Tech visionary with 15+ years of experience in the technology industry, leading ByteHub's mission to democratize tech.</div>
            </div>
            <div class="team-member">
                <div class="avatar">ðŸ‘©â€ðŸ’»</div>
                <h3>Sarah Chen</h3>
                <div class="team-role">CTO</div>
                <div class="team-bio">Engineering expert ensuring our platform delivers seamless shopping experience with cutting-edge technology.</div>
            </div>
            <div class="team-member">
                <div class="avatar">ðŸ‘¨â€ðŸ”§</div>
                <h3>Michael Davis</h3>
                <div class="team-role">Product Manager</div>
                <div class="team-bio">Tech enthusiast dedicated to sourcing the best products that meet our customers' diverse needs.</div>
            </div>
            <div class="team-member">
                <div class="avatar">ðŸ‘©â€ðŸ’¼</div>
                <h3>Emma Wilson</h3>
                <div class="team-role">Customer Success Lead</div>
                <div class="team-bio">Passionate about ensuring every customer has an exceptional experience with ByteHub.</div>
            </div>
        </div>
    </div>

    <!-- Values Section -->
    <div class="values-section">
        <h2>Our Core Values</h2>
        <div class="values-grid">
            <div class="value-item">
                <div class="value-icon">ðŸŽ¯</div>
                <h3>Quality First</h3>
                <p>We never compromise on quality and only partner with trusted brands</p>
            </div>
            <div class="value-item">
                <div class="value-icon">ðŸ¤</div>
                <h3>Customer Focus</h3>
                <p>Your satisfaction is our priority and drives every decision we make</p>
            </div>
            <div class="value-item">
                <div class="value-icon">ðŸ’¡</div>
                <h3>Innovation</h3>
                <p>Always looking for ways to improve and bring you the latest tech</p>
            </div>
            <div class="value-item">
                <div class="value-icon">ðŸŒ</div>
                <h3>Sustainability</h3>
                <p>Committed to eco-friendly practices and responsible sourcing</p>
            </div>
        </div>
    </div>
</div>

<?php include '../partials/footer.php'; ?>


