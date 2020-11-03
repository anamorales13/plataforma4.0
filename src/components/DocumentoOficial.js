import React, { Component } from 'react';

import axios from 'axios';

import '../assets/css/documentos.css';

import NuevoDocumento from './NuevoDocumento';
import Global from '../Global';
import doc from '../assets/images/default-document.png';
import Modal from 'react-bootstrap/Modal';
import Moment from 'react-moment';


class DocumentoOficial extends Component {

    url = Global.url;
    nombre = "";
    estadoRef=React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            identity: JSON.parse(localStorage.getItem('user')),
            alumno: {},
            status: null,
            open: false,
            estado:"",

        };


    }


    openModal = (name) => {
        this.nombre = name;
        this.setState({ open: true });
    }

    onCloseModal = () => {
        this.setState({ open: false })
    }

    componentWillMount() {
        this.getDocumentos();

    }


    componentDidMount() {
        this.getDocumentos();
    }

    getDocumentos() {
      
        //ventana del alumno
        if (this.props.match.params.id == null) {
            axios.get(this.url + "getdocumentos" + "/" + this.state.identity._id)
                .then(res => {
                    if (res.data.alumno) {
                        this.setState({
                            alumno: res.data.alumno,
                            status: 'sucess'
                        });

                        console.log(this.state.alumno.length)

                    }


                });
        } else {
            //ventana del profesor
            axios.get(this.url + "getdocumentos" + "/" + this.props.match.params.id)
                .then(res => {
                    if (res.data.alumno) {
                        this.setState({
                            alumno: res.data.alumno,
                            status: 'sucess'
                        });

                        console.log(this.state.alumno.length)

                    }


                });
        }


    }

    changeEstado=()=>{
        this.setState({
            estado: this.estadoRef.current.value
        })

    }

  
    //SOLO PROFESOR
    modificarEstado=()=>{
       
        console.log(this.nombre);
        var body ={
            estado: this.state.estado
        }

    
            axios.put(this.url+"cambioEstado/" + this.props.match.params.id + "/"  + this.nombre, body)
            .then(res=>{
                this.setState({
                    status:'sucess'
                })
            })
            this.notificarAlumno();
        

    
    }


    
    notificarAlumno=()=>{
        var mensaje = {
            asunto: 'Modificación documento '+this.nombre ,
            texto: 'El estado del documento ' +  this.nombre + ' ha sido modificado por el profesor ' + this.state.identity.nombre + " " + this.state.identity.apellido1 + " " + this.state.identity.apellido2
                + '  Puede obtener más información en el apartado de DOCUMENTOS. ',
            emisor: { profesor: '5f7c4c32fceb54223c41cf44'},
            receptor: { alumno: this.props.match.params.id  }
        }

        axios.post('http://localhost:3900/api/mensaje', mensaje)
        .then(res => {
            this.setState({
                nuevoMensaje: res.data.mensaje,
                status: 'sucess',
            });
        })
        .catch(err => {
            this.setState({
                status: 'failed'
            });
        });
    }

    render() {

        if (this.state.alumno.length == 1) {
            return (
                <div className="grid-row">
                    {/* TITULO - fila 1  */}
                    <div>
                        {this.state.identity.tipo === "profesor" &&
                            <div>
                                <h1 className="titulo-secundario">DOCUMENTOS OFICIALES</h1>
                                <h4 className="subtitulo-doc">{this.state.alumno[0].nombre + " " + this.state.alumno[0].apellido1 + "  " + this.state.alumno[0].apellido2}</h4>
                            </div>
                        }
                        {this.state.identity.tipo === "Alumno" &&
                            <h1 className="titulo-doc">DOCUMENTOS OFICIALES</h1>
                        }
                    </div>
                    {/* FILA 2 */}
                    <div className="grid-col">
                        {/* COLUMA 1 */}
                        <div>
                            <article className="card-doc">
                                <h5>Checklist</h5>
                            </article>
                        </div>
                        {/* COLUMA 2 */}
                        <div>
                            <div className="grid-row-docgeneral">
                                {/* TITULO PARTE 1 */}
                                <div>
                                    <h1> · Antes del Erasmus </h1>

                                </div>
                                {/*DOCUMENTO 1 -2 */}
                                <div>
                                    <div className="grid-documentosofi">
                                        {/*     documento 1      */}

                                        <div className="grid-documentos-dos">
                                            <div className="doc-default">
                                                <img src={doc} />
                                            </div>
                                            <div className="datos-doc">
                                                <h3 id="title-doc"> CPRA </h3>


                                                {this.state.alumno[0].documentos[0].estado === 'En tramite' &&

                                                    <h5 id="estado-doc">Estado : <strong style={{ color: 'blue' }}>En trámite</strong>
                                                        <button onClick={() => this.openModal('CPRA')} id="edit-style" style={this.props.match.params.id ? { color: 'blue' } : { display: 'none' }}> <span className="glyphicon glyphicon-pencil"></span></button></h5>
                                                }
                                                {this.state.alumno[0].documentos[0].estado === 'Aceptado' &&

                                                    <h5 id="estado-doc">Estado : <strong style={{ color: 'green' }}>Aceptado</strong>
                                                        <button onClick={() => this.openModal('CPRA')} id="edit-style" style={this.props.match.params.id ? { color: 'green' } : { display: 'none' }}> <span className="glyphicon glyphicon-pencil"></span></button></h5>

                                                }
                                                {this.state.alumno[0].documentos[0].estado === 'No Aceptado' &&

                                                    <h5 id="estado-doc">Estado : <strong style={{ color: 'red' }}>No Aceptado</strong>
                                                        <button onClick={() => this.openModal('CPRA')} id="edit-style" style={this.props.match.params.id ? { color: 'red' } : { display: 'none' }}> <span className="glyphicon glyphicon-pencil"></span></button></h5>

                                                }
                                                {this.state.alumno[0].documentos[0].estado === 'No Presentado' &&
                                                    <h5 id="estado-doc">Estado : <strong style={{ color: 'grey' }}>No Presentado</strong> </h5>
                                                }

                                                {this.state.alumno[0].documentos[0].estado != 'No Presentado' &&
                                                    <div>
                                                        <a id="link-doc" target="_blank" href={this.url+'/get-image/' + this.state.alumno[0].documentos[0].url}>
                                                            <span className="glyphicon glyphicon-download-alt">
                                                            
                                                            </span>

                                                        </a>
                                                        <h5 id="estado-doc" style={{fontSize:'16px'}}>Ultima modificación:  <Moment format="DD-MM-YYYY">{this.state.alumno[0].documentos[0].fecha}</Moment></h5>
                                                    </div>
                                                }



                                            </div>
                                        </div>

                                        {/*     documento 2      */}

                                        <div className="grid-documentos-dos">
                                            <div className="doc-default">
                                                <img src={doc} />
                                            </div>
                                            <div>
                                                <h3 id="title-doc"> Learning Agreement </h3>
                                                {this.state.alumno[0].documentos[1].estado === 'En tramite' &&
                                                    <h5 id="estado-doc">Estado : <strong style={{ color: 'blue' }}>En trámite</strong>
                                                        <button onClick={() => this.openModal('Learning_Agreement')} id="edit-style" style={this.props.match.params.id ? { color: 'blue' } : { display: 'none' }}> <span className="glyphicon glyphicon-pencil"></span></button></h5>

                                                }
                                                {this.state.alumno[0].documentos[1].estado === 'Aceptado' &&
                                                    <h5 id="estado-doc">Estado : <strong style={{ color: 'green' }}>Aceptado</strong>
                                                        <button onClick={() => this.openModal('Learning_Agreement')} id="edit-style" style={this.props.match.params.id ? { color: 'green' } : { display: 'none' }}> <span className="glyphicon glyphicon-pencil"></span></button></h5>

                                                }
                                                {this.state.alumno[0].documentos[1].estado === 'No Aceptado' &&
                                                    <h5 id="estado-doc">Estado : <strong style={{ color: 'red' }}>No Aceptado</strong>
                                                        <button onClick={() => this.openModal('Learning_Agreement')} id="edit-style" style={this.props.match.params.id ? { color: 'red' } : { display: 'none' }}> <span className="glyphicon glyphicon-pencil"></span></button></h5>

                                                }
                                                {this.state.alumno[0].documentos[1].estado === 'No Presentado' &&
                                                    <h5 id="estado-doc">Estado : <strong style={{ color: 'grey' }}>No Presentado</strong> </h5>
                                                }
                                                {this.state.alumno[0].documentos[1].estado != 'No Presentado' &&
                                                <div>
                                                    <a id="link-doc" target="_blank" href={this.url + '/get-image/' + this.state.alumno[0].documentos[1].url}>
                                                        <span className="glyphicon glyphicon-download-alt"></span>
                                                    </a>
                                                    <h5 id="estado-doc" style={{fontSize:'16px'}}>Ultima modificación:  <Moment format="DD-MM-YYYY">{this.state.alumno[0].documentos[1].fecha}</Moment></h5>
                                                </div>
                                                }


                                            </div>
                                        </div>


                                    </div>
                                </div>

                                {/*DOCUMENTO 3*/}
                                <div>
                                    <h1> · Durante el Erasmus</h1>
                                </div>
                                <div>
                                    <div className="grid-documentosofi">
                                        {/*     documento 3    */}

                                        <div className="grid-documentos-dos">
                                            <div className="doc-default">
                                                <img src={doc} />
                                            </div>
                                            <div className="datos-doc">
                                                <h3 id="title-doc"> Modificación CPRA </h3>

                                                {this.state.alumno[0].documentos[2].estado === 'En tramite' &&
                                                    <h5 id="estado-doc">Estado : <strong style={{ color: 'blue' }}>En trámite</strong>
                                                        <button onClick={() => this.openModal('Modificación_CPRA')} id="edit-style" style={this.props.match.params.id ? { color: 'blue' } : { display: 'none' }}> <span className="glyphicon glyphicon-pencil"></span></button></h5>

                                                }
                                                {this.state.alumno[0].documentos[2].estado === 'Aceptado' &&

                                                    <h5 id="estado-doc">Estado : <strong style={{ color: 'green' }}>Aceptado</strong>
                                                        <button onClick={() => this.openModal('Modificación_CPRA')} id="edit-style" style={this.props.match.params.id ? { color: 'green' } : { display: 'none' }}> <span className="glyphicon glyphicon-pencil"></span></button></h5>

                                                }
                                                {this.state.alumno[0].documentos[2].estado === 'No Aceptado' &&
                                                    <h5 id="estado-doc">Estado : <strong style={{ color: 'red' }}>No Aceptado</strong>
                                                        <button onClick={() => this.openModal('Modificación_CPRA')} id="edit-style" style={this.props.match.params.id ? { color: 'red' } : { display: 'none' }}> <span className="glyphicon glyphicon-pencil"></span></button></h5>

                                                }
                                                {this.state.alumno[0].documentos[2].estado === 'No Presentado' &&
                                                    <h5 id="estado-doc">Estado : <strong style={{ color: '#3A3A3A' }}>No Presentado</strong> </h5>
                                                }
                                                {this.state.alumno[0].documentos[2].estado != 'No Presentado' &&
                                                <div>
                                                    <a id="link-doc" target="_blank" href={this.url + '/get-image/' + this.state.alumno[0].documentos[2].url}>
                                                        <span className="glyphicon glyphicon-download-alt"></span>
                                                    </a>
                                                    <h5 id="estado-doc" style={{fontSize:'16px'}}>Ultima modificación: <Moment format="DD-MM-YYYY">{this.state.alumno[0].documentos[2].fecha}</Moment></h5>
                                                </div>
                                                }

                                            </div>
                                        </div>

                                        {/*     documento 4     */}

                                        <div className="grid-documentos-dos">
                                            <div className="doc-default">
                                                <img src={doc} />
                                            </div>
                                            <div>
                                                <h3 id="title-doc"> Modificación LA </h3>
                                                {this.state.alumno[0].documentos[3].estado === 'En tramite' &&
                                                    <h5 id="estado-doc">Estado : <strong style={{ color: 'blue' }}>En trámite</strong>
                                                        <button onClick={() => this.openModal('Modificación_LA')} id="edit-style" style={this.props.match.params.id ? { color: 'blue' } : { display: 'none' }}> <span className="glyphicon glyphicon-pencil"></span></button></h5>

                                                }
                                                {this.state.alumno[0].documentos[3].estado === 'Aceptado' &&
                                                    <h5 id="estado-doc">Estado : <strong style={{ color: 'green' }}>Aceptado</strong>
                                                        <button onClick={() => this.openModal('Modificación_LA')} id="edit-style" style={this.props.match.params.id ? { color: 'green' } : { display: 'none' }}> <span className="glyphicon glyphicon-pencil"></span></button></h5>

                                                }
                                                {this.state.alumno[0].documentos[3].estado === 'No Aceptado' &&
                                                    <h5 id="estado-doc">Estado : <strong style={{ color: 'red' }}>No Aceptado</strong>
                                                        <button onClick={() => this.openModal('Modificación_LA')} id="edit-style" style={this.props.match.params.id ? { color: 'red' } : { display: 'none' }}> <span className="glyphicon glyphicon-pencil"></span></button></h5>

                                                }
                                                {this.state.alumno[0].documentos[3].estado === 'No Presentado' &&
                                                    <h5 id="estado-doc">Estado : <strong style={{ color: '#3A3A3A' }}>No Presentado</strong> </h5>
                                                }

                                                {this.state.alumno[0].documentos[3].estado != 'No Presentado' &&
                                                <div>
                                                    <a id="link-doc" target="_blank" href={this.url + '/get-image/' + this.state.alumno[0].documentos[3].url}>
                                                        <span className="glyphicon glyphicon-download-alt"></span>

                                                    </a>
                                                    <h5 id="estado-doc" style={{fontSize:'16px'}} >Ultima modificación:  <Moment format="DD-MM-YYYY">{this.state.alumno[0].documentos[3].fecha}</Moment></h5>
                                                </div>
                                                }

                                            </div>
                                        </div>


                                    </div>
                                </div>


                            </div>

                            <Modal show={this.state.open} onHide={this.onCloseModal} animation={false}>
                                <Modal.Header closeButton>
                                    <Modal.Title >MODIFICAR ESTADO <strong>-- {this.nombre} --</strong> </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <form onSubmit={this.modificarEstado} className="nuevo-doc">
                                        <div className="form-subir">
                                            <label for="tittle">Seleccionar nuevo estado:</label>
                                            <select className="form-input-nuevo" ref={this.estadoRef} onChange={this.changeEstado}>
                                                <option selected value=""></option>
                                                <option value="No Aceptado">No Aceptado</option>
                                                <option value="Aceptado">Aceptado</option>
                                                <option value="En tramite">En trámite</option>

                                            </select>

                                        </div>

                                        <input type="submit" value="ACTUALIZAR" className="btn-submit" ></input>
                                    </form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <button variant="secondary" onClick={this.onCloseModal} className="btn-cerrar">
                                        Close
                             </button>

                                </Modal.Footer>
                            </Modal>
                        </div>
                        {/* COLUMA 3 */}
                        <div className="btn-docOficial">
                            {this.props.match.params.id !=null 
                                    ?<NuevoDocumento type={this.props.match.params.id} />
                                    :<NuevoDocumento type="nuevo" />
                            }
                           
                            
                        </div>
                    </div>
                </div>


            );
        }
        else {
            return (
                <div>

                    <div id="articles">

                        <h2 className="subheader">No hay articulos para mostrar</h2>
                        <p>Todavia no hay contenido en esta sección</p>
                    </div>
                </div>
            );
        }


    }

}

export default DocumentoOficial;