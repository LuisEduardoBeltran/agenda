<?php
include('conexion.php');

$ids = json_decode($_POST['arreglo']);


// echo '<pre>'; print_r($ids); echo '</pre>';

$comma_separated = implode(", ", $ids);

// echo $comma_separated;

$deleteSQL = "DELETE FROM `lista` WHERE id in( ". $comma_separated . ")";
 //$result2 = $conn->query($deleteSQL);


 //echo $deleteSQL;



 $respuesta = "1";
  if (mysqli_query($conn, $deleteSQL)) {
   $respuesta = "1";
   echo json_encode(["respuesta" => $respuesta, "ids"=>$comma_separated  ]);
 } else {
   $respuesta = "0";
   echojson_encode(["respuesta" => $respuesta, "ids"=>$comma_separated ]);
 }


?>
