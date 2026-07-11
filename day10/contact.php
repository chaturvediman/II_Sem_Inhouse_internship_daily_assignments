<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Us - Our School Portal</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">

    <!-- 1. Include Global School Header/Navbar -->
    <?php include("header.php"); ?>

    <!-- 2. Main Contact Container -->
    <div class="container my-5">
        <div class="row mb-4 text-center">
            <div class="col-12">
                <span class="text-uppercase text-primary fw-bold">Get In Touch</span>
                <h2 class="fw-bold text-dark mt-2">Contact Administration</h2>
                <hr class="mx-auto bg-primary" style="width: 60px; height: 3px;">
            </div>
        </div>
         <form action="querySuccess.php" method="POST">
        <div class="row g-4">
            
            <!-- Left Side: Official Contact Details Cards -->
            <div class="col-md-5">
                <div class="bg-white p-4 rounded shadow-sm border h-100">
                    <h4 class="fw-bold text-dark mb-4">Administrative Info</h4>
                    
                    <!-- Administration Contact Card -->
                    <div class="d-flex mb-4 align-items-start">
                        <div class="bg-primary text-white rounded p-3 me-3 d-flex align-items-center justify-content-center" style="width: 50px; height: 50px;">
                            👤
                        </div>
                        <div>
                            <h6 class="fw-bold mb-1 text-muted">School Administration / Owner</h6>
                            <p class="mb-0 text-dark fw-bold fs-5">Mr. Mahaveer Chaturvedi</p>
                        </div>
                    </div>

                    <!-- Email Contact Card -->
                    <div class="d-flex mb-4 align-items-start">
                        <div class="bg-primary text-white rounded p-3 me-3 d-flex align-items-center justify-content-center" style="width: 50px; height: 50px;">
                            ✉️
                        </div>
                        <div>
                            <h6 class="fw-bold mb-1 text-muted">Official Email Address</h6>
                            <p class="mb-0"><a href="mailto:mahaveer37@gmail.com" class="text-primary fw-bold text-decoration-none">mahaveer37@gmail.com</a></p>
                        </div>
                    </div>

                    <!-- Location Card -->
                    <div class="d-flex align-items-start">
                        <div class="bg-primary text-white rounded p-3 me-3 d-flex align-items-center justify-content-center" style="width: 50px; height: 50px;">
                            📍
                        </div>
                        <div>
                            <h6 class="fw-bold mb-1 text-muted">Campus Address</h6>
                            <p class="mb-0 text-muted small">Shree Sardar Singh Madhyamik Vidhyalya,Anwa,Teh.Dooni,dist.Tonk,
                                RAJASTHAN, India</p>
                        </div>
                    </div>

                </div>
            </div>

            <!-- Right Side: Contact/Query Form -->
            <div class="col-md-7">
                <div class="bg-white p-4 rounded shadow-sm border h-100">
                    <h4 class="fw-bold text-dark mb-3">Send Us a Message</h4>
                    <p class="text-muted small mb-4">Have questions regarding admissions, portal access, or general queries? Drop a message below.</p>
                    
                    <form action="#" method="POST">
                        <div class="row g-3">
                            <div class="col-sm-6">
                                <label class="form-label small fw-bold">Your Name</label>
                                <input type="text" class="form-control" placeholder="Enter Full Name" required>
                            </div>
                            <div class="col-sm-6">
                                <label class="form-label small fw-bold">Email Address</label>
                                <input type="email" class="form-control" placeholder="name@example.com" required>
                            </div>
                            <div class="col-12">
                                <label class="form-label small fw-bold">Subject</label>
                                <input type="text" class="form-control" placeholder="Query Topic" required>
                            </div>
                            <div class="col-12">
                                <label class="form-label small fw-bold">Message Description</label>
                                <textarea class="form-control" rows="4" placeholder="Type your query details here..." ></textarea>
                            </div>
                            <div class="col-12">
                                <button type="submit" class="btn btn-primary px-4 mt-2">Submit Query</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    </div>

    <!-- 3. Global Footer Include -->
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