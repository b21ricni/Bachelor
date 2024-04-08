<?php
include("./server.php");

header("Access-Control-Allow-Origin: *");

// SQL query to retrieve data
$sql = "SELECT * FROM product";

// Executing the query and storing the result
$result = mysqli_query($connect, $sql);

// Checking if the query was successful
if (mysqli_num_rows($result) > 0) {
    // Outputting the data
    while ($row = mysqli_fetch_assoc($result)) {
        $products [] = array(
          "ID" =>["ID"],
          "Name" =>["Name"],
          "Price" =>["Price"],
          "Description" =>["Description"],
          "Picture" =>["Picture"],
        );
    }

    
} else {
    echo "0 results";
}

echo json_encode($products);
