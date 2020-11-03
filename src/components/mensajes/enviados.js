import React, { Component } from 'react';

import Menu from './menu-mensajes';
import Global from '../../GlobalMensaje';
import axios from 'axios';
import GlobalPerfil from '../../Global';
import Moment from 'react-moment';
import Card from 'react-bootstrap/Card';



class enviados extends Component {
    url = Global.url;
    state = {
        title: 'Mensajes enviados',
        mensaje: [],
        profesores: [],
        identity: JSON.parse(localStorage.getItem('user')),
        status: 'false',
        nuevoMensaje: {}
    }

    componentWillMount() {

        this.getmensajes();
    }

   
    urlprofesor = Global.urlprofesor;


    getmensajes = (e) => {

        axios.get(this.url + 'messages/' + this.state.identity._id)
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
                    <div>
                                            

                            <Card style={{ width: '70em' }} className="card-mensajes row no-gutters ">
                          
                                <Card.Img variant="left" src={'http://localhost:3900/apiErasmus/get-image-user/' + this.state.identity.image} className="image-user" />
                              
                                <Card.Body id="cardbody">
                                    <div className="mensaje-header">
                                        {mensajes.receptor.profesor !=null &&
                                        <h4 id="mensaje-nombre">Para: {mensajes.receptor.profesor.nombre + "  " + mensajes.receptor.profesor.apellido1 + "    " + mensajes.receptor.profesor.apellido2} </h4>
                                       }
                                        {mensajes.receptor.alumno !=null &&
                                        <h4 id="mensaje-nombre">Para: {mensajes.receptor.alumno.nombre + "  " + mensajes.receptor.alumno.apellido1 + "    " + mensajes.receptor.alumno.apellido2} </h4>
                                       }
                                       
                                        <h6 className="fecha"> <Moment format="DD-MM-YYYY">{mensajes.fecha}</Moment></h6>
                                    </div>
                                    <Card.Text className="mensaje-texto">
                                    <strong>{mensajes.asunto}       </strong>
                                        {mensajes.texto}
                                    </Card.Text>
                                    <Card.Link href={'/mensajes/' + mensajes._id} className="mensaje-enlace">ver mensaje</Card.Link>
                                </Card.Body>
                            </Card>


                        


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
                    <h3 className="title-pantalla-mensaje">No hay mensajes </h3>
                    {listarmensajes}

                </div>
                </div>
        
            );

            }
        }
}


export default enviados;