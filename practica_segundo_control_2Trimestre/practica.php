<?php
// CRITERIOS:
// -Leer este enunciado detenidamente. Durante el examen no hay preguntas.
// -El nombre del fichero para entregar esta indicado en la primera linea.
// -Entregar en la carpeta de clase.
// -Se pueden hacer multiples entregas.
// -Solo se evalua la última entrega dentro del tiempo.
// -Solo se evaluan los ficheros que cumplen exactamente con el nombre de fichero sino es cero.
// -Cada apartado completamente terminado y correcto es un punto sino es cero.
// -El no cumplimiento de las premisas supone un cero.

// PREMISAS:
// 1) Resolver en php(servidor) y js(javascript) sin html. El body esta vacio. Un solo fichero php.
// 2) Usar los siguientes datos, donde a y b deben tener la misma longitud
// var a=[7,8,4,6,5,4,3,2,1];
// var b=[10,500,200,1000,200,300,400,200,300];
// 3) El programa funcionará igual cambiando los datos por otros
// var a=[9,8,7,6,5,4,3];
// var b=[100,200,100,200,100,200,100];

// APARTADOS:
// 1) js envia una petición por cada pareja de numeros de los array a,b. Imprime la linea de enviado como aparece en pantalla.
// 2) js envia los datos en json, como aparece en la traza de red.
// 3) php recibe datos, hace una pausa activa con la funcion usleep, como aparece en la traza.
// 4) php responde enviando el dato, js recibe el dato, imprimir la linea recibido como aparece en pantalla.
// 5) sucesion ordenada de las peticiones, como aparece en pantalla y final ordenado.
// 6) añade la función tiempo y usala para calcular e imprimir el tiempo actual en cada linea como aparece en pantalla.

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
	usleep(200);

	$data = json_decode(file_get_contents("php://input"));
	echo $data;
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>
</head>

<body>
	<script type="text/javascript">
		var a1 = [7, 8, 4, 6, 5, 4, 3, 2, 1];
		var b1 = [10, 500, 200, 1000, 200, 300, 400, 200, 300];

		var a2 = [9, 8, 7, 6, 5, 4, 3];
		var b2 = [100, 200, 100, 200, 100, 200, 100];

		const enviarRecibirDatos1 = async (...array1, ...array2) => {
			let arrayPromises = [];

			for (let i = 0; i < array1.length; i++) {

				const promise = fetch('practica.php', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					redirect: 'follow',
					referrerPolicy: 'no-referrer',
					body: JSON.stringify({
						"num1": array1[i],
						"num2": array2[i]
					})
				});
				arrayPromises.push(response);
			}

			console.log("enviado");
			console.time("Traza de tiempo");

			const response = await Promise.all(arrayPromises);
			console.log(response);

			console.timeEnd("Traza de tiempo");
			console.log("recibido");
		}

		const enviarRecibirDatos2 = async (...array1, ...array2) => {
			for (let i = 0; i < array1.length; i++) {

				const promise = fetch('practica.php', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					redirect: 'follow',
					referrerPolicy: 'no-referrer',
					body: JSON.stringify({
						"num1": array1[i],
						"num2": array2[i]
					})
				});

				console.log("enviado");
				console.time("Traza de tiempo");

				const response = await promise;
				console.log(response);

				console.timeEnd("Traza de tiempo");
				console.log("recibido");
			}
		}
	</script>
</body>

</html>