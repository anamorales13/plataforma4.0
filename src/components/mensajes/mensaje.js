import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import Global from '../../GlobalMensaje';
import GlobalPerfil from '../../Global';

import Menu from './menu-mensajes';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Moment from 'react-moment';

import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

class mensaje extends Component {

    state = {
        identity: JSON.parse(localStorage.getItem('user')),
        mensaje: [],
        mensajeguardar: {},

    }

    componentWillMount() {
        this.getMessage();

    }

    url = Global.url;
    urlperfil = GlobalPerfil.url;


    getMessage = (e) => {

        var id = this.props.match.params.id;
        console.log("id " + id);

        axios.put(this.url + 'marcar-leido/' + id)
            .then(res => {
                if (res.data.mensajes) {
                    this.setState({
                        // mensaje: res.data.mensajes,
                        status: 'sucess'
                    })
                }
            });

        axios.get(this.url + 'mensaje/' + id)
            .then(res => {
                if (res.data.mensajes) {
                    this.setState({
                        mensaje: res.data.mensajes,
                        status: 'sucess'
                    });
                }
            });
    }

    back() {
        window.history.back();
    }


    render() {
        var listarmensajes = this.state.mensaje.map((mensajes) => {

            return (
                <div >
                    <Breadcrumb >
                        <Breadcrumb.Item href="/inicio">Home</Breadcrumb.Item>
                        <Breadcrumb.Item href="/mensajes">
                            Bandeja de entrada
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>ver mensaje</Breadcrumb.Item>
                    </Breadcrumb>
                    <hr className="linea-bajo"></hr>

                    <Card style={{ width: '70em' }} className="card-mensajes-individual row no-gutters " >

                        {mensajes.emisor.profesor != null &&
                            <Card.Img variant="left" src={'http://localhost:3900/apiErasmus/get-image-user/' + mensajes.emisor.profesor.image} className="image-user" />
                        }
                        {mensajes.emisor.alumno != null &&
                            <Card.Img variant="left" src={'http://localhost:3900/apiErasmus/get-image-user/' + mensajes.emisor.alumno.image} className="image-user" />
                        }


                        <Card.Body id="cardbody">
                            <div className="mensaje-header">
                                {mensajes.emisor.profesor != null &&
                                    <h4 id="mensaje-nombre-novisto">{mensajes.emisor.profesor.nombre + " " + mensajes.emisor.profesor.apellido1 + "    " + mensajes.emisor.profesor.apellido2} </h4>

                                }
                                {mensajes.emisor.alumno != null &&
                                    <h4 id="mensaje-nombre-novisto">{mensajes.emisor.alumno.nombre + " " + mensajes.emisor.alumno.apellido1 + "    " + mensajes.emisor.alumno.apellido2} </h4>

                                }


                                <h6 className="fecha"> <Moment format="DD-MM-YYYY">{mensajes.fecha}</Moment></h6>
                            </div>
                            {mensajes.emisor.profesor != null &&
                                <h5  > {"    <" + mensajes.emisor.profesor.email + ">"} </h5>

                            }
                            {mensajes.emisor.alumno != null &&
                                <h5 > {"    <" + mensajes.emisor.alumno.email + ">"} </h5>

                            }

                            <br></br>
                            <hr></hr>
                            <div className="pruebaresponder">
                                <strong style={{ fontSize: '16px' }}>{mensajes.asunto}</strong>
                                {mensajes.emisor.profesor != null &&  
                                    <Link to={'/mensajes/enviar'} params={{ mensajeId: mensajes._id, emisor: mensajes.emisor.profesor.email, texto:mensajes.texto }} className="responder" title="responder"><span className="glyphicon glyphicon-share-alt" style={{fontSize:'19px'}}> </span></Link>
                                 }
                                {mensajes.emisor.alumno != null &&
                                    <Link to={'/mensajes/enviar'} params={{ mensajeId: mensajes._id, emisor: mensajes.emisor.alumno.email, texto: mensajes.texto  }} className="responder" title="responder"><span className="glyphicon glyphicon-share-alt" style={{fontSize:'19px'}}> </span></Link>

                                }

                               
                            </div>


                            <Card.Text >
                                <br></br>
                                <label className="textarea-mostrarmensaje" readonly>{mensajes.texto}</label>

                            </Card.Text>

                        </Card.Body>
                    </Card>


                </div>
            );
        });
        return (
            <div className="grid-mensajeria-col">

                <Menu />


                <div>
                    {listarmensajes}
                </div>
            </div>
        );
    }
}


export default mensaje;