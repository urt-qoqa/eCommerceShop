<?php
require_once 'models/News.php';

if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
    http_response_code(404);
    echo '<p>News not found.</p>';
    exit;
}

$newsModel = new News();
$news = $newsModel->getById($_GET['id']);

if (!$news || $news['status'] !== 'published') {
    http_response_code(404);
    echo '<p>News not found.</p>';
    exit;
}

?>
<div style="text-align: left;">
    <?php if($news['image_url']): ?>
    <img src="<?php echo htmlspecialchars($news['image_url']); ?>" alt="<?php echo htmlspecialchars($news['title']); ?>" style="width: 100%; max-height: 400px; object-fit: cover; border-radius: 8px; margin-bottom: 20px;">
    <?php endif; ?>
    
    <h1 style="color: #1a1a1a; margin-bottom: 15px; font-size: 28px;"><?php echo htmlspecialchars($news['title']); ?></h1>
    
    <div style="display: flex; gap: 20px; margin-bottom: 25px; font-size: 14px; color: #666;">
        <?php if($news['author_name']): ?>
        <div>ðŸ‘¤ <strong>Author:</strong> <?php echo htmlspecialchars($news['author_name']); ?></div>
        <?php endif; ?>
        <div>ðŸ“… <strong>Published:</strong> <?php echo date('F j, Y', strtotime($news['created_at'])); ?></div>
    </div>
    
    <div style="line-height: 1.8; color: #333; font-size: 16px;">
        <?php echo nl2br(htmlspecialchars($news['content'])); ?>
    </div>
    
    <div style="margin-top: 30px; text-align: center;">
        <button onclick="this.closest('.fixed').parentElement.remove()" style="background: #204647; color: white; border: none; padding: 12px 24px; border-radius: 6px; cursor: pointer; font-size: 14px;">Close</button>
    </div>
</div>

