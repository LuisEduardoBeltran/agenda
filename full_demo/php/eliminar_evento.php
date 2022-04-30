<?php


include('conexion.php');

$id = $_GET['id_evento'];

 
$deleteSQL = "DELETE FROM eventos WHERE id = ".$id;
 //$result2 = $conn->query($deleteSQL);


 //echo $deleteSQL;



$respuesta = "1";
 if (mysqli_query($conn, $deleteSQL)) {
  $respuesta = "1";
  echo json_encode(["respuesta" => $respuesta ]);
} else {
  $respuesta = "0";
  echojson_encode(["respuesta" => $respuesta ]);
}


?>