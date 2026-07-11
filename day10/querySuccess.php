<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Query Submitted Successfully</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light d-flex align-items-center justify-content-center" style="min-height: 100vh;">

    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6 text-center">
                
                <!-- Success Card Wrap Container -->
                <div class="bg-white p-5 rounded shadow-sm border border-top border-success border-4">
                    
                    <!-- Decorative Large Success Check Icon -->
                    <div class="text-success display-1 mb-4">
                        ✅
                    </div>
                    
                    <h2 class="fw-bold text-dark mb-3">Query Submitted!</h2>
                    
                    <p class="text-muted mb-4">
                        Thank you for reaching out to us. Your message has been safely recorded by our campus portal database repository system. Our administrator, <strong>Mr. Mahaveer Chaturvedi</strong>, will review your submission and respond shortly.
                    </p>
                    
                    <hr class="text-muted my-4">
                    
                    <!-- Dynamic Navigation Back Home Button -->
                    <?php if (file_exists("index.php")): ?>
                        <a href="index.php" class="btn btn-success btn-lg px-5">🏠 Return to Home Page</a>
                    <?php else: ?>
                        <a href="home.php" class="btn btn-success btn-lg px-5">🏠 Return to Home Page</a>
                    <?php endif; ?>
                    
                </div>
                
                <p class="small text-muted mt-3">&copy; 2026 Institutional School Web Portal. All Rights Reserved.</p>
            </div>
        </div>
    </div>

    <!-- Bootstrap Bundle JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>