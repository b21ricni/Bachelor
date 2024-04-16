<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include("./server.php");

if(empty($_POST)){
    $_POST=json_decode(file_get_contents('php://input', false),true);
}

$searchWord = $_POST['searchWord'];

// SQL query to retrieve data
// In production code should use prepered statements, this is unsafe
$sql = "SELECT * FROM product WHERE Name LIKE '%$searchWord%'";

// Executing the query and storing the result
$result = mysqli_query($connect, $sql);

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

mysqli_close($connect);
?>