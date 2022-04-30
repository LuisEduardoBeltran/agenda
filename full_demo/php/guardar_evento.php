<?php


include('conexion.php');

$start = $_GET['start'];
$end = $_GET['end'];
$title = $_GET['title'];
$body = $_GET['body'];

$title1 = ucwords(strtolower($title));
$body1 =  ucfirst($body);

 //substraer fecha y hora 
$substraer_mes = substr($start, 4,3); 
//echo $substraer_mes;
$substraer_año = substr($start, 11,4);
$substraer_dia = substr($start, 8,2);
$substraer_hora_i = substr($start, 16,8);

 //substraer  hora fin

 $substraer_hora_f = substr($end, 16,8);

//ingles 
/*if($substraer_mes === 'Oct'){

    $mes =10;
}*/


switch ($substraer_mes){

   case "Jan":
        $mes =01;
        break;
        case "Feb":
            $mes =02;
            break;
            case "Mar":
                $mes =03;
                break;
                case "Apr":
                    $mes =04;
                    break;
                    case "May":
                        $mes =05;
                        break;
                        case "Jun":
                            $mes =06;
                            break;
                                case "Jul":
                                    $mes =07;
                                    break;
                            case "Oct":
                                $mes =10;
                                break;
                                case "Nov":
                                    $mes =11;
                                    break;
                                    case "Dec":
                                        $mes =12;
                                        break;
                                    

                                default:
                                echo "No se pudo almacenar correctamente";
                            }
                        
$fecha = $substraer_año."-".$mes."-".$substraer_dia." ";

$fecha_inicio = $fecha."".$substraer_hora_i;

$fecha_fin = $fecha."".$substraer_hora_f;




//$insertSQL = 'INSERT INTO eventos(,inicio, fin, title, body) VALUES ('.$fecha_inicio.' , '.$fecha_fin.', '.$title.','.$body.')';
$insertSQL = "INSERT INTO eventos(inicio, fin, title, body) VALUES ('$fecha_inicio' , '$fecha_fin', '$title1','$body1')";
// $result2 = $conn->query($insertSQL);
 //echo $insertSQL;

 //echo $fecha_inicio."". $fecha_fin;

 


/*if (mysqli_query($conn, $insertSQL)) {
    //  echo "<p style= font-color:'green';>Almacenado correctamente</p>";
} else {
      echo "Error: " . $insertSQL . "<br>" . mysqli_error($conn);
      printf("Errormessage: %s\n", $mysqli->error);
}*/


if (mysqli_query($conn, $insertSQL)) {
    $respuesta = "1";
    echo json_encode(["respuesta" => $respuesta ]);
  } else {
    $respuesta = "0";
    echojson_encode(["respuesta" => $respuesta ]);
  }
  


mysqli_close($conn);



//echo $substraer_mes;
//echo $start;
//echo $fecha_inicio." ";
//echo$insertSQL;

//$insertSQL = 'SELECT * FROM  eventos';
//$resultado= mysqli_query($conectar, $insertSQL);
//echo $conectar;

?>