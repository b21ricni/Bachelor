<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
include("./server.php");

if(empty($_POST)){
  $_POST=json_decode(file_get_contents('php://input', false),true);
}

$ID = intval($_POST['ID']);

die ($ID);

$sql = "DELETE FROM cart WHERE product_id = '$ID'";

$result = mysqli_query($connect, $sql);

if ($result) {
  echo json_encode(["success" => true, "message" => "Product deleted successfully"]);
} else {
  echo json_encode(["success" => false, "message" => "Error deleting product"]);
}