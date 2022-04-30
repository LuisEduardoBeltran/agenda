 

<?php
include('php/conexion.php');
?>
<html>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN""http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<head>
<link rel="shortcut icon" href="images/hello_rosa_fav.png">
	<link rel='stylesheet' type='text/css' href='reset.css' />
    <!--
	<link rel='stylesheet' type='text/css' href='http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/start/jquery-ui.css' />
	-->

    <link rel='stylesheet' type='text/css' href='../libs/css/smoothness/jquery-ui-1.8rc3.custom.css' />


	<link rel='stylesheet' type='text/css' href='../jquery.weekcalendar.css' />
	
	<link rel='stylesheet' type='text/css' href='demo.css' />


	<script type='text/javascript' src='http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js'></script>
	<script>
		var Jquery141 = jQuery.noConflict();
function cargarArticulos(){
alert("entro");
	//var Jquery351 = jQuery.noConflict(); 
	var URL= 'php/cargar_articulos.php';
		
		 // Jquery351.post(URL,function (data){
              var arreglo = Respuesta.split('|');
             //  var dataJson = JSON.parse(data);
		  //('#lista_art').html(arreglo[0]);
}

  function eliminarArticulo(){

	var Jquery351 = jQuery.noConflict(); 

	var ids = [];
	Jquery351(".toedit").each(function () {
		if (Jquery351(this).is(":checked")) {
			ids.push(Jquery351(this).val());
		}
	});
	var myJSONText = JSON.stringify( ids );
	console.log(myJSONText);
	//console.log(ids);
	//var URL= 'php/eliminar_articulo.php?id_articulo='+ Jquery141('#articulo_check').val();
	
	//alert(id);

	Jquery351.ajax({
                url: 'php/eliminar_articulo.php',
                type: 'post',
                data: { arreglo : myJSONText },
                success: function(response){
					//console.log("entro");
                    //alert(response);
                    var dataJson = JSON.parse(response);
			   
                // Jquery141('#mensaje').html(arreglo[0]);

                  if(dataJson.respuesta == "1"){
                     toastr.options = {
                        "closeButton": true,
                        "debug": false,
                        "newestOnTop": true,
                        "progressBar": true,
                        "positionClass": "toast-top-right",
                        "preventDuplicates": false,
                        "onclick": null,
                        "showDuration": "300",
                        "hideDuration": "1000",
                        "timeOut": "5000",
                        "extendedTimeOut": "1000",
                        "showEasing": "swing",
                        "hideEasing": "linear",
                        "showMethod": "fadeIn",
                        "hideMethod": "fadeOut"
                  }
               toastr["success"]("&nbsp;&nbsp;&nbsp;Evento guardado con exito...");
			   var emp_ids = dataJson.ids.split(",");
					for (var i=0; i <= emp_ids.length; i++ ) {						
						Jquery351("#"+emp_ids[i]).remove();
					}
               }
               if(dataJson.respuesta == "0"){
                  toastr["error"]("&nbsp;&nbsp;&nbsp;No se pudo guardar...");
               }
                }
            });


}
		function guardarArticulo(){
  //alert("entro");

  if( Jquery141('#nombre_articulo').val()!==""){
			var Jquery351 = jQuery.noConflict(); 
		   var URL= 'php/guardar_articulo.php?nombre_articulo='+ Jquery141('#nombre_articulo').val();
		  // alert(URL);

		   Jquery351.post(URL,function (data){
            //  var arreglo = Respuesta.split('|');
               var dataJson = JSON.parse(data);
			   
                // Jquery141('#mensaje').html(arreglo[0]);

                  if(dataJson.respuesta == "1"){
                     toastr.options = {
                        "closeButton": true,
                        "debug": false,
                        "newestOnTop": true,
                        "progressBar": true,
                        "positionClass": "toast-top-right",
                        "preventDuplicates": false,
                        "onclick": null,
                        "showDuration": "300",
                        "hideDuration": "1000",
                        "timeOut": "5000",
                        "extendedTimeOut": "1000",
                        "showEasing": "swing",
                        "hideEasing": "linear",
                        "showMethod": "fadeIn",
                        "hideMethod": "fadeOut"
                  }
               toastr["success"]("&nbsp;&nbsp;&nbsp;Evento guardado con exito...");
			 //  cargarArticulos();
			   
               }
               if(dataJson.respuesta == "0"){
                  toastr["error"]("&nbsp;&nbsp;&nbsp;No se pudo guardar...");
               }
                     
                  });

				}else	{ 
				
					toastr["error"]("&nbsp;&nbsp;&nbsp;Campo vasio...");
				}

				
	   }

	</script>

    <script type='text/javascript' src='../libs/jquery-ui-1.8rc3.custom.min.js'></script>
	<script type='text/javascript' src='../jquery.weekcalendar.js'></script>
	<script type='text/javascript' src='demo2.js'></script>

  <!--	<script src="../libs/jquery-1.7.2.min.js">
			function guardarArticulo(){
				
				var URL= 'php/guardar_articulo.php?nombre_articulo='+ ('#nombre_articulo').val();
                alert(URL);
			}

	</script>	-->

