import React, { Component } from 'react';

import Menu from './menu-mensajes';
import Global from '../../GlobalMensaje';
import axios from 'axios';
import GlobalPerfil from '../../Global';
import Moment from 'react-moment';
import Card from 'react-bootstrap/Card';
import ReactPaginate from "react-paginate";



class enviados extends Component {
    url = Global.url;
    state = {
        title: 'Mensajes enviados',
        mensaje: [],
        profesores: [],
        identity: JSON.parse(localStorage.getItem('user')),
        status: 'false',
        nuevoMensaje: {},
        pages:"",
        currentPage:0,
        elements: [], //los que cargamos en la pagina actual
        mensajesPerPage: 5,
        offset: 0,
    }

    componentWillMount() {

        this.getMessage();
    }

   
    urlprofesor = Global.urlprofesor;


    getMessage = (e) => {

        var pages= this.state.currentPage+1;

        axios.get(this.url + 'messages/' + this.state.identity._id+"/"+ pages)
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

    handlePageClick = mensajes => {
       
        const selectedPage = mensajes.selected;
        const offset = selectedPage * this.state.mensajesPerPage;
        this.setState({
            currentPage: selectedPage,
            offset: offset
      
       }, () => 
            this.getMessage());
        
    }

    componentDidMount() {
        this.getMessage();
    }

    render() {

        let paginationElement;

        if (this.state.pages > 1) {
            paginationElement = (
                <ReactPaginate
                    previousLabel={"← Anterior"}
                    nextLabel={"Siguiente →"}
                    breakLabel={<span className="gap">...</span>}
                    pageCount={this.state.pages}
                    onPageChange={this.handlePageClick}
                    forcePage={this.state.currentPage}
                    containerClassName={"pagination justify-content-center"}
                    pageClassName={"page-link"}
                    previousClassName={"page-link"}
                    previousLinkClassName={"page-item"}
                    nextClassName={"page-link"}
                    nextLinkClassName={"page-item"}
                    disabledClassName={"disabled"}
                    activeClassName={"page-item active"}
                    activeLinkClassName={"page-link"}
                />
            )
}

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
                        {paginationElement}

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