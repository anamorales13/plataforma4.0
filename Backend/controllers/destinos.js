
var validator = require('validator');
var Destino = require('../models/destinos');
var fss = require('fs');
var path = require('path');

var express = require("express");

var session = require("express-session");

var app = express();

app.use(session({
    secret: "1352ljdainekg875d",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))

var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');

var controllers = {


    save: (req, res) => {

        var params = req.body;
        var destino = new Destino();
    

        destino.pais = params.pais;
        destino.ciudad = params.ciudad;
        destino.carrera = params.carrera;
        destino.profesor = params.profesor;
        destino.coordinador=params.coordinador;



        destino.save((errn, destinoStored) => {

            if (errn || !destinoStored) {
                return res.status(500).send({
                    status: 'error',
                    message: 'El destino no se ha guardado'
                });
            }

            return res.status(200).send({
                status: 'sucess',
                destino: destinoStored
            });

        });

    },

    putcoordinador:(req,res) =>{
        var id= req.params.id;
        var update= req.body;

        Destino.findByIdAndUpdate(req.params.id, { $set: { coordinador: update.value } }, { new: true }, function (err, destino) {
            if (err || !destino) {
                return res.status(500).send({
                    status: 'error',
                    message: 'El destino no se ha guardado'
                });
            }

            return res.status(200).send({
                status: 'sucess',
                destino: destino
            });
        });
    },

    buscar: (req, res) => {
        var params = req.body;

        Destino.find({ ciudad: { $eq: params.ciudad }, carrera: { $eq: params.carrera }, })
            .exec((err, destino) => {

                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error en la petición'
                    });
                }

                if (!destino) {
                    return res.status(404).send({
                        status: 'error',
                        message: ' no hay documentos '
                    });
                }



                return res.status(200).send({
                    destino
                });
            });


    },

    getDestinos: (req, res) => {

        Destino.find().populate('profesor coordinador', '_id nombre apellido1 apellido2 telefono despacho edificio')
            .exec((err, destino) => {

                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error en la petición'
                    });
                }

                if (!destino || destino.length <= 0) {
                    return res.status(404).send({
                        status: 'error',
                        message: ' no hay documentos'
                    });
                }
                console.log('hola');
                return res.status(200).send({

                    status: 'sucess',
                    destino
                });
            });

    },

    getdestino: (req, res) => {
        var destinoId = req.params.id;
        console.log(destinoId);

        Destino.findById(destinoId).populate('profesor coordinador', 'nombre apellido1 apellido2 edificio despacho telefono') 
                .exec((err, destinoget )=> {
            if (err) {
                return res.status(500).send({
                    message: 'Error en la petición'
                });
            }
            if (!destinoget) {
                return res.status(404).send({
                    message: 'El usuario no existe'
                });
            }

            return res.status(200).send({
                status: 'sucess',
                destinoget
            });
        })
    },

    
}

module.exports = controllers;