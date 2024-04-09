<?php
include("./server.php");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

//get searchWord from search

$searchWord = [];

// Retrieve the search word from the POST data
$searchWord = $_POST['word'];

// SQL query to retrieve data
$sql = "SELECT * FROM product";

// Executing the query and storing the result
$result = mysqli_query($connect, $sql);

// Checking if the query was successful
if (mysqli_num_rows($result) > 0) {

    // Outputting the data
    while ($row = mysqli_fetch_assoc($result)) {
        $products [] = array(
          "ID" =>$row["ID"],
          "Name" =>$row["Name"],
          "Price" =>$row["Price"],
          "Description" =>$row["Description"],
          "Picture" =>$row["Picture"],
        );
    }


} else {
    echo "0 results";
}

echo json_encode($products);