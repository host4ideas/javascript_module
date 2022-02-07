<?php
/* 

FORMULARIO 0 

formulario en HTML5 y CSS
HTML5: label for required submit reset maxlength placeholder name value form action method
CSS3: input[type=submit] selector para estilizar las cajas de texto

*/
?>
       
<h1>formulario 0</h1>

<div id='contForm'><form name="registro" action="" method="get">

	<div id="col1">
	
		<label for="Nombre">Nombre</label><input type="text" required="required" id="Nombre" name="Nombre" value="" size="20" maxlength="50"/>
		<label for="Usuario">Usuario</label><input type="text" required="required"  id="Usuario" name="Usuario" value="" size="20" maxlength="30" placeholder="de MadridSub"/>
		<label for="Provincia">Provincia</label><input type="text"  id="Provincia" name="Provincia" value="" size="20" maxlength="50"/>
		<label for="Poblacion">Población</label><input type="text" id="Poblacion" name="Poblacion" value="" size="20" maxlength="50"/>	
		<label for="email">email</label><input type="text" required="required" id="email" name="email" value="" size="20" maxlength="100" placeholder="texto@texto.texto">
		<label for="pweb">Página WEB</label><input type="text" id="pweb" name="pweb" value="" size="20" maxlength="100" placeholder="http://texto"/>
	
	</div>

	<div id="col2">
		<label for="Apellidos">Apellidos</label><input type="text" id="Apellidos" name="Apellidos" value="" size="20" maxlength="50"/>

		<label>Título Buceo</label>
		<div id='selector'>
		<select id="Tbuceo" name="Tbuceo" >
			<option value="-">selecciona ...</option>
			<option value="PADI-OWD">PADI-OWD</option>
			<option value="PADI-AOWD">PADI-AOWD</option>
			<option value="PADI-ROWD">PADI-ROWD</option>
			<option value="PADI-DM">PADI-DM</option>
			<option value="PADI-INSTR">PADI-INSTR</option>
			<option value="CMAS-1E">CMAS-1E</option>
			<option value="CMAS-2E">CMAS-2E</option>
			<option value="CMAS-3E">CMAS-3E</option>
			<option value="INSTR-1EN1">INSTR-1EN1</option>
			<option value="INSTR-1EN2">INSTR-1EN2</option>
			<option value="INSTR-2EN3">INSTR-2EN3</option>
			<option value="INSTR-3EN3">INSTR-3EN3</option>
			<option value="INSTR-3EN4">INSTR-3EN4</option>
			<option value="INSTR-3EN5">INSTR-3EN5</option>
			<option value="INSTR-3EN6">INSTR-3EN6</option>
			<option value="Otros">Otros</option>
		</select>
		</div>
		<label for="Tmovil">T.Móvil</label><input type="text" id="Tmovil" name="Tmovil" value="" size="20" maxlength="20" placeholder="+yy xxx xxx xxx"/>
		<label for="Tfijo">T.Fijo</label><input type="text" id="Tfijo" name="Tfijo" value="" size="20" maxlength="20" placeholder="91 xxx xxx" />
		<label for="Nombre">F.Nacimiento</label><input type="text" id="Fnac" name="Fnac" size="20" value="" maxlength="10" placeholder="DD/MM/AAAA"/>
		
		<input type="checkbox" id="Blog" name="Blog" value="1" checked="checked" />
		<span id="tBlog">&nbsp;Alta automática en el <a href="http://blog.madridsub.com" target="_blank">Blog Madridsub</a></span>

	</div>
		<input type="submit" id="enviar" value="Enviar"/>
		<input type="reset" id="limpiar" value="Borrar"/>
</form></div>

