<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include("./server.php");

if(empty($_POST)){
    $_POST=json_decode(file_get_contents('php://input', false),true);
}

$name = $_POST['name'];
$description = $_POST['description'];
$picture = intval($_POST['picture']);
$price = intval($_POST['price']);

$sql = "INSERT INTO `product`(`Description`, `Name`, `Price`, `Picture`) VALUES ('$description','$name','$price', '$picture')";

$result = mysqli_query($connect, $sql);

mysqli_close($connect);
?>