<?php
/* 
FORMULARIO 2 

- Resolvemos todo en PHP
- Función form() de php imprime el formlario html
- PHP crea el formulario completo en todas las llamadas, creamos action="" y novalidate
- Primera carga pone valores por defecto en el formulario
- Siguientes cargas: php recibe los valores en REQUEST, valida, imprime el formulario, añade errores, mantiene la memoria del formulario
- PHP dinámicamente marca en el formulario: requeridos, clases, valores, valores en selectores
- Usamos una hoja de estilos pero las clases tb son dinámicas en php

PHP: global, filter_var, preg_match, explode, count, is_numeric, checkdate

*/
	
// GLOBALES
$ERRORES=array();
$REQUERIDOS=array('Nombre','Usuario','Provincia');

// coleccion de funciones
function main(){
	if ( esPrimero() or esLimpiar() ){
		form();
	}else{
		if ( validar() ){
			echo "Acceso<br/>";
			var_dump($_REQUEST);
			echo "<br/>";
			var_dump($_FILES); 
		}
		else{
			form(); // reenvio
		}
	}
}
function esPrimero(){
	// comprueba si el la primera pagina
	return !$_REQUEST;
}
function esLimpiar(){
	// boton limpiar formulario
	return isset($_REQUEST['limpiar']);
}
function esNuloVacioReq($a){
	// comprobar si la variable esta vacia
	if (!isset($_REQUEST[$a])){return true;}
	if ($_REQUEST[$a]==''){return true;}
	return false;
}
function esNuloVacioErr($a){
	// comprobar si es vacia o nodefina
	global $ERRORES;
	if (!isset($ERRORES[$a])){return true;}
	if ($a==''){return true;}
	return false;
}
function sumario(){
	// contar los errores o requeridos del formulario
	global $ERRORES,$REQUERIDOS;
	if ( esLimpiar() or esPrimero() ){
		$x=count($REQUERIDOS);
		echo "$x requeridos";
	}else{
		$x=count($ERRORES);		
		echo "$x errores";
	}
}
function getFoco(){
	// foco inicial del formulario
	if ( esLimpiar() or esPrimero() ){
		return 'autofocus';
	}
}
function getClass($a){
	// estados de las entradas por clases
	global $ERRORES,$REQUERIDOS;
	if ( esLimpiar() or esPrimero() ){
		if ( in_array($a,$REQUERIDOS) ){ 
			 return 'atencion';
		}else{
			return 'valido';	
		}	
	}else{
		if (esNuloVacioErr($a)){
			return 'valido';
		}else{
			return 'invalido';
		}	
	}
}
function getValue($a){
	// establecer el checkbox
	if ( esLimpiar() or esPrimero() ){ 
		if ($a=='Blog'){
			return ' checked '; 
		}else{
			return ''; 
		}	
	}
	if ($a=='Blog'){
		if (isset($_REQUEST[$a])){	
			if($_REQUEST[$a]=='on'){
				return ' checked '; 
			}	
		}else{
			return '';
		}		
	}	
	if (isset($_REQUEST[$a])){
		return $_REQUEST[$a]; 
	}else{
		return ''; 
	}
}
function getOption($a,$b){
	// establecer el selector
	if ( esLimpiar() or esPrimero() ){
		return ''; 
	}
	if (isset($_REQUEST[$a])){
		if ($b==$_REQUEST[$a]){
			return 'selected'; 
		}
	}
	return '';
}
function esValido($b,$campo){
	// chequear el formulario y sacar los errores
	global $ERRORES,$REQUERIDOS;
	if (in_array($campo,$REQUERIDOS)){
		if (esNuloVacioReq($campo)){
			$ERRORES[$campo]='requerido no puede estar vacio';		
			return false;
		}
	}
	if (!esNuloVacioReq($campo)){
		$ok=false;
		$valor=$_REQUEST[$campo];
		if ($b=='url'){
			$ok=preg_match("/\b(?:(?:https?|ftp):\/\/|www\.)[-a-z0-9+&@#\/%?=~_|!:,.;]*[-a-z0-9+&@#\/%=~_|]/i",$valor);
		}elseif ($b=='email'){
			$ok=filter_var($valor, FILTER_VALIDATE_EMAIL);
		}elseif ($b=='fecha'){  
			$ok=false;			
			$partes=explode("-",$valor);
			if (count($partes)==3){if( is_numeric($partes[0]) and is_numeric($partes[1]) and is_numeric($partes[2]) ){$ok=checkdate($partes[1],$partes[0],$partes[2]);}}
		}elseif ($b=='movil'){  
			$expresion='/^[6|7][0-9]{8}$/';
			$ok=preg_match($expresion,$valor);	
		}elseif ($b=='fijo'){  
			$expresion='/^[9][0-9]{8}$/';
			$ok=preg_match($expresion,$valor);				
		}else{
			$ok=true; // resto de casos no hay comprobaciones definidas son validas todas las entradas			
		}
		if (!$ok){
			$ERRORES[$campo]='formato no valido';
		}		
	}else{
		$ok=true; // cajas vacias opcionales son correctas
	}
	return $ok;
}
function validar(){
	$valido=true;// si falla cualquier campo la validacion es falsa pero quiero validar todos los campos
	if (!esValido('','Nombre')){$valido=false;}
	if (!esValido('','Provincia')){$valido=false;}
	if (!esValido('','Usuario')){$valido=false;}
	if (!esValido('email','email')){$valido=false;}
	if (!esValido('url','pweb')){$valido=false;}
	if (!esValido('fecha','Fnac')){$valido=false;}
	if (!esValido('movil','Tmovil')){$valido=false;}
	if (!esValido('fijo','Tfijo')){$valido=false;}	
	return $valido;
}
function form(){
/* pinta en html el formulacio , leyendo valores y estilizando los errores y requeridos, ademas tiene memoria mantiene valores ya introducidos si no tienen errores */
?>
<h1>formulario 2</h1>

<div id='contForm'>
<form id='registro' name="registro" action="" method="get" novalidate>

	<div id="col1">
	
		<label for="Nombre">Nombre *</label><input type="text" <?php echo getFoco();?> class='<?php echo getClass("Nombre");?>' id="Nombre" name="Nombre" value='<?php echo getValue("Nombre");?>' size="20" maxlength="50"/>
		<label for="Usuario">Usuario *</label><input type="text" class='<?php echo getClass("Usuario");?>' id="Usuario" name="Usuario" value='<?php echo getValue("Usuario");?>' size="20" maxlength="30" />
		
		<label for="Provincia">C.Autonoma *</label>
		<input type="text" list='ListaProvincia' id="Provincia" name="Provincia" class='<?php echo getClass("Provincia");?>' value='<?php echo getValue("Provincia");?>' size="20" maxlength="50"/>		
		<datalist id="ListaProvincia">
		<?php
		$valores=array(
		'Andalucía','Aragón','Asturias','Baleares','Canarias','Cantabria','Castilla y León',
		'Castilla La Mancha','Cataluña','Ceuta','Extremadura','Galicia','La Rioja','Madrid','Murcia','Navarra','País Vasco','Melilla','Valencia'
		);
		sort($valores); // ordena alfabeticamente
		foreach ( $valores as $v){
			echo '<option '.getOption('Provincia',$v).' value="'.$v.'">'.$v.'</option>';
		}
		?>
		</datalist>

		<label for="Poblacion">Población</label><input type="text" id="Poblacion" name="Poblacion" value='<?php echo getValue("Poblacion");?>'  size="20" maxlength="50"/>	
		<label for="email">email</label><input type="text" class='<?php echo getClass("email");?>' id="email" name="email" value='<?php echo getValue("email");?>' size="20" maxlength="100" placeholder="texto@texto.texto">
		<label for="pweb">Página WEB</label><input type="text" class='<?php echo getClass("pweb");?>' id="pweb" name="pweb" value='<?php echo getValue("pweb");?>' size="20" maxlength="100" placeholder="http://texto"/>
	
	</div>

	<div id="col2">
	
		<label for="Apellidos">Apellidos</label><input type="text" id="Apellidos" name="Apellidos" value='<?php echo getValue("Apellidos");?>' size="20" maxlength="50"/>

		<label>Título Buceo</label>
		<div id='selector'>
		<select id="Tbuceo" name="Tbuceo">
		<?php
		$valores=array(
		'',
		'PADI-OWD','PADI-AOWD','PADI-ROWD','PADI-DM','PADI-INSTR',
		'CMAS-1E','CMAS-2E','CMAS-3E',
		'INSTR-1EN1','INSTR-1EN2','INSTR-2EN3','INSTR-3EN3','INSTR-3EN4','INSTR-3EN5','INSTR-3EN6',
		'Otros'
		);
		foreach ($valores as $v){
			echo '<option '.getOption('Tbuceo',$v).' value="'.$v.'">'.$v.'</option>';
		}
		?>
		</select>
		</div>
		<label for="Tmovil">T.Móvil</label><input type="text" class='<?php echo getClass("Tmovil");?>' id="Tmovil" name="Tmovil" value='<?php echo getValue("Tmovil");?>' size="20" maxlength="20" placeholder="(6/7)xxxxxxxx"/>
		<label for="Tfijo">T.Fijo</label><input type="text" class='<?php echo getClass("Tfijo");?>' id="Tfijo" name="Tfijo" value='<?php echo getValue("Tfijo");?>' size="20" maxlength="20" placeholder="9xxxxxxx" />
		<label for="Fnac">F.Nacimiento</label><input type="text" class='<?php echo getClass("Fnac");?>' id="Fnac" name="Fnac" size="20" value='<?php echo getValue("Fnac");?>' maxlength="10" placeholder="DD-MM-AAAA"/>
		
		<input type="checkbox" id="Blog" name="Blog" value='<?php echo getValue("Blog");?>' />
		<span id="tBlog">&nbsp;Alta automática en el <a href="http://blog.madridsub.com" target="_blank">Blog MadridSub</a></span>

	</div>
		<input type="submit" id="enviar" value="Enviar"/>
		<input type="submit" id="limpiar" name="limpiar" value="Limpiar"/>	
		<span id='sumario'><?php echo sumario();?></span>		
</form>
</div>
<?php
}

