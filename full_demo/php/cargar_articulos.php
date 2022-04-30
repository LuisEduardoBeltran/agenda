<?php 

$sqla = "SELECT * FROM `lista`";
$resultado = mysqli_query($conn, $sqla) or die("Error in Selecting " . mysqli_error($connection));
$emparray = array();

$num_articulo = 0;
while($row =mysqli_fetch_assoc($resultado))
{
  $num_articulo = $num_articulo + 1;
echo '<tbody><tr id='.$row['id'].'><td>'.$num_articulo.'</td><td>'.$row['nombre'].'</td><td><input type="checkbox" class="toedit" id="articulo_check-'.$row['id'].'"  value="'.$row['id'].'"></td></tr></tbody>';

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
	?>