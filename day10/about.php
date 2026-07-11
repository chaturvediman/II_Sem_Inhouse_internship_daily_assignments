<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About Us - Our School</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">

    <!-- 1. Institutional Top Navbar Header -->
    <?php include("header.php"); ?>

    <!-- 2. Main About Section -->
    <div class="container my-5">
        
        <!-- School Introduction Header Row -->
        <div class="row mb-5 text-center">
            <div class="col-12">
                <span class="text-uppercase text-primary fw-bold tracking-wider">Welcome to Our Institution</span>
                <h2 class="fw-bold text-dark mt-2">Nurturing Excellence, Inspiring Futures</h2>
                <hr class="mx-auto bg-primary" style="width: 60px; height: 3px;">
            </div>
        </div>

        <div class="row align-items-center mb-5">
            <!-- Left Side: School Profile Description -->
            <div class="col-md-7 mb-4 mb-md-0">
                <h4 class="fw-bold text-dark mb-3">Our Legacy & History</h4>
                <p class="text-muted leading-relaxed">
                    Founded with a vision to deliver comprehensive education, our institution stands as a pillar of academic excellence and character building. We believe in providing a holistic learning environment where innovation meets tradition, empowering students to succeed in a global ecosystem.
                </p>
                <p class="text-muted">
                    Equipped with state-of-the-art computational infrastructures, scientific laboratories, and digital academic environments, we ensure our curriculum equips pupils with both foundational discipline and modern technological skillsets.
                </p>
                <div class="row mt-4">
                    <div class="col-sm-6 mb-3">
                        <h5 class="fw-bold text-primary mb-1">Our Mission</h5>
                        <p class="small text-muted">To foster intellectual growth, technical discipline, and ethical values in every student.</p>
                    </div>
                    <div class="col-sm-6 mb-3">
                        <h5 class="fw-bold text-primary mb-1">Our Vision</h5>
                        <p class="small text-muted">To lead as a benchmark academy producing future global innovators and leaders.</p>
                    </div>
                </div>
            </div>

            <!-- Right Side: Quick Highlights Info Card -->
            <div class="col-md-5">
                <div class="bg-white p-4 rounded shadow-sm border border-top border-primary border-4">
                    <h5 class="text-dark fw-bold mb-3 text-center">Campus Highlights</h5>
                    <ul class="list-unstyled mb-0">
                        <li class="p-2 border-bottom text-muted">🏫 Experienced & Certified Faculty</li>
                        <li class="p-2 border-bottom text-muted">🔬 Advanced Science & Tech Labs</li>
                        <li class="p-2 border-bottom text-muted">📚 Modern Digital Library System</li>
                        <li class="p-2 border-bottom text-muted">🏆 Sports & Co-Curricular Excellence</li>
                        <li class="p-2 text-muted">💻 Secure Integrated Portal Access</li>
                    </ul>
                </div>
            </div>
        </div>

    </div>

    <!-- 3. Standard Footer Layout Template Include -->
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