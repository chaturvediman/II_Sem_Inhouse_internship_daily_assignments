<?php
session_start(); // 1. Start session right away to read the logged-in email
include("db_connect.php");

$error = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize the text input fields
    $newPassword = mysqli_real_escape_string($conn, $_POST["newPassword"]);
    $confirmPassword = mysqli_real_escape_string($conn, $_POST["confirmPassword"]);
    $oldPassword = mysqli_real_escape_string($conn, $_POST["oldPassword"]);

    // Get the current user's email from session memory
    $email = $_SESSION['user_email'];

    if ($newPassword == "" || $oldPassword == "" || $confirmPassword == "") {
        $error = "All fields are required.";
        echo $error;
    } elseif ($newPassword != $confirmPassword) {
        $error = "Password does not match";
        echo $error;
    } else {
        // 2. Check if the Old Password matches what's in the database
        $selectQuery = "SELECT * FROM user WHERE email='$email' AND password='$oldPassword'";
        $result = mysqli_query($conn, $selectQuery);
        $user = mysqli_fetch_assoc($result);

        if ($user) {
            // 3. Old password is correct! Now run the UPDATE query
            $updateQuery = "UPDATE user SET password='$newPassword' WHERE email='$email'";
            
            if (mysqli_query($conn, $updateQuery)) {
                // Success! Redirect back to dashboard with a clean state
                header("Location: dashboard.php");
                exit();
            } else {
                echo "Error updating password: " . mysqli_error($conn);
            }
        } else {
            echo "Invalid current password.";
        }
    }
}
?>