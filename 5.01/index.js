let arrImg = [];
var currentFocus = 0;

const main = () => {
	// Si no está definido el archivo ejemploVideos.js, se utilizará el json devuelto por la API
	const videoData = JSON_VIDEOS || getImages();

	for (j = 0; j <= 9; j++) {
		for (k = 0; k <= 9; k++) {
			let img = crearImagen(64, 64, k + j, videoData.faces[(j + k)].urls[2][128]);
			arrImg.push(img);
		}
		crearSalto();
	}
	function crearSalto() {
		// div vacio sin dimensiones con clear left
		var ele = document.createElement('div'); // crear nodo
		ele.style.clear = 'left'; // css posicionamiento
		document.body.appendChild(ele);	// añadir nodo al dom 
	}
	function crearImagen(width, height, id, url) {
		var ele = document.createElement('img'); // crear objeto
		ele.id = 'img', id;
		ele.tabIndex = ++id;
		ele.style.cssFloat = 'left'; // css posicionamiento
		ele.style.width = width + 'px';
		ele.style.height = height + 'px';
		ele.style.margin = '4px';
		ele.style.border = '1px solid black'
		ele.src = url;
		ele.onfocus = focusImg;
		ele.onkeydown = (ev) => keyPress(ev);
		document.body.appendChild(ele); // anadir nodo al body
		return ele;
	}
	function focusImg() {
		this.style.width = "92px";
		this.style.height = "92px";
	}
}

function keyPress(ev) {
	console.log(ev.key);
	switch (ev.key) {
		case "w":
			if (currentFocus - 10 >= 0) { currentFocus -= 10 };
			console.log(currentFocus);
			arrImg[currentFocus].focus();
			break;
		case "s":
			if (currentFocus + 10 <= 100) { currentFocus += 10 };
			console.log(currentFocus);
			arrImg[currentFocus].focus();
			break;
		case "a":
			if (currentFocus - 1 >= 0) { currentFocus -= 1 };
			console.log(currentFocus);
			arrImg[currentFocus].focus();
			break;
		case "d":
			if (currentFocus + 1 <= 100) { currentFocus += 1 };
			console.log(currentFocus);
			arrImg[currentFocus].focus();
			break;
		case "Tab":
			currentFocus++;
			break;
	}
}

const getImages = async () => {
	const imagenesJson = await fetch(`https://api.generated.photos/api/v1/faces?page=10&per_page=10&api_key=${API_KEY}`);
	return imagenesJson;
}

function focusNextElement() {
	//add all elements we want to include in our selection
	var focussableElements = 'img';
	if (document.activeElement && document.activeElement.form) {
		var focussable = Array.prototype.filter.call(document.activeElement.form.querySelectorAll(focussableElements),
			function (element) {
				//check for visibility while always include the current activeElement 
				return element.offsetWidth > 0 || element.offsetHeight > 0 || element === document.activeElement
			});
		var index = focussable.indexOf(document.activeElement);
		if (index > -1) {
			var nextElement = focussable[index + 1] || focussable[0];
			nextElement.focus();
		}
	}
}

window.onload = main;