<?php

include('conexion.php');

$nombre_articulo = $_GET['nombre_articulo'];

//$end = $_GET['end'];
//$title = $_GET['title'];
//$body = $_GET['body'];

//$title1 = ucwords(strtolower($title));
//$body1 =  ucfirst($body);

 //substraer fecha y hora 
//$substraer_mes = substr($start, 4,3); 
//echo $substraer_mes;
//$substraer_año = substr($start, 11,4);
//$substraer_dia = substr($start, 8,2);
//$substraer_hora_i = substr($start, 16,8);

 //substraer  hora fin

 //$substraer_hora_f = substr($end, 16,8);

//ingles 
/*if($substraer_mes === 'Oct'){

    $mes =10;
}*/



$insertSQL = "INSERT INTO lista(nombre) VALUES ('$nombre_articulo')";
// $result2 = $conn->query($insertSQL);





if (mysqli_query($conn, $insertSQL)) {
    $respuesta = "1";
    echo json_encode(["respuesta" => $respuesta ]);
  } else {
    $respuesta = "0";
    echojson_encode(["respuesta" => $respuesta ]);
  }
  


mysqli_close($conn);



?>