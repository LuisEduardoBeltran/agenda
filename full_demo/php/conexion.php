
<?php

/*
$conectar = mysqli_connect('localhost','root','root1987',8080);
	//seleccionar la base de datos para trabajar
  mysqli_select_db('agenda',$conectar);

    echo "entro";

 $sql = "SELECT * FROM eventos";
//$resultado = mysql_query($sql, $conectar);
//echo $resultado;

*/

$servername = "localhost";
$database = "agenda";
$username = "root";
$password = "root1987";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
die("Connection failed: " . $conn->connect_error);
}

//echo "Connected successfully xxxxxxxx";




?>
