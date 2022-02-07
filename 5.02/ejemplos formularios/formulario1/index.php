<?php
 /*

FORMULARIO 1

Todo en javascript
- Cortocircuitar la validadcion de HTML5 con novalidate.
- Cortocircuitar el evento de envio submit con onsubmit="return validar()", si funcion validar retorna true no hace el evento sbmit, si retorna false si envia
- Validar en cliente no borra los valores del formulario porque ya estan, portanto mantiene la memoria.
- El código es ligeramente mas sencillo que la solución solo php, estamos mas cerca del DOM que al final es la estructura de datos que queremos modificar, no gestionamos recepciones y envios.
- La carga computacional se la dejamos al cliente descargando el servidor.
- Las expresiones regulares pueden ser utilizadas por javascript y php, incluso la misma cadena

CSS3: input[type=text]:focus 
HTML5: onsubmit="return validar()" novalidate

*/

$REQUERIDOS=array('Nombre','Usuario','Provincia');

function esPrimero(){
	return !$_REQUEST;
}
function form(){
?>

<h1>formulario 1</h1>

<div id='contForm'>
<form id='registro' name="registro" onsubmit="return validar()" novalidate>

	<div id="col1">
	
		<label for="Nombre">Nombre</label><input type="text" required  class='' id="Nombre" name="Nombre" value='' size="20" maxlength="50"/>
		<label for="Usuario">Usuario</label><input type="text" required class='' id="Usuario" name="Usuario" value='' size="20" maxlength="30" />
		
		<label for="Provincia">C.Autonoma</label>
		<input type="text" list='ListaProvincia' id="Provincia" name="Provincia" required class='' value='' size="20" maxlength="50"/>		
		<datalist id="ListaProvincia">
		<?php
		$valores=array(
		'Andalucía','Aragón','Asturias','Baleares','Canarias','Cantabria','Castilla y León',
		'Castilla La Mancha','Cataluña','Ceuta','Extremadura','Galicia','La Rioja','Madrid','Murcia','Navarra','País Vasco','Melilla','Valencia'
		);
		sort($valores); // ordena alfabeticamente
		foreach ( $valores as $v){
			echo '<option value="'.$v.'">'.$v.'</option>';
		}
		?>
		</datalist>

		<label for="Poblacion">Población</label><input type="text" id="Poblacion" name="Poblacion" value=''  size="20" maxlength="50"/>	
		<label for="email">email</label><input type="text" class='' id="email" name="email" value='' size="20" maxlength="100" placeholder="texto@texto.texto">
		<label for="pweb">Página WEB</label><input type="text" class='' id="pweb" name="pweb" value='' size="20" maxlength="100" placeholder="http://texto"/>
	
	</div>

	<div id="col2">
	
		<label for="Apellidos">Apellidos</label><input type="text" id="Apellidos" name="Apellidos" value='' size="20" maxlength="50"/>

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
			echo '<option value="'.$v.'">'.$v.'</option>';
		}
		?>
		</select>
		</div>
		<label for="Tmovil">T.Móvil</label><input type="text" class='' id="Tmovil" name="Tmovil" value='' size="20" maxlength="20" placeholder="(6/7)xxxxxxxx"/>
		<label for="Tfijo">T.Fijo</label><input type="text" class='' id="Tfijo" name="Tfijo" value='' size="20" maxlength="20" placeholder="9xxxxxxx" />
		<label for="Fnac">F.Nacimiento</label><input type="text" class='' id="Fnac" name="Fnac" size="20" value='' maxlength="10" placeholder="DD-MM-AAAA"/>
		<input type="checkbox" id="Blog" name="Blog" />
		<span id="tBlog">&nbsp;Alta automática en el <a href="http://blog.madridsub.com" target="_blank">Blog MadridSub</a></span>
	</div>
		<input type="submit" id="enviar" value="Enviar"/>
		<input type="button" id="limpiar" name="limpiar" value="Limpiar"/>	
		<span id='sumario'></span>		
