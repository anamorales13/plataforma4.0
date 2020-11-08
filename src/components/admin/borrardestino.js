import React, { Component } from 'react';


import imagenlogo from '../../assets/images/logo-erasmus.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

class borrar extends Component {

    state={
        destinos:[]
    }


    constructor(props) {
        super(props);
        this.listarDestinos();
    }

    listarDestinos() {
        axios.get('http://localhost:3900/apiDestino/destinos')
            .then(res => {
                this.setState({
                    destinos: res.data.destino,

                });
            });
    }


    render() {
        const listarDestinos = this.state.destinos.map((destino) => {
            return (

                <div>
                        <table>
                            <tbody>
                                <tr>
                                    <td className="th-pequeño">
                                        {destino.pais}
                                    </td>
                                    <td className="th-pequeño">
                                        {destino.ciudad}
                                    </td>
                                    <td>
                                        {destino.carrera}
                                    </td>
                                    <td>
                                        {destino.profesor.nombre}
                                    </td>
                                    <td className="th-pequeño">
                                       
                                    </td>
                                </tr>

                            </tbody>
                        </table>

                    
                </div>
            )
        })
        return (
            <div >
                    {/* NUEVOOOOO TABLAS */}

                    <table >
                        <thead className="cabecera">
                            <tr>
                                <th className="th-pequeño">Pais</th>
                                <th className="th-pequeño">Ciudad</th>
                                <th>Grado</th>
                                <th>Coordinador</th>
                            </tr>
                        </thead>
                    </table>
                    {listarDestinos}

                   

                </div>


            
        );
    }
}

export default borrar;