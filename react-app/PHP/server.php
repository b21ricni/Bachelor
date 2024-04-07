<?php
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

// SQL query to retrieve data
$sql = "SELECT * FROM product";

// Executing the query and storing the result
$result = mysqli_query($connect, $sql);

// Checking if the query was successful
if (mysqli_num_rows($result) > 0) {
    // Outputting the data
    while ($row = mysqli_fetch_assoc($result)) {
        echo "ID: " . $row["ID"] . " - Name: " . $row["Name"] . "
";
    }
} else {
    echo "0 results";
}

// Close the connection
mysqli_close($connect);
?>
