<?php
session_start();
$_SESSION = array();

session_destroy(); // Destroy the active session

// Redirect back to login screen
header("Location: login.php");
exit();
?>