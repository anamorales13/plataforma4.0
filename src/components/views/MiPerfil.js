import React, { Component } from 'react';
import axios from 'axios';
import "../../assets/css/MiPerfil.css";
import { NavLink } from 'react-router-dom';
import Global from '../../Global';
import MenuPerfil from './MenuPerfil';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

class MiPerfil extends Component {

    state = {
        identity: {},
        tipo: null,
    }

    url = Global.url;

    constructor(props) {
        super(props);

    }

    componentWillMount() {
        var id = this.props.match.params.id;
        if (id == null) {
            console.log("hola")
            this.setState({
                identity: JSON.parse(localStorage.getItem('user')),

            });
        } else {
            console.log("hola2")
            this.getalumno();
        }
    }

    getalumno = () => {

        console.log("dentro");
        var id = this.props.match.params.id;
        axios.get(this.url + 'user/' + id)
            .then(res => {
                this.setState({
                    identity: res.data.user
                })
                console.log(this.state.identity.nombre);
            })
    }



    render() {


        return (
            <div>

                <div id="content" className="grid">

                    {this.props.match.params.id == null &&
                        <MenuPerfil />
                    }
                    {this.props.match.params.id != null &&
                        < Breadcrumb >
                            <Breadcrumb.Item href="/inicio" > Home</Breadcrumb.Item>
                            <Breadcrumb.Item href="/Alumnos" >
                                Alumnos
               </Breadcrumb.Item>
                            <Breadcrumb.Item active >{this.state.identity.nombre + " " + this.state.identity.apellido1 + " " + this.state.identity.apellido2}</Breadcrumb.Item>
                        </Breadcrumb>
                    }

                    <div className="avatar">
                        <img src={this.url + '/get-image-user/' + this.state.identity.image} classname="avatar"></img>
                    </div>

                    <div >

                        <h1 className="titulo"> Infomación personal </h1>
                        <div className="subtitulo">Es posible que otros usuarios puedan ver parte de la infomación al usar la plataforma. </div>

                        <article className="elemt-one">

                            <div className="elemt-form">
                                <header >
                                    <h2 className="form-perfil-title">Perfil</h2>

                                </header>
                                <div>
                                    <div>
                                        <div>
                                            <ul className="form-perfil">
                                                <li>
                                                    <span className="form-perfil-value-title">Nombre</span>
                                                    <span className="form-perfil-value">{this.state.identity.nombre}</span>
                                                    <br /><br />
                                                    <div className="form-line">

                                                    </div>
                                                </li>
                                                <li>
                                                    <span className="form-perfil-value-title">Primer apellido</span>
                                                    <span className="form-perfil-value">{this.state.identity.apellido1}</span>
                                                    <br /><br />
                                                    <div className="form-line">

                                                    </div>
                                                </li>
                                                <li>
                                                    <span className="form-perfil-value-title">Segundo apellido</span>
                                                    <span className="form-perfil-value">{this.state.identity.apellido2}</span>
                                                    <br /><br />
                                                    <div className="form-line">

                                                    </div>
                                                </li>
                                                <li>
                                                    <span className="form-perfil-value-title">Usuario</span>
                                                    <span className="form-perfil-value">{this.state.identity.usuario}</span>
                                                    <br /><br />
                                                    <div className="form-line">

                                                    </div>
                                                </li>


                                            </ul>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </article>

                        <article className="elemt-one">
                            <div className="elemt-form">
                                <header >
                                    <h2 className="form-perfil-title">Informacion de contacto</h2>


                                </header>
                                <div>
                                    <div>
                                        <div>
                                            <ul className="form-perfil">
                                                <li>
                                                    <span className="form-perfil-value-title">Email</span>
                                                    <span className="form-perfil-value">{this.state.identity.email}</span>
                                                    <br /><br />
                                                    <div className="form-line">

                                                    </div>
                                                </li>
                                                <li>
                                                    <span className="form-perfil-value-title">Teléfono</span>
                                                    <span className="form-perfil-value">{this.state.identity.telefono}</span>
                                                    <br /><br />
                                                    <div className="form-line">

                                                    </div>
                                                </li>
                                                {this.state.identity.tipo == 'profesor' &&
                                                    <li>
                                                        <span className="form-perfil-value-title">Edificio</span>
                                                        <span className="form-perfil-value">{this.state.identity.edificio}</span>
                                                        <br /><br />
                                                        <div className="form-line">

                                                        </div>
                                                    </li>
                                                }
                                                {this.state.identity.tipo === "profesor" &&
                                                    <li>
                                                        <span className="form-perfil-value-title">Datos de interés</span>
                                                        <span className="form-perfil-value">{this.state.identity.datos}</span>
                                                        <br /><br />
                                                        <div className="form-line">

                                                        </div>
                                                    </li>
                                                }
                                                {this.state.identity.tipo == 'profesor' &&
                                                    <li>
                                                        <span className="form-perfil-value-title">Numero despacho</span>
                                                        <span className="form-perfil-value">{this.state.identity.despacho}</span>
                                                        <br /><br />
                                                        <div className="form-line">

                                                        </div>
                                                    </li>
                                                }

                                            </ul>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>

            </div >
        );
    }
}

export default MiPerfil;