</form>
</div>
<?php
}
function main(){
	if ( esPrimero() ){
		form();
	}else{
		echo "Acceso<br/>";var_dump($_REQUEST);echo "<br/>";var_dump($_FILES); 		
	}
}
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="es" xml:lang="es">
 
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Rellena tu formulario</title>
<script>
// globales
var errores=new Array();

function esValido(b,campo){
	var ele=document.getElementById(campo);
	ele.className='valido';
	var valor=ele.value;
	var ok=true;	
	if (b=='texto'){
		if( valor == null || valor.length == 0 || /^\s+$/.test(valor) ){ok=false;}
	}	
	if( valor == null || valor.length == 0 || /^\s+$/.test(valor) ){
	}else{		
		if (b=='email'){  
			var expr=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; // buscada en internet 
			if ( !expr.test(valor) ){ok=false;}	
		}
		if (b=='fecha'){
			var partes=valor.split("-");
			if (partes.length==3){
				valor=new Date(partes[2],partes[1],partes[0]);
				if( isNaN(valor) ){ok=false;}
			}else{ok=false;}		
		}
		if (b=='movil'){
			var expr=/^[6|7][0-9]{8}$/; // la misma que en PHP !!!
			if ( !expr.test(valor) ){ok=false;}		
		}
		if (b=='url'){
			var expr=/\b(?:(?:https?|ftp):\/\/|www\.)[-a-z0-9+&@#\/%?=~_|!:,.;]*[-a-z0-9+&@#\/%=~_|]/i; // la misma que en PHP !!!
			if ( !expr.test(valor) ){ok=false;}		
		}
		if (b=='fijo'){
			var expr=/^[9][0-9]{8}$/; // la misma que en PHP !!!
			if ( !expr.test(valor) ){ok=false;}		
		}	
	}		
	if(ok==false){
		ele.className='invalido';
		errores.push(campo);
	}
	return ok;
}
function validar(){
	var valido=true;
	errores.length=0; // reset es relleando en esValido
	if ( !esValido('texto','Nombre') ){valido=false;}
	if ( !esValido('texto','Provincia') ){valido=false;}
	if ( !esValido('texto','Usuario') ){valido=false;}
	if ( !esValido('email','email') ){valido=false;}
	if ( !esValido('fecha','Fnac') ){valido=false;}
	if ( !esValido('movil','Tmovil') ){valido=false;}
	if ( !esValido('fijo','Tfijo')){$valido=false;}		
	if ( !esValido('url','pweb') ){valido=false;}		
	var texto=errores.length+' errores';
	document.getElementById('sumario').innerHTML=texto;
	return valido; // true se envia , false no se envia
}
function limpiar(){
	// reset ya limpia contenidos , aqui reestablecemos los estilos
	errores.length=0; // reset
	var requeridos=0;
	var formulario=document.getElementById("registro");
	for(var i=0; i<formulario.elements.length; i++) {
	  var ele=formulario.elements[i];
	  console.log(ele.type);
	  if (ele.type == "select-one") {
		ele.selectedIndex=0;
	  }	  
	  if (ele.type == "text") {
	  	ele.value='';
		ele.className='valido';
		if (ele.required){ele.className+=' atencion';requeridos++;}
	  }
	}
	// valores iniciales
	document.getElementById("Blog").checked=true;
	document.getElementById('sumario').innerHTML=requeridos+' requeridos';
	return false;
}
function clickText(){
	this.value='';
	document.getElementById('sumario').innerHTML='';
}
function inicio(){
	// eventos
	document.getElementById("limpiar").onclick=limpiar;
	var formulario=document.getElementById("registro");
	for(var i=0; i<formulario.elements.length; i++) {
	  var elemento=formulario.elements[i];
	  if(elemento.type == "text") {
		elemento.onclick=clickText;
	  }
	}	
	limpiar();
}
window.onload=inicio; // esquema basico de eventos
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
<?php main();?>
</body>
</html>

