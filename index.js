'use strict'

var mongoose = require('mongoose'); //Importar el modulo de mongoose con la funcion require y cargo el modulo ('mongoose')
var app = require('./app'); //Iportamos el modulo app.js creado por nosotros // .js no hace falta xq ya lo reconoce
var port = 9000; //Indicamos el puerto de nuestro servidor

//realizar la conexion

//indicar que es una promesa

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/portafolio')
	//Como es una promesa puedo utilizar el metodo then para comprobar si se conecta sino usar un catch
	//Metodo then tiene una funcion de callback
	.then(() => {
		console.log('Conexion establecida a MONGODB...');

		//Aca ejecutamos la creacion del servidor (app.js)
			//listen tiene varios paramentros
		app.listen(port, () =>{
			console.log('Servidor corriendo correctamente en el puerto 9000');
		})
	})
	.catch(err => console.log(err));

	//ejecutar npm start para iniciar

	/////////////////////////////////////////////////////////////////////////////////////


// Crear un servidor con nodejs y express, esto es el motor de la aplicacion xq express tiene un sistema de rutas y trabaja protoloco http

//Crear archivo app.js