<?php
// Connection parameters
$host = "localhost";
$username = "Passwordless";
$password = "Nameless";
$database = "tutorial";

// Establishing the connection
$conn = mysqli_connect($host, $username, $password, $database);

// Check if the connection was successful
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// SQL query to retrieve data
$sql = "SELECT * FROM table_name";

// Executing the query and storing the result
$result = mysqli_query($conn, $sql);

// Checking if the query was successful
if (mysqli_num_rows($result) > 0) {
    // Outputting the data
    while ($row = mysqli_fetch_assoc($result)) {
        echo "ID: " . $row["id"] . " - Name: " . $row["name"] . "";
    }
} else {
    echo "0 results";
}

// Close the connection
mysqli_close($conn);

?>