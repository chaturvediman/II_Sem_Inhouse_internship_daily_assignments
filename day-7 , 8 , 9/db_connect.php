<?php
$host="localhost";
$user="root";
$password="AruMan@123";
$database="skit";

$conn = mysqli_connect($host,$user,$password,$database);

if(!$conn){
    die("connection Failed:" .
    mysqli_connect_error());
}

echo "Connection Successfull";
?>
