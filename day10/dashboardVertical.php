<div class="container-fluid">
    <div class="row">
        <!-- Sidebar Navigation (3 Columns) -->
        <div class="col-md-3 bg-light border-end" style="min-height: 80vh; padding-top: 20px;">
            <ul class="nav flex-column">
                <li class="nav-item mb-2">
                    <a href="updatePassword.php" class="btn btn-warning w-100 text-start">Update Password</a>
                </li>
                <li class="nav-item mb-2">
                    <a href="updateProfile.php" class="btn btn-secondary w-100 text-start">Update Profile</a>
                </li>
                
                <!-- 🌟 DYNAMIC ADMIN ACCESS LINK -->
                <?php if (isset($_SESSION['user_email']) && $_SESSION['user_email'] === 'mahaveer37@gmail.com'): ?>
                <li class="nav-item mb-2 mt-2">
                    <a href="adminDashboard.php" class="btn btn-dark w-100 text-start">🔒 Admin Panel</a>
                </li>
                <?php endif; ?>

                <li class="nav-item mt-4">
                    <a href="logout.php" class="btn btn-danger w-100">Logout</a>
                </li>
            </ul>
        </div>

        <!-- Main Content Area Starts (9 Columns) -->
        <div class="col-md-9" style="padding: 30px;">