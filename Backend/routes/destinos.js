'use strict'

var express= require('express');
var DestinoController= require('../controllers/destinos');


var router = express.Router(); //disponible el router

var multipart = require('connect-multiparty'); 
var md_upload = multipart({ uploadDir: './upload/documents'});


router.post('/save', DestinoController.save);
router.get('/buscar',DestinoController.buscar );

router.delete('/delete/:id', DestinoController.borrar);
router.get('/destinos' , DestinoController.getDestinos);
router.get('/destino/:id' , DestinoController.getdestino);
router.put('/update_coordinador/:id', DestinoController.putcoordinador);
router.put('/updateProfesor/:id', DestinoController.updateprofesor);

module.exports= router;