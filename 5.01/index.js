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
		let ele = document.createElement('div'); // crear nodo
		ele.style.clear = 'left'; // css posicionamiento
		document.body.appendChild(ele);	// añadir nodo al dom 
	}

	function crearImagen(width, height, id, url) {
		let ele = document.createElement('img'); // crear objeto
		ele.id = 'img', id;
		ele.tabIndex = ++id;
		ele.style.cssFloat = 'left'; // css posicionamiento
		ele.style.width = width + 'px';
		ele.style.height = height + 'px';
		ele.style.margin = '4px';
		ele.style.border = '1px solid black'
		ele.focused = false;
		ele.src = url;
		ele.onfocus = focusImg;
		ele.clearStyles = clearFocusStyle;
		ele.onkeydown = (ev) => keyPress(ev);
		document.body.appendChild(ele); // anadir nodo al body
		return ele;
	}

	function focusImg() {
		this.focused = true;
		this.style.width = "92px";
		this.style.height = "92px";
		this.style.margin = "-8px";
		this.style.border = '2px solid blue'
	}

	function clearFocusStyle() {
		this.style.width = '64px';
		this.style.height = '64px';
		this.style.margin = '4px';
		this.style.border = '1px solid black'
		this.focused = false;
	}
}

function keyPress(ev) {
	switch (ev.key) {
		case "w":
			if (currentFocus - 10 >= 0) { currentFocus -= 10 };
			if (arrImg[currentFocus].focused == true) {
				arrImg[currentFocus].clearStyles();
			} else {
				arrImg[currentFocus].focus();
			}
			break;
		case "s":
			if (currentFocus + 10 <= 100) { currentFocus += 10 };
			if (arrImg[currentFocus].focused == true) {
				arrImg[currentFocus].clearStyles();
			} else {
				arrImg[currentFocus].focus();
			}
			break;
		case "a":
			if (currentFocus - 1 >= 0) { currentFocus -= 1 };
			arrImg[currentFocus].focus();
			if (arrImg[currentFocus].focused == true) {
				arrImg[currentFocus].clearStyles();
			} else {
				arrImg[currentFocus].focus();
			}
			break;
		case "d":
			// Si llegas al final saltará al primer elemento
			if (currentFocus + 1 <= 99) {
				currentFocus += 1
			} else if (currentFocus + 1 > 99) {
				currentFocus = 0;
			}
			if (arrImg[currentFocus].focused == true) {
				arrImg[currentFocus].clearStyles();
			} else {
				arrImg[currentFocus].focus();
			}
			arrImg[currentFocus].focused = true;
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