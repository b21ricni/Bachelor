<?php
include("./server.php");

header("Access-Control-Allow-Origin: *");

if(empty($_POST)){
  $_POST=json_decode(file_get_contents('php://input', false),true);
}

$ID = $_POST['ID'];

$query = "DELETE from cart where product_id='$ID'";
