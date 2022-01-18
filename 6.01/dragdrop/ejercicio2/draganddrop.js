function allowDrop(ev) {
	ev.preventDefault();
}

function drag(ev) {
	ev.dataTransfer.setData("id", ev.target.id);
}

function drop(ev) {
	ev.preventDefault();
	var data = ev.dataTransfer.getData("id");

	try {
		document.getElementById(ev.target.parentNode.id).removeChild(document.getElementById(data));
	} catch (e) {
		console.log("This is not a child of this parent.");
	}
}

// Clean all the tag child elements from conenido container
const clearContentContainer = (parent) => {
	Array.from(parent.children).filter((child) => {
		return child.classList.contains('crema', 'contenedor-child');
	})
		.forEach(elementChild => parent.removeChild(elementChild));
};

const main = () => {
	const inputTitle = document.getElementById("tagTitle");
	const inputUrl = document.getElementById("tagUrl");
	const inputDescription = document.getElementById("tagDescription");

	let counterEtiquetas = 0;
	let counterBookmarks = 0;
	/*
		Funcion para agregar etiquetas y bookmarks
	*/
	const agregarHijos = () => {
		// Guardamos el indice para cada elemento, el cual aumenta por cada eventListenner
		const contenedorPadre = event.target.parentNode;
		const nombreContenedorPadre = contenedorPadre.firstElementChild.innerHTML;

		var elemento = document.createElement("div");
		elemento.setAttribute("draggable", "true");
		/*
			Si el contenedor es el de las etiquetas,
			la etiqueta debera tener unas propiedades con el contenido,
			si es el contenedor bookmarks, los bookmarks deberan
			de tener una lista de tags
		*/
		if (nombreContenedorPadre == "ETIQUETAS") {
			// Sumar 1 al counter por cada etiqueta añadida
			counterEtiquetas++;
			// elemento.contenido = {
			// 	title: "Titulo de prueba",
			// 	url: "https://www.google.es/",
			// 	description: "Descripción"
			// };
			elemento.setAttribute("contenido", {
				title: "Titulo de prueba",
				url: "https://www.google.es/",
				description: "Descripción"
			});
			elemento.id = contenedorPadre.id + counterEtiquetas;
			elemento.innerHTML = "ETIQUETA " + counterEtiquetas;

			/*
				Add the onclick funcitonality to show the content of the tag
			*/
			elemento.onclick = () => {
				inputTitle.value = elemento.contenido["title"];
				inputUrl.value = elemento.contenido["url"];
				inputDescription.value = elemento.contenido["description"];

				/*
					Add the funcitonality to change the content of the tag
				*/
				inputTitle.onchange = () => {
					elemento.contenido["title"] = inputTitle.value;
				};

				inputUrl.onchange = () => {
					elemento.contenido["url"] = inputUrl.value;
				};

				inputDescription.onchange = () => {
					elemento.contenido["description"] = inputDescription.value;
				};
			};
		} else if (nombreContenedorPadre == "BOOKMARKS") {
			// Sumar 1 al counter por cada bookmark añadido
			counterBookmarks++;
			// Here we'll insert duplicated tags when associated with a bookmark
			elemento.etiquetas = [];
			elemento.id = contenedorPadre.id + counterBookmarks;
			elemento.innerHTML = "BOOKMARK " + counterBookmarks;

			elemento.onclick = () => {
				clearContentContainer(document.getElementById("contenido"));
				elemento.etiquetas.forEach(etiqueta => {
					etiqueta.setAttribute("class", "crema contenedor-child");
					document.getElementById("contenido").insertBefore(etiqueta, document.getElementById((contenedorPadre.id, 'Drop')));
				})
			};

			/*
				Allow associating tags to bookmarks by drag and drop
			*/
			elemento.ondrop = (ev) => {
				// Check first if the target is a bookmark element
				if (ev.target.id.substring(0, 9) == "bookmarks") {
					ev.preventDefault();
					let duplicatedEle = document.getElementById(ev.dataTransfer.getData("id")).cloneNode(true);
					duplicatedEle.originalId = duplicatedEle.id;
					duplicatedEle.id += "Dup";

					console.log(duplicatedEle.attributes);
					elemento.etiquetas.push(duplicatedEle);

					duplicatedEle.onclick = () => {
						inputTitle.value = this.contenido["title"];
						inputUrl.value = this.contenido["url"];
						inputDescription.value = this.contenido["description"];

						/*
							Add the funcitonality to change the content of the tag
						*/
						inputTitle.onchange = () => {
							this.contenido["title"] = inputTitle.value;
						};

						inputUrl.onchange = () => {
							this.contenido["url"] = inputUrl.value;
						};

						inputDescription.onchange = () => {
							this.contenido["description"] = inputDescription.value;
						};
					};
				}
				console.log(elemento.etiquetas);
			};

			elemento.ondragover = (ev) => {
				// Check first if the target is a bookmark element
				if (ev.target.id.substring(0, 9) == "bookmarks") {
					ev.preventDefault();
				}
			};
		}

		elemento.setAttribute("class", "crema contenedor-child");
		document.getElementById(contenedorPadre.id).insertBefore(elemento, document.getElementById((contenedorPadre.id, 'Drop')));

		/*
			Element drag events (event.target)
		*/
		elemento.addEventListener("dragstart", function (event) {
			// The dataTransfer.setData() method sets the data type and the value of the dragged data
			event.dataTransfer.setData("id", event.target.id);
			// Change the border of the dragable element
			event.target.style.border = "1px solid grey";
		});
	}

	const agregarEtiqueta = document.getElementById("etiquetasAgregar");
	agregarEtiqueta.addEventListener("click", agregarHijos);

	const agregarBookmark = document.getElementById("bookmarksAgregar");
	agregarBookmark.addEventListener("click", agregarHijos);
}

window.onload = main;