<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home - Our School Portal</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        .hero-section {
            background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80') no-repeat center center/cover;
            color: white;
            padding: 100px 0;
        }
    </style>
</head>
<body class="bg-light">

    <!-- 1. Include Global School Header/Navbar -->
    <?php include("header.php"); ?>

    <!-- 2. Hero Section (Banner) -->
    <div class="hero-section text-center">
        <div class="container">
            <h1 class="display-4 fw-bold mb-3">Welcome to Our School</h1>
            <p class="lead mb-4">Empowering minds, shaping characters, and building futures since 1995.</p>
            <?php if (isset($_SESSION['user_name'])): ?>
                <a href="dashboard.php" class="btn btn-warning btn-lg">Go to Student Dashboard</a>
            <?php else: ?>
                <a href="login.php" class="btn btn-primary btn-lg me-2">Portal Login</a>
                <a href="registration.php" class="btn btn-outline-light btn-lg">Admission Registration</a>
            <?php endif; ?>
        </div>
    </div>

    <!-- 3. Welcome & Notice Board Grid -->
    <div class="container my-5">
        <div class="row g-4">
            
            <!-- Left Side: Desk Message -->
            <div class="col-md-8">
                <div class="bg-white p-4 rounded shadow-sm border-top border-primary border-4 h-100">
                    <h3 class="fw-bold text-dark mb-3">From the Principal's Desk</h3>
                    <p class="text-muted">
                        Welcome to our institutional portal. We take immense pride in our academic standards and co-curricular milestones. In partnership with our exceptional teaching faculty and state-of-the-art campus facilities, we prepare pupils to tackle modern global paradigms with confidence and ethical discipline.
                    </p>
                    <p class="text-muted">
                        Explore our portal features to check dynamic dashboard services, update profiles, or review registration streams seamlessly.
                    </p>
                    <a href="about.php" class="btn btn-outline-primary mt-2">Read More About Us</a>
                </div>
            </div>

            <!-- Right Side: Notice Board & Quick Links -->
            <div class="col-md-4">
                <div class="bg-white p-4 rounded shadow-sm border h-100">
                    <h4 class="fw-bold text-danger mb-3">📢 Latest Notices</h4>
                    <div class="list-group list-group-flush">
                        <div class="list-group-item px-0">
                            <span class="badge bg-secondary mb-1">July 10, 2026</span>
                            <p class="mb-0 small fw-bold">First Term Mid-Examinations Schedule Released</p>
                        </div>
                        <div class="list-group-item px-0">
                            <span class="badge bg-secondary mb-1">July 05, 2026</span>
                            <p class="mb-0 small">Registration portals open for new technical elective tracks.</p>
                        </div>
                        <div class="list-group-item px-0">
                            <span class="badge bg-secondary mb-1">June 28, 2026</span>
                            <p class="mb-0 small">Annual Sports Meet registration forms available online.</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <!-- 4. Global Footer Include -->
    <?php 
    if(file_exists("footer.php")) {
        include("footer.php"); 
    } else {
        echo '<footer class="text-center py-4 bg-dark text-white"><p class="mb-0">&copy; 2026 Institutional School Web Portal.</p></footer>';
    }
    ?>

    <!-- Bootstrap Bundle JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>