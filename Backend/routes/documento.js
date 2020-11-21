'use strict'

var express= require('express');
var DocumentoController= require('../controllers/documento');


var routerDoc = express.Router(); //disponible el router

var multipart = require('connect-multiparty'); 
var md_upload = multipart({ uploadDir: './upload/documents'});


//RUTAS VALIDAS

routerDoc.post('/saveDoc', DocumentoController.save);
routerDoc.get('/documentosAlumnos/:id/:idprofesor', DocumentoController.getDocumentosAlumnos);
routerDoc.get('/documentosProfesor/:id/:idalumno', DocumentoController.getDocumentosProfesor);
routerDoc.post('/upload-image/:id', md_upload, DocumentoController.upload)
routerDoc.get('/get-image/:image', DocumentoController.getImage);
routerDoc.delete('/delete/:title', DocumentoController.delete);
routerDoc.get('/mydropboxProfesor/:id', DocumentoController.getmydropbox);
routerDoc.get('/mydropboxAlumno/:id', DocumentoController.getmydropboxAlumno);

module.exports= routerDoc;