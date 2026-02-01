<?php
require_once 'models/News.php';
$newsModel = new News();
$newsList = $newsModel->getAllPublished();

include '../partials/header.php';
?>

<style>
.news-container {
    padding: 40px 0;
}

.news-header {
    text-align: center;
    margin-bottom: 50px;
}

.news-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 30px;
}

.news-card {
    background: white;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 8px 30px rgba(0,0,0,0.08);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.news-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0,0,0,0.12);
}

.news-image {
    height: 220px;
    overflow: hidden;
    position: relative;
}

.news-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.news-card:hover .news-image img {
    transform: scale(1.05);
}

.news-content {
    padding: 25px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
}

.news-meta {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 15px;
    font-size: 13px;
    color: #666;
}

.news-author {
    display: flex;
    align-items: center;
    gap: 6px;
}

.news-date {
    color: #999;
}

.news-title {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 12px;
    line-height: 1.3;
    color: #1a1a1a;
}

.news-excerpt {
    color: #666;
    line-height: 1.6;
    margin-bottom: 20px;
    flex-grow: 1;
}

.read-more {
    color: #204647;
    font-weight: 600;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    transition: gap 0.3s ease;
}

.read-more:hover {
    gap: 10px;
}

.no-news {
    text-align: center;
    padding: 80px 20px;
}

.no-news-icon {
    font-size: 64px;
    color: #ddd;
    margin-bottom: 20px;
}
</style>

<div class="container news-container">
    <div class="news-header">
        <h1 class="section-title" style="margin-bottom: 15px;">Latest News & Updates</h1>
        <p class="section-subtitle">Stay informed with the latest tech news and company updates</p>
    </div>
    
    <?php if(empty($newsList)): ?>
        <div class="no-news">
            <div class="no-news-icon">ðŸ“°</div>
            <h3 style="color: #666; margin-bottom: 10px;">No news yet</h3>
            <p style="color: #999;">We're working on bringing you the latest updates. Check back soon!</p>
        </div>
    <?php else: ?>
        <div class="news-grid">
            <?php foreach($newsList as $news): ?>
            <div class="news-card">
                <?php if($news['image_url']): ?>
                <div class="news-image">
                    <img src="<?php echo htmlspecialchars($news['image_url']); ?>" alt="<?php echo htmlspecialchars($news['title']); ?>">
                </div>
                <?php else: ?>
                <div class="news-image" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center;">
                    <div style="color: white; font-size: 48px;">ðŸ“°</div>
                </div>
                <?php endif; ?>
                
                <div class="news-content">
                    <div class="news-meta">
                        <?php if($news['author_name']): ?>
                        <div class="news-author">
                            <span>ðŸ‘¤</span>
                            <span><?php echo htmlspecialchars($news['author_name']); ?></span>
                        </div>
                        <?php endif; ?>
                        <div class="news-date">
                            <span>ðŸ“…</span>
                            <span><?php echo date('M j, Y', strtotime($news['created_at'])); ?></span>
                        </div>
                    </div>
                    
                    <h3 class="news-title"><?php echo htmlspecialchars($news['title']); ?></h3>
                    
                    <div class="news-excerpt">
                        <?php 
                        $excerpt = $news['excerpt'] ? $news['excerpt'] : substr($news['content'], 0, 150);
                        echo htmlspecialchars($excerpt . (strlen($excerpt) >= 150 ? '...' : '')); 
                        ?>
                    </div>
                    
                    <a href="#" class="read-more" onclick="showNewsDetail(<?php echo $news['id']; ?>); return false;">
                        Read More <span>â†’</span>
                    </a>
                </div>
            </div>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>
</div>

<script>
function showNewsDetail(newsId) {
    // Simple modal for news detail
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        padding: 20px;
    `;
    
    const content = document.createElement('div');
    content.style.cssText = `
        background: white;
        max-width: 700px;
        max-height: 80vh;
        overflow-y: auto;
        border-radius: 16px;
        padding: 30px;
        position: relative;
    `;
    
    content.innerHTML = '<p style="text-align: center;">Loading news details...</p>';
    
    // Load news content via AJAX
    fetch(`news_detail.php?id=${newsId}`)
        .then(response => response.text())
        .then(html => {
            content.innerHTML = html;
        })
        .catch(() => {
            content.innerHTML = '<p style="color: red;">Error loading news. Please try again.</p>';
        });
    
    modal.appendChild(content);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
    
    document.body.appendChild(modal);
}
</script>

<?php include '../partials/footer.php'; ?>


