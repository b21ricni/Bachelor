<?php
header("Access-Control-Allow-Origin: *");
include("./server.php");

// Query to fetch cart items along with product details
$sql = "SELECT * FROM product p JOIN cart c WHERE p.ID = c.product_id";

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

// Close the database connection
mysqli_close($connect);
?>