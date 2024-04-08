<?php

include("./server.php");

// If failed adding product
if(isset($_POST["product"])){
  echo "could not add product";
}

else {
  $product = $_POST["product"];

  $query = "INSERT into bachelor (product) values("$product")";
  $result = mysqli_query($connection, $query);
}
