'use strict'

var jwt= require('jwt-simple');
var moment=require('moment');
var secret ='clave_secreta_plataforma_erasmus_trabajo_findegrado';

exports.ensureAuth= function(req,res,next){

    if(!req.headers.authorization){ //si esto no me llega
        return res.status(403).send({
            message: 'La petición no tiene la cabecera de authentication'
        })

    }

    var token = req.headers.authorization.replace(/['"]+/g, ''); //limpiar el token de comillas simples y dobles

    //decodificar el token
    try{
        var payload = jwt.decode(token, secret);
        if(payload.exp <= moment().unix()){
            return res.status(401).send()({
                message: 'El token ha expirado'
            });
        }
    }catch(ex){
        return res.status(404).send({
            message: 'No valido'
        })
    }
    
    req.users = payload;

    next();

}
    


