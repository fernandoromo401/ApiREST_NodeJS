'use strict'

//Cargar el modulo de express

var express = require('express');
var bodyParser = require('body-parser');

//crear variable app para ejecutar la funcion de express
var app = express();

//Cargar archivos de Rutas

var project_routes = require('./routes/project');

//--------------------------------------------

//Middelewares es una capa que se ejecuta antes de ejecutar una accion del controlador

//crear uno global utilizando el objeto de express que es (app) utilizando el metodo "use"
//Luego utilizar boy-parser para convertir lo que me llegue a json
//extended es una config necesaria para body parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//--------------------------------------------

//CORS

// configurar cabeceras http
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
 
    next();
});

//--------------------------------------------

//crear Rutas

//segundo parametro son las rutas que cargo arriba
app.use('/api/v1', project_routes)

//--------------------------------------------

//exportar este modulo app.js
	//exportar variable app
module.exports = app;