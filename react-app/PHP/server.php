<?php
header("Access-Control-Allow-Origin: *");

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
