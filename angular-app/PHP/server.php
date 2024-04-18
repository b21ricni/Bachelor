<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Parameters
$host = "localhost";
$username = "root";
$password = "";
$database = "bachelor";

// Establishing connection to db 
$connect = mysqli_connect($host, $username, $password, $database);

// Check if connection failed
if (!$connect) {
  die("Connection failed: " . mysqli_connect_error());
}
?>
