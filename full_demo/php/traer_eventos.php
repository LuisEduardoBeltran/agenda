<?php
include('conexion.php');

$sql = "SELECT * FROM eventos";
$result = mysqli_query($conn, $sql);

/*
if ($result->num_rows > 0) {

  // output data of each row
  while($row = $result->fetch_assoc()) {
    $substraer_hora = substr($row['inicio'], 10,3); 
    $substraer_min = substr($row['fin'], 13,3); 
    echo $substraer_hora."|";
    // echo $substraer_min;
    // echo $row['title'];
    //echo $row['body']."|</br>";
  }
} else {
  echo "0 results";
}
*/

// $sth = mysqli_query($conn, $sql);
// $rows = array();
// while($r = mysqli_fetch_assoc($sth)) {
//     $rows[] = $r;
// }
// echo json_encode($rows);

$result = mysqli_query($conn, $sql) or die("Error in Selecting " . mysqli_error($connection));

//create an array
$emparray = array();
while($row =mysqli_fetch_assoc($result))
{
    //$emparray[] = $row;
    //$emparray[] = array('id' => $row['id'], 'start' => $row['inicio'], 'end' => $row['fin'], 'title' => 'chinguinuevo');
    //$emparray[] = array('id' => (int)$row['id'], 'start' => date("Y-m-d H:i", strtotime($row['inicio'])) , 'end' => date("Y-m-d H:i", strtotime($row['fin'])), 'title' => $row['title']);
    $emparray[] = array('id' => (int)$row['id'], 'start' => date("Y-m-d H:i", strtotime($row['inicio'])) , 'end' => date("Y-m-d H:i", strtotime($row['fin'])), 'title' => $row['title'],'body' => $row['body']);
}
header('Content-type:application/json;charset=utf-8');
echo json_encode($emparray);


// $cities = [];

// while ($row = $res->fetchArray()) {
//     $cities[] = $row;
// }

// header('Content-type:application/json;charset=utf-8');
// echo json_encode(['cities' => $cities]);




?>