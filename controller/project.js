/* Es una especie de clase que va a tener una serie de metodos 
	o acciones que va a poder hacer relacionada con la entidad de projets*/

'use strict'

//Cargamos el modelo
const Project = require('../models/project');
const fs = require('fs');
const path = require('path')

//Se puede hacer un obejto json

const controller = {
	
	test: function(req , res) {
		var respuestaTest = res.status(200).send({
			message: 'Test para probar la API'
		});

		return respuestaTest;
	},
	////////////////////////////////////////////////////////////////////////////////////////////////////
	saveProject: function(req , res) {
		//Cuando hago new automaticamente le asigna un id
		var project = new Project();
		var params = req.body;
		
		//Seteamos los parametros
		project.titulo = params.titulo;
		project.descripcion = params.descripcion;
		project.fecha = params.fecha;
		project.imagen = null;

		//Guardar objeto en la base de datos
		//Usamos el orm de mogoose
		project.save((err, projectStored) =>{
			if (err) {return res.status(500).send({message: 'Error al guardar el documento'});};
			if (!projectStored) {return res.status(404).send({message: 'Error no se encontro'});};
			return res.status(200).send({project: projectStored});
		});
	},
	///////////////////////////////////////////////////////////////////////////////////////////////////
	getProject: function(req, res){

		var projectId = req.params.id;

		if (projectId == null) {return res.status(404).send({message: 'El projecto no tiene ID'})};
		//findby id es para buscar por id y tiene dos parametros

		Project.findById(projectId,(err, project) => {

			if (err) return res.status(500).send({message: 'Error al devolver los datos'});
			if (!project) return res.status(404).send({message: 'El projecto no existe'});
			return res.status(200).send({
				project
			});
		});
	},
	///////////////////////////////////////////////////////////////////////////////////////////////////
	getAll: function(req, res){
		//Se le puede pasar condiciones como where dentro del find
		//EJEMPLO Project.find({langs: 'PHP'})
		//sort es para ordenar
		Project.find({}).sort().exec((err, projects)=>{
			
			if (err) return res.status(500).send({message: 'Error al devolver los datos'});
			if (!projects) return res.status(404).send({message: 'No hay ningun proyecto'});
			return res.status(200).send({
				projects
			});
		});

	},
	//////////////////////////////////////////////////////////////////////////////////////////////////
	updateProject: function(req, res){
		var projectId = req.params.id;
		var update = req.body;

		Project.findByIdAndUpdate(projectId, update, (err , projectUpdate) => {

			if (err) return res.status(500).send({message: 'Error al actualizar'});
			if (!projectUpdate) return res.status(404).send({message: 'No hay ningun proyecto para actualizar'});
			return res.status(200).send({
				message: 'Se actualizo el siguiente proyecto',
				projectUpdate
			});

		});
	},
	/////////////////////////////////////////////////////////////////////////////////////////////////
	deleteProject: function(req, res){
		var projectId = req.params.id;

		Project.findByIdAndDelete(projectId, (err, projectDelete) => {

			if (err) return res.status(500).send({message: 'Error al eliminar'});
			if (!projectDelete) return res.status(404).send({message: 'No hay ningun proyecto para eliminar'});
			return res.status(200).send({
				message: 'Se eliminó el siguiente proyecto',
				project: projectDelete
			});
		});
	},
	////////////////////////////////////////////////////////////////////////////////////////////////
	uploadImage: function(req, res){
		var projectId = req.params.id;
		var fileName = 'Imagen no subida...';

		if(req.files){
			console.log(req.files)
			var filePath = req.files.imagen.path;
			var fileSplit = filePath.split('\\');
			var fileName = fileSplit[1];
			var extSplit = fileName.split('\.');
			var fileExt = extSplit[1];

			if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){

				Project.findByIdAndUpdate(projectId, {imagen: fileName}, {new: true}, (err, projectUpdated) => {
					if(err) return res.status(500).send({message: 'La imagen no se ha subido'});

					if(!projectUpdated) return res.status(404).send({message: 'El proyecto no existe y no se ha asignado la imagen'});

					return res.status(200).send({
						project: projectUpdated
					});
				});

			}else{
				fs.unlink(filePath, (err) => {
					return res.status(200).send({message: 'La extensión no es válida'});
				});
			}

		}else{
			return res.status(200).send({
				message: fileName
			});
		}

	},

	getImageFile: function(req, res){
		var file = req.params.imagen;
		console.log(file)
		var path_file = './fileUpload/'+file;

		fs.exists(path_file, (exists) => {
			if(exists){
				console.log('existe')
				return res.sendFile(path.resolve(path_file));
			}else{
				return res.status(200).send({
					message: "No existe la imagen..."
				});
			}
		});
	}
};

module.exports = controller;

//Se recomienda crear un fichero de rutas por cada uno de los controladores