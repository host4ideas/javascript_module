const main = () => {
	// Si no está definido el archivo ejemploVideos.js, se utilizará el json devuelto por la API
	const videoData = JSON_VIDEOS || getImages();

	for (j = 0; j <= 9; j++) {
		for (k = 0; k <= 10; k++) {
			crearImagen(64, 64, k + j, videoData.faces[(j + k)].urls[2][128]);
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
	}
	function focusImg() {
		this.style.width = "92px";
		this.style.height = "92px";
	}
}

function keyPress(ev) {
	switch (ev.key) {
		case "w":
			document.tabIndex(this.tabIndex() - 10);
			break;
		case "s":
			document.tabIndex(this.tabIndex()+ 10);
			break;
		case "a":
			document.tabIndex(this.tabIndex() + 1);
			break;
		case "d":
			document.tabIndex(this.tabIndex() - 1);
			break;
	}
}

const getImages = async () => {
	const imagenesJson = await fetch(`https://api.generated.photos/api/v1/faces?page=10&per_page=10&api_key=${API_KEY}`);
	return imagenesJson;
}

window.onload = main;