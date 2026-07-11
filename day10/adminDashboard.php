<?php
session_start();
include("db_connect.php");

// 1. Security Gate: Only allow access if the logged-in user is an admin
// (Assuming your admin logs in with the official email you provided)
if (!isset($_SESSION['user_email']) || $_SESSION['user_email'] !== 'mahaveer37@gmail.com') {
    echo "<div class='container mt-5'><div class='alert alert-danger'>Access Denied. Only the administrator (Mr. Mahaveer Chaturvedi) can view this page.</div></div>";
    echo "<div class='text-center'><a href='login.php' class='btn btn-primary'>Go to Login</a></div>";
    exit();
}

include("headerDashboard.php");
?>

<div class="container my-5">
    <div class="row mb-4">
        <div class="col-md-8">
            <h2 class="fw-bold text-dark">System Administration Panel</h2>
            <p class="text-muted">Logged in as System Owner: <strong>Mr. Mahaveer Chaturvedi</strong></p>
        </div>
        <div class="col-md-4 text-md-end align-self-center">
            <a href="logout.php" class="btn btn-danger">Secure Logout</a>
        </div>
    </div>

    <!-- 2. Fetch all users from the database -->
    <?php
    $query = "SELECT id, name, email FROM user ORDER BY id DESC";
    $result = mysqli_query($conn, $query);

    if ($result && mysqli_num_rows($result) > 0):
    ?>
        <div class="card shadow-sm border-0">
            <div class="card-header bg-primary text-white py-3">
                <h5 class="mb-0 fw-bold">📋 Registered Users Database (Total: <?php echo mysqli_num_rows($result); ?>)</h5>
            </div>
            <div class="table-responsive">
                <table class="table table-hover table-striped align-middle mb-0">
                    <thead class="table-dark">
                        <tr>
                            <th scope="col" class="ps-3">User ID</th>
                            <th scope="col">Full Name</th>
                            <th scope="col">Registered Email Address</th>
                            <th scope="col" class="text-center">Account Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php while ($row = mysqli_fetch_assoc($result)): ?>
                            <tr>
                                <td class="fw-bold ps-3 text-secondary">#<?php echo $row['id']; ?></td>
                                <td><?php echo htmlspecialchars($row['name']); ?></td>
                                <td><code class="text-primary"><?php echo htmlspecialchars($row['email']); ?></code></td>
                                <td class="text-center">
                                    <span class="badge bg-success px-2 py-2">Active Student</span>
                                </td>
                            </tr>
                        <?php endwhile; ?>
                    </tbody>
                </table>
            </div>
        </div>
    <?php else: ?>
        <div class="alert alert-warning shadow-sm">No registered user profiles found inside the system repository database.</div>
    <?php endif; ?>
</div>

<?php
include("footerDashboard.php");
?>