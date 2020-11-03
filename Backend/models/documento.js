
'use strict'

var mongoose= require('mongoose');
var Schema = mongoose.Schema;



const DocumentosSchema = Schema({
    //_alumno: {type:Number, ref: 'Alumno'},
    title:String,
    url: String,
    tipoDocumento:String,
    comentario: String, 
    date: {type:Date, default: Date.now},
    link:String,
    /*alumno: {
       type: Schema.Types.ObjectId,
       ref: "Alumno"
    }*/
    alumno: {type: Schema.ObjectId, ref: 'Alumno'},
    profesor: {type: Schema.ObjectId, ref: 'Profesor'},
 });


 module.exports= mongoose.model('Documentos', DocumentosSchema);