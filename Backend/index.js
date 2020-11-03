/******* CONEXION A LA BASE DE DATOS ***** */

'use strict'

var mongoose = require('mongoose');

var app=require('./app');
var port= 3900;

/*
app.set('port', process.env.PORT || 3900);*/
/**/



mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/baseerasmus',{ useUnifiedTopology: true, useNewUrlParser: true})
        .then(()=>{
            console.log('La conexion a la BD se ha realizado con exito');

        //crear servidor y escuchar petición HTTP

        app.listen(port, ()=>{
            console.log("servidor corriendo en http://localhost:"+ port);
        });
        
        });