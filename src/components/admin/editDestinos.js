import React, { Component } from 'react';


import axios from 'axios';
import Global from '../../Global';


import Menu from './menu-admin';

import Modal from 'react-bootstrap/Modal';

import Form from 'react-bootstrap/Form';


class editdestinos extends Component {

    state = {
        destinos: [],
        profesores:[],
        destino:"",
        open: false,
        profesor:"",
        update:{}

    }

    url=Global.url;


    constructor(props) {
        super(props);
        this.listarDestinos();
        this.listarProfesores();
    }


   

    openModal = (id) => {
        console.log("id:" + id)
        this.setState({ open: true, destino:id });
        
    }
  

    onCloseModal = () => { this.setState({ open: false }); }

    listarDestinos() {
        axios.get('http://localhost:3900/apiDestino/destinos')
            .then(res => {
                this.setState({
                    destinos: res.data.destino,

                });
            });
    }

    listarProfesores() {
        axios.get('http://localhost:3900/apiProfesor/' + 'profesores')
            .then(res => {

                this.setState({
                    profesores: res.data.profesor,

                });
            });
    }

    handleChange = input => e => {
        this.setState({ [input]: e.target.value });
    }

    updateDestino=()=>{

        var body={
            profesor: this.state.profesor
        }
        console.log("updatedestino:"+ this.state.destino);

        axios.put('http://localhost:3900/apiDestino/updateProfesor/'+ this.state.destino, body)
        .then(res => {
            this.setState({
                update: res.data.destino,

            });
            axios.put(this.url+'/setdestino/'+this.state.destino, res.data.destino)
            .then(res=>{
                this.setState({
                    status:'sucess'
                });
            })        });

       this.onCloseModal();
       this.forceUpdate();
    }



    render() {
        const listarDestinos = this.state.destinos.map((destino) => {
            return (

                <div>
                    <table >
                        <tbody>
                            <tr>
                                <td >
                                    {destino.pais}
                                </td>
                                <td >
                                    {destino.ciudad}
                                </td>
                                <td>
                                    {destino.carrera}
                                </td>
                                <td>
                                    {destino.profesor.nombre + "  " + destino.profesor.apellido1 + " " + destino.profesor.apellido2}
                                    <button variant="primary"onClick={() => this.openModal(destino._id)} style={{border:'none', backgroundColor:'transparent', marginLeft:'3px'}}>
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                        </svg>
                                    </button>

                                </td>
                                <td>
                                    {destino.coordinador.nombre + " " + destino.coordinador.apellido1 + " " + destino.coordinador.apellido2}
                                </td>

                            </tr>

                        </tbody>
                    </table>

                </div>

            )
        })
        return (

            <div className="grid-admin">

                <Menu></Menu>
                <div>
                    <div>
                        <h1 className="titulo-doc">    EDITAR DESTINOS </h1></div>

                    <div >

                    </div>
                    <div >
                        {/* NUEVOOOOO TABLAS */}

                        <table style={{ marginTop: '20px' }} >
                            <thead >
                                <tr className="table-admin">
                                    <th >Pais</th>
                                    <th >Ciudad</th>
                                    <th>Grado</th>
                                    <th>Coordinador de destino</th>
                                    <th>Coordinador de centro</th>
                                  
                                </tr>
                            </thead>
                        </table>
                        {listarDestinos}
                        <div>
                            <Modal show={this.state.open} onHide={this.onCloseModal}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Modal heading</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                    <Form.Group>
                                    <Form.Label> Coordinador de destino</Form.Label>
                                    <Form.Control as="select" onChange={this.handleChange('profesor')} type="profesor" >
                                        <option> </option>
                                        {this.state.profesores.map((prof) => (
                                            <option key={prof._id} value={prof._id} >
                                                {prof.nombre + " " + prof.apellido1 + " " + prof.apellido2}
                                            </option>
                                        ))

                                        }

                                    </Form.Control>
                                </Form.Group>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    
                                    <button variant="primary" onClick={this.updateDestino} className="button-join ">
                                        GUARDAR
                                  </button>
                                </Modal.Footer>
                            </Modal>

                        </div>
                    </div>
                </div>
            </div>



        );
    }
}

export default editdestinos;