<?php


include('conexion.php');
$id = $_GET['id_evento'];
$start = $_GET['start'];
$end = $_GET['end'];
$title = $_GET['title'];
$body = $_GET['body'];

$title1 = ucfirst($title);
//ucwords(strtolower($title));
$body1 =  ucfirst($body);
//echo "entro al archivo";

 //substraer fecha y hora 
$substraer_mes = substr($start, 4,3); 
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
                                echo "Sabe";
                            }
                        
$fecha = $substraer_año."-".$mes."-".$substraer_dia." ";

$fecha_inicio = $fecha."".$substraer_hora_i;

$fecha_fin = $fecha."".$substraer_hora_f;



//$insertSQL = "INSERT INTO eventos(inicio, fin, title, body) VALUES ('$fecha_inicio' , '$fecha_fin', '$title','$body')";
//$insertSQL = 'INSERT INTO eventos(,inicio, fin, title, body) VALUES ('.$fecha_inicio.' , '.$fecha_fin.', '.$title.','.$body.')';
$updateSQL = "UPDATE eventos SET  inicio =  '$fecha_inicio' , fin = '$fecha_fin' , title ='$title1', body ='$body1' WHERE id =".$id;
// $result2 = $conn->query($insertSQL);



 

/*if (mysqli_query($conn, $updateSQL)) {
  //  echo "<p style= color:'green';>Almacenado correctamente</p>";
    //echo "Modificado correctamente";
} else {
      echo "Error: " .$updateSQL . "<br>" . mysqli_error($conn);
      printf("Errormessage: %s\n", $mysqli->error);
}*/

if (mysqli_query($conn, $updateSQL)) {
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