?>



<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="es" xml:lang="es">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Rellena tu formulario</title>
<script>
function inicio(){
	// añadir a todos los controles del formulario el evento de click
	// para vaciar la caja si hay un click
	var formulario = document.getElementById("registro");
	for(var i=0; i<formulario.elements.length; i++) {
	  var elemento = formulario.elements[i];
	  if(elemento.type == "text") {
		elemento.onclick = clickText; 
	  }
	}
}
function clickText(){
	this.value='';
	document.getElementById('sumario').innerHTML='';
}
window.onload = inicio; // esquema básico de eventos
</script>
<style>
#selector{
	float:left;
	clear:left;
	display:inline-block;
	margin:0px 0px 0px 0px; /* estilizado */
}
#tBlog {
	position:relative;
	top: 12px;
}
#sumario {
	color:#BCA500;
	font-size: 110%; 
	float:right;
	position: relative;
	top: 36px;
}
/* info errores */
#sumario {
	color:#E10000;
	float:right;
	position: relative;
	top: 60px;
}
/* input y select del mismo ancho */
input, select
{
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
}
#Tbuceo{
	width:168px;
}

/* controles a dos columnas */
#col1,#col2{
	float:left;
	width:340px;
}

/* contenedor del formulario */
#contForm{
	height:500px;
	width:690px;
	margin:0 auto;
	border:solid 1px #BECFDE;
	padding:30px 20px 20px 60px;
}

