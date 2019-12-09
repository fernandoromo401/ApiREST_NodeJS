'use strict'

//Cargar el modulo de express y el modulo creado en el controller

var express = require('express');
var projectController = require('../controller/project');

//cargamos el router que tiene muchos metodos para acceder a ella
var router = express.Router();

//Middlerware de la dependencia multipart -> se ejecuta antes de que se ejecute el metodo del controlador

var multipart = require('connect-multiparty');
var middlewareUploadFile = multipart({ uploadDir: './fileUpload'});

//accedemos con get al metodo del controlador


router.get('/test', projectController.test);

router.post('/save', projectController.saveProject);
router.post('/upload-image/:id', middlewareUploadFile, projectController.uploadImage);
router.get('/get-image/:imagen', projectController.getImageFile);

router.get('/getID/:id', projectController.getProject);
router.get('/getAll', projectController.getAll);

router.put('/update/:id', projectController.updateProject);

router.delete('/delete/:id', projectController.deleteProject);


//ahora exporto

module.exports = router;