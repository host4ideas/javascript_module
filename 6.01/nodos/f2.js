// var ele = document.createElement('div');
// ele.innerHTML = 'Dibujo de los nodos del DOM<p>(por tipo de nodo)</p>';
// document.body.appendChild(ele);
var root = document.documentElement;
var arbolNodos = root.childNodes;

console.log(arbolNodos);

var arbol = document.createElement("ul");

arbolNodos.forEach(nodo => {
    if (nodo.nodeValue == undefined) {
        var tipoNodo = nodo.tagName;
        var mostrarNodo = document.createElement("li");
        mostrarNodo.style.border = "1px solid black";
        mostrarNodo.style.width = "200px";
        mostrarNodo.innerHTML = tipoNodo;
        arbol.appendChild(mostrarNodo);

        var hijosNodo = nodo.childNodes;
        var arrayDivs = [];
        if (hijosNodo.length > 0) {
            console.log(hijosNodo);
            var mostrarHijos = document.createElement("ul");
            hijosNodo.forEach(hijo => {
                if (hijo.nodeValue == undefined) {
                    var infoHijo = document.createElement("li");
                    infoHijo.style.border = "1px solid black";
                    var tipoHijo = hijo.tagName;
                    infoHijo.innerHTML = tipoHijo;
                    mostrarHijos.appendChild(infoHijo);
                }
            });
            mostrarNodo.appendChild(mostrarHijos);
        }
    }
});

document.body.appendChild(arbol);

function crearArbol(float, innerHtml, marginLeft = "0") {
    var div = document.createElement("div");
    div.innerHTML = innerHtml;
    div.style.border = "1px solid black";
    div.style.cssFloat = float;
    div.style.marginLeft = marginLeft;
    return div;
}