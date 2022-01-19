function allowDrop(ev) {
	ev.preventDefault();
}

function drag(ev) {
	ev.dataTransfer.setData("id", ev.target.id);
}

function drop(ev) {
	ev.preventDefault();
	var data = ev.dataTransfer.getData("id");

	/*
		Si el elemento se intenta eliminar en el drop correspondiente, permitir eliminacion
		a lo largo de todo el DOM. Tanto los "originales" como las etiquetas duplicadas
	*/
	if (data.substring(0, 9) == "etiquetas" && ev.target.id == "etiquetasDrop" || data.substring(0, 9) == "bookmarks" && ev.target.id == "bookmarksDrop") {
		while (ele = document.getElementById(data)) {
			ele.remove();
			listaBookmarks.delete(ele);
		}
		while (ele = document.getElementById((data + "Dup"))) {
			ele.remove();
			document.getElementById(ele.bookmarkParent).etiquetas.delete(ele);
		}
	}

	/*
		Si el elemento que se hace drop es una etiqueta duplicada asociada a un bookmark,
		eliminar el elemento *solo del contenedor contenido* y de la lista de etiquetas
		asociadas al bookmark
	*/
	if (ev.target.id == "contenidoDrop" && data.substring(data.length - 3) == "Dup") {
		const duplicatedEle = document.getElementById(data);
		// Eliminar duplicado del DOM
		duplicatedEle.remove();
		// Eliminar duplicado del array de etiquetas del bookmark asociado
		document.getElementById(duplicatedEle.bookmarkParent).etiquetas.delete(duplicatedEle);
	}
}

/*
	Limpiar de etiquetas el contenedor CONTENIDO cada vez que se hace click en un bookmark
*/
const clearContentContainer = (parent) => {
	Array.from(parent.children).filter((child) => child.classList.contains('crema', 'contenedor-child'))
		.forEach(elementChild => parent.removeChild(elementChild));
};