/* composicion formulario */
div#contForm label,#Blog,#enviar{
	float:left;
	clear:left;
	display:inline-block;
	margin: 12px 0px 0px 0px; /* estilizado */
}
div#contForm label,#enviar{
	width: 340px;
}
div#contForm input[type=text],select{
	border:1px solid #999;
	box-shadow:0px 0px 3px #AAA;
	padding:4px;
	transition:box-shadow 1s ease 0s;
}
div#contForm input[type=text]:focus{
	box-shadow:0px 0px 6px #772;
	background:#EBEDDA;
}
div#contForm input,select,#tBlog,input[type=reset]{
	float:left;
}
/* pequeño ajuste checkbox */
#Blog{
	position:relative;
	top:2px;
}

/* estilos botones */
#enviar,#limpiar{
	width:200px;
	padding:8px;
	margin:30px 10px 10px 10px;
	border:1px solid #3079ED; /* gmail estilo */
	color:#FFF;
	text-shadow:0px 1px rgba(0, 0, 0, 0.1);
	background-color: #4D90FE;
	background-image:-moz-linear-gradient(center top , #4D90FE, #4787ED);	
	border-radius:3px;
	transition:all 0.2s ease 0s;
	cursor:default;
}
#enviar:hover,#limpiar:hover{
	border: 1px solid #2F5BB7;
	color: #FFF;
	text-shadow: 0px 1px rgba(0,0,0,3);
	background-color: #357AE8;
	background-image: -moz-linear-gradient(center top , #4D90FE, #357AE8);
}
#enviar{
	margin-left:104px;
}

/* estados para las entradas de datos */
.invalido{
	background-color:#FFE100;
}
.valido{
	background-color:white;
}
.atencion{
heigth:32px;
	background:url('img/atencion.png') no-repeat scroll right center / 24px 24px #FFF;
}

/* tuneado de hiperenlaces */
a:link {
    text-decoration:none;
}
a:visited {
    text-decoration:none;
}
a:hover {
    text-decoration:underline;
}
a:active {
    text-decoration:underline;
}
</style>
</head>
<body>
<?php main();
// main retorna el codigo html que se inserta en el body
?>
</body>
</html>