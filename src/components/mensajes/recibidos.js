import React, { Component } from 'react';

import Menu from './menu-mensajes';
import axios from 'axios';

import Card from 'react-bootstrap/Card';
import Global from '../../GlobalMensaje';
import GlobalPerfil from '../../Global';
import Moment from 'react-moment';


class recibidos extends Component {

    state = {
        title: 'Bandeja de entrada',
        mensaje: [],
        identity: JSON.parse(localStorage.getItem('user'))
    }
    url = Global.url;
    urlperfil = GlobalPerfil.url;


    componentWillMount() {
        this.setState({
            identity: JSON.parse(localStorage.getItem('user'))
        })
        this.getMessage();
    }


    getMessage = (e) => {

        axios.get(this.url + 'myMessages/' + this.state.identity._id)
            .then(res => {

                this.setState({
                    mensaje: res.data.mensajes,
                    status: 'sucess',

                });

            })
            .catch(err => {
                this.setState({
                    mensaje: {},
                    status: 'failed'
                });
            });
    }


    render() {

        if (this.state.mensaje.length >= 1) {
            var listarmensajes = this.state.mensaje.map((mensajes) => {
                return (
                    <div className="mb-5">
                        {mensajes.visto == 'true' &&

                            <Card style={{ width: '70em' }} className="card-mensajes row no-gutters ">
                                {mensajes.emisor.profesor != null &&
                                    <Card.Img variant="left" src={this.urlperfil + '/get-image-user/' + mensajes.emisor.profesor.image} className="image-user" />
                                }
                                {mensajes.emisor.alumno != null &&
                                    <Card.Img variant="left" src={this.urlperfil + '/get-image-user/' + mensajes.emisor.alumno.image} className="image-user" />
                                }

                                <Card.Body id="cardbody">
                                    <div className="mensaje-header">
                                        {mensajes.emisor.profesor != null &&
                                            <h4 id="mensaje-nombre">{mensajes.emisor.profesor.nombre + "  " + mensajes.emisor.profesor.apellido1 + "    " + mensajes.emisor.profesor.apellido2} </h4>
                                        }
                                        {mensajes.emisor.alumno != null &&
                                            <h4 id="mensaje-nombre">{mensajes.emisor.alumno.nombre + "  " + mensajes.emisor.alumno.apellido1 + "    " + mensajes.emisor.alumno.apellido2} </h4>
                                        }

                                        <h6 className="fecha"> <Moment format="DD-MM-YYYY">{mensajes.fecha}</Moment></h6>
                                    </div>
                                   
                                    <Card.Text className="mensaje-texto">
                                    <strong>{mensajes.asunto}        </strong>
                                        {mensajes.texto}
                                    </Card.Text>
                                    <Card.Link href={'/mensajes/' + mensajes._id} className="mensaje-enlace">ver mensaje</Card.Link>
                                </Card.Body>



                            </Card>
                        }

                        {mensajes.visto == 'false' &&
                            <Card style={{ width: '70em' }} className="card-mensaje-novisto row no-gutters ">
                                {mensajes.emisor.profesor != null &&
                                    <Card.Img variant="left" src={this.urlperfil + '/get-image-user/' + mensajes.emisor.profesor.image} className="image-user" />
                                }
                                {mensajes.emisor.alumno != null &&
                                    <Card.Img variant="left" src={this.urlperfil + '/get-image-user/' + mensajes.emisor.alumno.image} className="image-user" />
                                }
                                <Card.Body id="cardbody">
                                    <div className="mensaje-header-novisto">
                                        {mensajes.emisor.profesor != null &&
                                            <h4 id="mensaje-nombre">{mensajes.emisor.profesor.nombre + "  " + mensajes.emisor.profesor.apellido1 + "    " + mensajes.emisor.profesor.apellido2} </h4>
                                        }
                                        {mensajes.emisor.alumno != null &&
                                            <h4 id="mensaje-nombre">{mensajes.emisor.alumno.nombre + "  " + mensajes.emisor.alumno.apellido1 + "    " + mensajes.emisor.alumno.apellido2} </h4>
                                        }
                                        <h6 className="fecha"> <Moment format="DD-MM-YYYY">{mensajes.fecha}</Moment></h6>
                                    </div>
                                
                                    <Card.Text className="mensaje-texto-novisto">
                                    <strong>{mensajes.asunto}       </strong>
                                        {mensajes.texto}
                                    </Card.Text>
                                    <Card.Link href={'/mensajes/' + mensajes._id} className="mensaje-enlace">ver mensaje</Card.Link>
                                </Card.Body>



                            </Card>
                        }

                    </div>

                )
            })
            return (

                <div className="grid-mensajeria-col">

                    <Menu />



                    <div>
                        <h3 className="title-pantalla-mensaje">{this.state.title} </h3>
                        {listarmensajes}

                    </div>
                </div>



            );
        } else {
            return (

                <div className="grid-mensajeria-col">

                    <Menu />



                    <div>
                        <h3>No hay mensajes </h3>


                    </div>
                </div>



            );
        }

    }
}


export default recibidos;