const main = () => {
	const inputTitle = document.getElementById("tagTitle");
	const inputUrl = document.getElementById("tagUrl");
	const inputDescription = document.getElementById("tagDescription");

	// El set permite evitar los duplicados y nos facilita ciertas tareas
	let listaBookmarks = new Set();
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
			elemento.id = contenedorPadre.id + counterEtiquetas;
			elemento.innerHTML = "ETIQUETA " + counterEtiquetas;

			// Añadir al filtro la etiqueta
			var newOption = document.createElement("option");
			newOption.value = elemento.id;
			newOption.id = elemento.id;
			newOption.innerText = elemento.innerHTML;
			newOption.setAttribute("class", "crema filter-option");
			document.getElementById("filtroEtiquetas").appendChild(newOption);

		} else if (nombreContenedorPadre == "BOOKMARKS") {
			// Sumar 1 al counter por cada bookmark añadido
			counterBookmarks++;
			// Guardamos la info del bookmark como objeto
			elemento.contenido = {
				title: "Titulo de prueba",
				url: "https://www.google.es/",
				description: "Descripción"
			}
			// Array de etiquetas asociadas al bookmark
			elemento.etiquetas = new Set();
			elemento.id = contenedorPadre.id + counterBookmarks;
			elemento.innerHTML = "BOOKMARK " + counterBookmarks;
			listaBookmarks.add(elemento);

			/*
				Funcionalidad para mostrar la info del bookmark
			*/
			elemento.onclick = () => {
				clearContentContainer(document.getElementById("contenido"));

				inputTitle.value = elemento.contenido["title"];
				inputUrl.value = elemento.contenido["url"];
				inputDescription.value = elemento.contenido["description"];

				/*
					Funcionalidad para cambiar el contenido del bookmark,
					actualizamos el bookmark de la lista por cada change
				*/
				inputTitle.onchange = () => {
					elemento.contenido["title"] = inputTitle.value;
					listaBookmarks.delete(elemento);
					listaBookmarks.add(elemento);
				};

				inputUrl.onchange = () => {
					elemento.contenido["url"] = inputUrl.value;
					listaBookmarks.delete(elemento);
					listaBookmarks.add(elemento);
				};

				inputDescription.onchange = () => {
					elemento.contenido["description"] = inputDescription.value;
					listaBookmarks.delete(elemento);
					listaBookmarks.add(elemento);
				};

				elemento.etiquetas.forEach(etiqueta => {
					etiqueta.setAttribute("class", "crema contenedor-child");
					document.getElementById("contenido").insertBefore(etiqueta, document.getElementById((contenedorPadre.id, 'Drop')));
				})
			};

			/*
				Permitir asociar etiquetas a bookmarks mediante drag and drop
			*/
			elemento.ondrop = (ev) => {
				// Check first if the target is a bookmark element
				if (ev.target.id.substring(0, 9) == "bookmarks") {
					ev.preventDefault();
					let duplicatedEle = document.getElementById(ev.dataTransfer.getData("id")).cloneNode(true);
					duplicatedEle.bookmarkParent = ev.target.id;
					duplicatedEle.id += "Dup";

					// Añadir la etiqueta a la lista de etiquetas asociadas al bookmark
					elemento.etiquetas.add(duplicatedEle);

					// Actualizamos la lista de bookmarks
					listaBookmarks.delete(elemento);
					listaBookmarks.add(elemento);


					// Guardar el id del elemento duplicado con setData
					duplicatedEle.addEventListener("dragstart", function (event) {
						// The dataTransfer.setData() method sets the data type and the value of the dragged data
						event.dataTransfer.setData("id", event.target.id);
						// Change the border of the dragable element
						event.target.style.border = "1px solid grey";
					});
				}
				console.log(elemento.etiquetas);
			};

			elemento.ondragover = (ev) => {
				ev.preventDefault();
			};
		}

		elemento.setAttribute("class", "crema contenedor-child");
		document.querySelector(`#${contenedorPadre.id} > div.tags`).appendChild(elemento);

		/*
			Dragstart event para todos los tipos de elemento
		*/
		elemento.addEventListener("dragstart", function (event) {
			// The dataTransfer.setData() method sets the data type and the value of the dragged data
			event.dataTransfer.setData("id", event.target.id);
			// Change the border of the dragable element
			event.target.style.border = "1px solid grey";
		});
	}

	/*
		Debido a un bug sin resolver, para poder utilizar el filtro, primero se debe de haber 
		hecho click en el bookmark
	*/
	const filtrarBookmarksTodos = () => {
		const tagsBookmarksDiv = document.querySelector("#bookmarks > .tags");

		const selected = document.querySelectorAll('#filtroEtiquetas option:checked');
		const values = Array.from(selected).map(el => el.value);

		let bookmarksFiltrados = [];

		listaBookmarks.forEach(bookmark => {
			values.forEach(etiquetaID => {
				if (bookmark.etiquetas.has(document.getElementById((etiquetaID + "Dup")))) {
					bookmarksFiltrados.push(bookmark);
				}
			});
		});

		console.log(bookmarksFiltrados);

		while (tagsBookmarksDiv.firstChild) {
			tagsBookmarksDiv.removeChild(tagsBookmarksDiv.firstChild);
		}

		bookmarksFiltrados.forEach(bookmark => {
			tagsBookmarksDiv.appendChild(bookmark);
		});
	};

	const filtrarBookmarksNinguno = () => {
		const tagsBookmarksDiv = document.querySelector("#bookmarks > .tags");

		// Limpiamos la vista de bookmarks para imprimir los originales sin filtro
		while (tagsBookmarksDiv.firstChild) {
			tagsBookmarksDiv.removeChild(tagsBookmarksDiv.firstChild);
		}

		listaBookmarks.forEach(bookmark => {
			tagsBookmarksDiv.appendChild(bookmark);
		});
	};

	/*
		Agregar onclick para los botones que permiten cambiar el modo de filtrado
	*/
	document.getElementById("filtroTodas").onclick = () => {
		filtrarBookmarksTodos();
	};

	document.getElementById("filtroNinguna").onclick = () => {
		filtrarBookmarksNinguno();
	};

	/*
		Agregar onclick para los botones de agregar etiquetas y bookmarks
	*/
	const agregarEtiqueta = document.getElementById("etiquetasAgregar");
	agregarEtiqueta.addEventListener("click", agregarHijos);

	const agregarBookmark = document.getElementById("bookmarksAgregar");
	agregarBookmark.addEventListener("click", agregarHijos);
}

window.onload = main;