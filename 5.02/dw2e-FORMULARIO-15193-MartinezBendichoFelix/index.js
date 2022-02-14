function getIdiomas() {
	xmlhttp = getXmlHttp();
	console.log('lng/' + this.value + '.json');
	xmlhttp.open("GET", 'lng/' + this.value + '.json', false); // POST sincrono
	xmlhttp.send();
	var obj = JSON.parse(xmlhttp.responseText); // cargar JSON
	var lista = obj.idioma.campos; // el array con los options
	var txt = '';
	for (var i = 0; i < lista.length; i++) {
		document.getElementById('lbl' + lista[i].id).innerHTML = lista[i].text;
	}
}

function inicio() {
	// eventos
	// document.getElementById("limpiar").onclick = limpiar;
	document.getElementById("idiomas").onchange = getIdiomas;

	// var formulario = document.getElementById("registro");
	// for (var i = 0; i < formulario.elements.length; i++) {
	// 	var elemento = formulario.elements[i];
	// 	if (elemento.type == "text") {
	// 		elemento.onclick = clickText;
	// 	}
	// }
	// limpiar();
}

window.onload = inicio; // esquema basico de eventos