import React, { Component } from 'react';
import NuevoDocumento from './NuevoDocumento';

import GlobalDocumentos from '../GlobalDocumentos';
import '../assets/css/NuevoUsuario.css';
import Documentos from './Documentos';
import Spinner from 'react-bootstrap/Spinner';
import '../assets/css/dropbox.css';
import axios from 'axios';
import Moment from 'react-moment';
import Global from '../Global';
import ButtonIcon from "@material-ui/core/Button";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import swal from 'sweetalert';

/*IMAGENES - BOTONES */
import btn1 from '../assets/images/word.png';
import btn2 from '../assets/images/pdf.png';
import btn3 from '../assets/images/powerpoint.jpg';
import btn4 from '../assets/images/default.png';
import SelectInput from '@material-ui/core/Select/SelectInput';


class Dropbox extends Component {

    url = GlobalDocumentos.url;


    state = {
        documentos: [],
        docprofesor: [],
        status: null,
        identity: null,
        alumno: {},



    };

    url = GlobalDocumentos.url;
    urlalumno = Global.urlalumno;



    constructor(props) {
        super(props);
        this.state = {
            identity: JSON.parse(localStorage.getItem('user')),
        };

    }


    componentWillMount() {
        this.getDocumentos();
    }

    componentDidMount() {
        this.getDocumentos();
    }


    getDocumentos() {

        var id = this.props.match.params.id;



        if (this.state.identity.tipo=== 'Alumno') { //view: alumno

            /*axios.get(this.url + "documentosAlumnos/" + this.state.identity._id + '/' + this.state.identity.profesor)
                .then(res => {
                    this.setState({
                        documentos: res.data.documento,
                        status: 'sucess'
                    });
                });*/

            axios.get(this.url + "documentosProfesor/" + this.state.identity.profesor + '/' + this.state.identity._id)
                .then(res => {
                    this.setState({
                        docprofesor: res.data.documento,
                        status: 'sucess'
                    });
                });


        }
        else { //view: profesor

            /* axios.get(this.url + "documentosAlumnos/" + id + '/'+ this.state.identity._id)
                 .then(res => {
                     this.setState({
                         documentos: res.data.documento,
                         status: 'sucess'
                     });
                 });
             */
            axios.get(this.url + "documentosProfesor/" + this.state.identity._id + '/' + id)
                .then(res => {
                    this.setState({
                        docprofesor: res.data.documento,
                        status: 'sucess'
                    });
                });

        }
    }

    delete(title) {
        axios.delete(this.url + "delete/" + title)
            .then(res => {
                this.setState({
                    status: 'sucess'
                })
            })
        swal(
            'Documento eliminado con exito',
            'El documento ha sido eliminado correctamente',
            'success'
        )

        this.forceUpdate();
    }



    render() {

        if (this.state.docprofesor != undefined) {
            var listardocumentos = this.state.docprofesor.map((documentos) => {
                return (
                    <div className="documento-item">

                        <table aria-rowcount={this.state.docprofesor.length} className="table-dropbox">
                            <tbody>
                                <tr>
                                    <td >
                                        <div>

                                            {
                                                documentos.tipoDocumento == "word.png" ? (
                                                    <img src={btn1} alt="prueba" className="image-wrap" />
                                                ) : documentos.tipoDocumento == "pdf.png" ? (
                                                    <img src={btn2} alt="prueba" className="image-wrap" />
                                                ) : documentos.tipoDocumento == "powerpoint.jpg" ? (
                                                    <img src={btn3} alt="prueba" className="image-wrap" />
                                                ) : documentos.tipoDocumento == "imagen" ? (
                                                    <img src={this.url + 'get-image/' + documentos.url} alt={documentos.title} className="image-wrap" />
                                                ) :
                                                                (
                                                                    <img src={btn4} alt="prueba" className="image-wrap" />
                                                                )
                                            }

                                        </div>
                                        <div>
                                            <a target="_blank" href={this.url + '/get-image/' + documentos.url}>{documentos.title}</a>
                                        </div>
                                    </td>
                                    <td>
                                        {documentos.propietario==='Alumno' ? (
                                              documentos.alumno.nombre + " " + documentos.alumno.apellido1 + " " + documentos.alumno.apellido2
                                        ): 
                                        documentos.profesor.nombre + " " + documentos.profesor.apellido1 + " " + documentos.profesor.apellido2
                                        }
                                      
                                    </td>

                                    <td>
                                        <spain>
                                            <Moment format="DD-MM-YYYY">{documentos.date}</Moment>
                                        </spain>

                                    </td>
                                    <td className="th-pequeño">
                                        <ButtonIcon onClick={() => { if (window.confirm('\n' + 'Estas seguro de eliminar el archivo ' + documentos.title + '?')) this.delete(documentos.title); }}
                                            className="btn-delete" startIcon={<DeleteIcon />}></ButtonIcon>
                                    </td>

                                </tr>
                            </tbody>
                        </table>

                        <div className="clearfix"></div>
                    </div>
                );
            });
            return (

                <div className="grid-documentos">
                    <div >

                        {this.props.match.params.nombre != null &&
                            <div>
                                <h1 className="titulo-secundario">DROPBOX</h1>
                                <h4 className="subtitulo-doc">Alumno: {this.props.match.params.nombre + " " + this.props.match.params.apellido1 + "  " + this.props.match.params.apellido2}</h4>
                            </div>
                        }
                        {this.state.identity.tipo == "Alumno" &&
                            <h1 className="titulo-doc">DROPBOX</h1>
                        }

                    </div>
                    <div className=" grid-documentos-col">
                        <div>
                            <div >

                                <table className="table-dropbox dropbox-cabecera">
                                    <thead >
                                        <tr>
                                            <th >Nombre</th>
                                            <th >Subido por:</th>
                                            <th>Fecha de subida</th>
                                            <th className="th-pequeño"></th>

                                        </tr>
                                    </thead>
                                </table>

                            </div>
                            {listardocumentos}

                        </div>
                        <div className="btn-docOficial">
                            <NuevoDocumento type="documento" alumno={this.props.match.params.id} message="hola" />
                        </div>

                    </div>

                </div>

            );
        } else {
            return (
                <div className="grid-documentos">
                    <div >
                        <h1 className="titulo-secundario">DROPBOX</h1>
                        {this.props.match.params.nombre != null &&
                            <h4 className="subtitulo-doc">{this.props.match.params.nombre + " " + this.props.match.params.apellido1 + "  " + this.props.match.params.apellido2}</h4>
                        }
                    </div>
                    <div className=" grid-documentos-col">
                        <div>
                            <div >
                                <Spinner animation="border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </Spinner>
                            </div>

                        </div>
                        <div className="btn-docOficial">


                            <NuevoDocumento type="documento" alumno={this.props.match.params.id} message="hola" />


                        </div>

                    </div>

                </div>
            );

        }


    }
}

    export default Dropbox;