

import React, { Component } from 'react';
import { Redirect, Link, hashHistory } from 'react-router-dom';

import imagenlogo from '../../assets/images/logo-erasmus.png';
import Card from 'react-bootstrap/Card';



export class Sucess extends Component {
    render() {


        return (
            <div className="grid-inicio">
                <div className="logo-titulo">
                    <img src={imagenlogo} width="100px" height="80px"></img>
                    <div className="titulo-completo">
                        <h3>Universidad de Huelva</h3>
                        <h1> ERASMUS+ </h1>
                    </div>
                </div>
                <hr className="linea"></hr>

                <div className="registro-nuevoUsuario">
                    <h1 className="titulo titulo-registro "> ALTA DE ALUMNO/A</h1>

                    <Card className="card-nuevoUser card-mensajes-sucess">

                        <div className="mensaje-sucess">
                            <h1>USUARIO GUARDADO CORRECTAMENTE</h1>
                            <br></br>
                            <h2>Pulse <strong>SIGUIENTE</strong> para ser redirigido a la pagina de Inicio de Sesion</h2>

                        </div>

                        <Link
                            label="continue"

                            className=" link-continue"
                            style={styles.button}
                            to={
                                '/'
                            }

                        > SIGUIENTE </Link>


                        <br></br>


                    </Card>
                </div>

            </div>
        );
    }
}

const styles = {
    button: { margin: 15 }
}

export default Sucess;