<!-- CONTENIDOS -------------------------------------------------- -->
<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
<table  border="1" width="700" cellspacing="1" cellpadding="1"><tr><td><form name="registro" action="registro.php" method="post"><div align="center"><b><h1><font color="#000080">FORMULARIO DE REGISTRO</font></h1>27/11/2014</b><br><br><table border="0" cellspacing="3" summary=""><tr><td><b>Nombre<font size="2">(*)</font>:</b></td><td><input type="text" name="Nombre" value="" size="30" maxlength="50"></td></tr><tr><td><b>Apellidos:</b></td><td><input type="text" name="Apellidos" value="" size="30" maxlength="50"></td></tr><tr><td><b>F.Nacimiento<font size="2">(*)</font>:</b></td><td><table border="0" summary=""><tr><td>dia</td>		<td>mes</td><td>año</td></tr><tr><td><input type="text" name="Dia" size="2" value="" maxlength="2"></td><td><input type="text" name="Mes" size="2" value="" maxlength="2"></td><td><input type="text" name="Ano" size="2" value="" maxlength="4"></td></tr></table></td></tr><tr><td><b>Población:</b></td><td><input type="text" name="Poblacion" value="" size="30" maxlength="50"></td></tr><tr><td><b>Provincia<font size="2">(*)</font>:</b></td><td><input type="text" name="Provincia" value="" size="30" maxlength="50"></td></tr><tr><td><b>T.Fijo:</b></td><td><input type="text" name="Tfijo" value="" size="15" maxlength="20"></td></tr><tr><td><b>T.Móvil:</b></td><td><input type="text" name="Tmovil" value="" size="15" maxlength="20"></td></tr><tr><td><b>Título Buceo:</b></td><td><select name="Tbuceo"><option value="-">-</option><option value="PADI-OWD">PADI-OWD</option><option value="PADI-AOWD">PADI-AOWD</option><option value="PADI-ROWD">PADI-ROWD</option><option value="PADI-DM">PADI-DM</option><option value="PADI-INSTR">PADI-INSTR</option><option value="CMAS-1E">CMAS-1E</option><option value="CMAS-2E">CMAS-2E</option><option value="CMAS-3E">CMAS-3E</option><option value="INSTR-1EN1">INSTR-1EN1</option><option value="INSTR-1EN2">INSTR-1EN2</option><option value="INSTR-2EN3">INSTR-2EN3</option><option value="INSTR-3EN3">INSTR-3EN3</option><option value="INSTR-3EN4">INSTR-3EN4</option><option value="INSTR-3EN5">INSTR-3EN5</option><option value="INSTR-3EN6">INSTR-3EN6</option><option value="Otros">Otros</option></select></td></tr><tr><td><b>e-mail<font size="2">(*)</font>:</b></td><td><input type="text" name="email" value="" size="50" maxlength="100"></td></tr><tr><td><b>Página WEB:</b></td><td><input type="text" name="pweb" value="" size="50" maxlength="100"></td></tr><tr><td><hr></td><td><hr></td></tr><tr><td><b>Usuario<font size="2">(*)</font>:</b></td><td><input type="text" name="Usuario" value="" size="15" maxlength="30"></td></tr><tr><td align="right"><input type="checkbox" name="Blog" value="1" checked></td><td><b>Alta automática en el <a href="http://blog.madridsub.com" target="_blank">Blog Madridsub</a></b></td></tr><tr><td></td><td width="400"><b>Recibirá su password en la dirección de correo electrónico que ha introducido en este formulario</b></td></tr><tr><td><hr></td><td><hr></td></tr></table><table border="0" cellspacing="3" summary=""><tr><td><input type="submit" value="Enviar"></td><td><input type="reset" value="Borrar"></td></tr></table></form><hr><font color="#660000"><b></b></font></div></td></tr></table>
<!-- FIN CONTENIDOS -->	

	
</form>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="es" xml:lang="es">
 
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Rellena tu formulario</title>

<style>
#selector{
	width: 120px;
	}
#col1,#col2{
	float:left;
	width: 340px;
}
#contForm{
	height:460px;
	width:740px;
	margin:0 auto;
	border: solid 1px #BECFDE;
	padding: 30px 20px 20px 60px;
}
div#contForm label,#Blog,input[type=submit],#tBlog{
	float:left;
	clear:left;
	display: inline-block;
	margin: 12px 0px 0px 0px; /* estilizado */
}
#tBlog{
	position:relative;
	left: 20px;
	top: -8px;
}
div#contForm label,input[type=submit]{
	width: 340px;
}
div#contForm input[type=text],select{
	border: 1px solid #999;
	box-shadow: 0px 0px 3px #AAA;
	padding:4px;
}
div#contForm input[type=text]:focus{
	padding-right:20px;
	background:#EBEDDA;
}
div#contForm input,select,#tBlog,input[type=reset]{
	float:left;
}
#Blog{
	position:relative;
	top: 20px;
}
#Tbuceo{
	width: 168px;
}
#enviar,#limpiar{
	width: 120px;
	padding:8px;
	margin:30px 10px 10px 10px;
}
#enviar{
	margin-left: 184px;
}
.invalido{
	background-color:#FFE100;
}
.valido{
	background-color:white;
}

</style>
</head>
 
<body>
</body>

</html>