<script src="../libs/jquery-3.5.1.min.js"></script>
	<script>
		var Jquery351 = jQuery.noConflict();
		Jquery351(document).ready(function(){
            Jquery351("#chingui").click(function() {
                toastr.options = {
                    "closeButton": true,
                    "debug": false,
                    "newestOnTop": true,
                    "progressBar": true,
                    "positionClass": "toast-top-right",
                    "preventDuplicates": false,
                    "onclick": null,
                    "showDuration": "300",
                    "hideDuration": "1000",
                    "timeOut": "5000",
                    "extendedTimeOut": "1000",
                    "showEasing": "swing",
                    "hideEasing": "linear",
                    "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                }
                toastr["error"]("&nbsp;&nbsp;&nbsp;Datos guardados con exito...");
            });
        });



	</script>


	<link href="../libs/css/toastr.css" rel="stylesheet"/>
    <script src="../libs/toastr.js"></script>


</head>
<body> 
	<!--<h1>Karen (full demo)</h1>-->
	<!--<img src="images/hello_kitty_large.jpeg" style="padding: 0px;">-->
	<!--<img id="image" src="https://cdn11.bigcommerce.com/s-gi79a9kyts/images/stencil/original/carousel/27/sanrio_banner_1.jpg?c=2" alt="Hello Kitty and friends."/>-->
	<!--
		
		<div id="about_button_container">-->

		
	<!--IMAGEN CABECERA
	</div>-->
	<img src="images/kitty5.jpg" style="padding:0px; height: 100px; margin-bottom: 0px; float:left;">

	<div id="mensaje"></div>
	<button type="button" id="about_button" style="float:right; padding:0px; margin-top:14px;"> <img src="images/icono_lista.png" width="50px"></button>
	<div id='calendar'></div>
	<button type="button" id ="chingui" style="float:right; padding:0px; margin-top:14px;"> <img src="images/icono_rec.png" width="50px" >ejemplo</button>


	<div id="event_edit_container">
		<form>
			<input type="hidden" />
			<ul>
				<li>
					<span>Fecha: </span><span class="date_holder"></span> 
				</li>
				<li>
					<label for="start">Tiempo Inicio: </label><select id="hora_inicio" name="start"><option value="">Tiempo Inicio</option></select>
				</li>
				<li>
					<label for="end">Tiempo Fin: </label><select id ="hora_fin" name="end"><option value="">Tiempo fin</option></select>
				</li>
				<li>
					<label for="title">Titulo: </label><input id="titulo" type="text" name="title" autocomplete="on" />
				</li>
				<li>
					<label for="body">Asunto: </label><textarea name="body" id ="cuerpo"></textarea>
				</li>
			</ul>
		</form>
	</div>
	<div id="about">
		<h3>Nuevo Artículo</h3>	
		<ul class="formatted">
		

<table class="tb_lista_articulos" style="padding:5px;" >
<tr>
  <td><label for="lbl_articulo" style="padding:5px;"> Nombre </label></td>
  <td><input id="nombre_articulo" type="text" style="padding:3px;" /></td>
  <td style="padding:5px;><button id="about_button" onClick="guardarArticulo()" ><img src="images/icon_guardar.png" width="50px"></button></td>
</tr>
</table>

				
							
	</table>
		
				</br>	
				</br>	
			
	<style>
.datagrid table { border-collapse: collapse; text-align: left; width: 100%; }
 .datagrid {font: normal 10px/100% Geneva, Arial, Helvetica, sans-serif;
	 background: #fff; overflow: hidden; -webkit-border-radius: 3px;
	  -moz-border-radius: 3px; border-radius: 3px; }.datagrid table td,
	   .datagrid table th { padding: 8px 10px; }
	   .datagrid table 
	   thead th {background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #E8C1ED), color-stop(1, #E8C1ED) );
		background:-moz-linear-gradient( center top, #652299 5%, #4D1A75 100% );
		filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#E8C1ED', endColorstr='#E8C1ED');
		background-color:#E8C1ED; color:#FFFFFF; font-size: 15px; font-weight: bold; border-left: 0px solid #714399; }
		 .datagrid table thead th:first-child { border: none; }.datagrid table tbody td { color: #4D1A75; font-size: 15px;
			border-bottom: 2px solid #E8C1ED;font-weight: normal; }.datagrid table tbody .alt td { background: #E8C1ED; color: #4D1A75; }
			.datagrid table tbody td:first-child { border-left: none; }.datagrid table tbody tr:last-child td { border-bottom: none; }.datagrid table tfoot td div { border-top: 1px solid #E4FF5C;background: #F4E3FF;} .datagrid table tfoot td { padding: 0; font-size: 10px } .datagrid table tfoot td div{ padding: 9px; }.datagrid table tfoot td ul { margin: 0; padding:0; list-style: none; text-align: right; }.datagrid table tfoot  li { display: inline; }.datagrid table tfoot li a { text-decoration: none; display: inline-block;  padding: 2px 8px; margin: 1px;color: #FFFFFF;border: 3px solid #652299;-webkit-border-radius: 3px; -moz-border-radius: 3px; border-radius: 3px; background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #652299), color-stop(1, #4D1A75) );background:-moz-linear-gradient( center top, #652299 5%, #4D1A75 100% );filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#652299', endColorstr='#4D1A75');background-color:#652299; }.datagrid table tfoot ul.active, .datagrid table tfoot ul a:hover { text-decoration: none;border-color: #DCE687; color: #FFFFFF; background: none; background-color:#DCE687;}	</style>
	<div class="datagrid"><table>
<thead><tr><th>Num</th><th>Artículo</th><th><button onClick="eliminarArticulo();">Eliminar</button></th></tr></thead>

<?php 

$sqla = "SELECT * FROM `lista`";
$resultado = mysqli_query($conn, $sqla) or die("Error in Selecting " . mysqli_error($connection));
$emparray = array();

$num_articulo = 0;
while($row =mysqli_fetch_assoc($resultado))
{
  $num_articulo = $num_articulo + 1;
echo '<tbody id="lista_art"><tr id='.$row['id'].'><td>'.$num_articulo.'</td><td>'.$row['nombre'].'</td><td><input type="checkbox" class="toedit" id="articulo_check-'.$row['id'].'"  value="'.$row['id'].'"></td></tr></tbody>';

}
//<tr class="alt">
?>


</tbody>
<!--<tfoot><tr><td colspan="3"><div id="paging"><ul><li><a href="#"><span>Previous</span></a></li><li><a href="#" class="active"><span>1</span></a></li><li><a href="#"><span>2</span></a></li><li><a href="#"><span>3</span></a></li><li><a href="#"><span>4</span></a></li><li><a href="#"><span>Next</span></a></li></ul></div></tr></tfoot>-->
</table></div>
			<!--	<li>
					<label for="title">Titulo: </label><input id="titulo" type="text" name="title" autocomplete="on" />
				</li>
				<li>
					<label for="body">Asunto: </label><textarea name="body" id ="cuerpo"></textarea>
				</li>-->
			</ul>
		
	</div>
	
</body>
</html>
