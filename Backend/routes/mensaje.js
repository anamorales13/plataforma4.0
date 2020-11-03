

'use strict'

var express= require('express');
var mensajeController= require('../controllers/mensaje');


var router = express.Router(); //disponible el router
var md_auth= require('../Middleware/authenticated');

//var multipart = require('connect-multiparty'); 
//var md_upload = multipart({ uploadDir: './upload/documents'});



router.get('/probando', /*md_auth.ensureAuth,*/ mensajeController.probando);
router.post('/mensaje', mensajeController.save);
router.get('/myMessages/:id/:pages?', mensajeController.getReceivedMessage);
router.get('/messages/:id/:pages?', mensajeController.getEmittedMessage);
router.get('/mensajes-no-leidos/:id', mensajeController.getMensajesNoVisto);
router.get('/set-mensajes-leidos/:id', mensajeController.setMensajesVisto);
router.get('/mensaje/:id', mensajeController.getMensaje);
router.put('/marcar-leido/:id', mensajeController.marcarLeido);

module.exports=router;


