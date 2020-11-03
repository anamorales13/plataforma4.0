import React, { Component } from 'react';
import axios from 'axios';
import "../../assets/css/MiPerfil.css";
import { NavLink } from 'react-router-dom';
import Global from '../../Global';
import MenuPerfil from './MenuPerfil';

class MiPerfil extends Component {

    state = {
        identity: null,
        destino: {},
        status: "",
        profesor: {},
        coordinador: {}
    }

    url = Global.url;

    constructor(props) {
        super(props);

    }

    componentWillMount() {
        this.setState({
            identity: JSON.parse(localStorage.getItem('user'))
        })
        this.getInfoDestino();
    }

    getInfoDestino() {
        axios.get('http://localhost:3900/apiDestino/destino/' + JSON.parse(localStorage.getItem('user')).destino)
            .then(res => {
                this.setState({
                    destino: res.data.destinoget,
                    status: 'sucess'
                })

                axios.get('http://localhost:3900/apiProfesor/profesor/' + JSON.parse(localStorage.getItem('user')).profesor)
                    .then(res => {
                        this.setState({
                            profesor: res.data.userget
                        })
                    })

                axios.get('http://localhost:3900/apiProfesor/profesor/' + JSON.parse(localStorage.getItem('user')).coordinador)
                    .then(res => {
                        this.setState({
                            coordinador: res.data.userget
                        })
                    })

            })

    }


    render() {



        return (

            <div id="content" className="grid">
                <MenuPerfil />
                <div className="avatar-edit">
                    <h1></h1>
                </div>

                <div >
                    <h1 className="titulo"> Infomación ERASMUS </h1>

                    <article className="elemt-one">

                        <div className="elemt-form">
                            <header >
                                <h2 className="form-perfil-title">Coordinador de destino</h2>

                            </header>
                            <div>
                                <div>
                                    <div>
                                        <ul className="form-perfil">
                                            <li>
                                                <span className="form-perfil-value-title">Nombre</span>
                                                <span className="form-perfil-value">{this.state.profesor.nombre + " " + this.state.profesor.apellido1 + " " + this.state.profesor.apellido2}</span>
                                                <br /><br />
                                                <div className="form-line">

                                                </div>
                                            </li>
                                            <li>
                                                <span className="form-perfil-value-title">Edificio</span>
                                                <span className="form-perfil-value">{this.state.profesor.edificio}</span>
                                                <br /><br />
                                                <div className="form-line">

                                                </div>
                                            </li>
                                            <li>
                                                <span className="form-perfil-value-title">Despacho</span>
                                                <span className="form-perfil-value">{this.state.profesor.despacho}</span>
                                                <br /><br />
                                                <div className="form-line">

                                                </div>
                                            </li>
                                            <li>
                                                <span className="form-perfil-value-title">Teléfono</span>
                                                <span className="form-perfil-value">{this.state.profesor.telefono}</span>
                                                <br /><br />
                                                <div className="form-line">

                                                </div>
                                            </li>
                                            <li>
                                                <span className="form-perfil-value-title">Correo electrónico</span>
                                                <span className="form-perfil-value">{this.state.profesor.email}</span>
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
                                <h2 className="form-perfil-title">Coordinador de centro</h2>

                            </header>
                            <div>
                                <div>
                                    <div>
                                        <ul className="form-perfil">
                                            <li>
                                                <span className="form-perfil-value-title">Nombre</span>
                                                <span className="form-perfil-value">{this.state.coordinador.nombre + " " + this.state.coordinador.apellido1 + " " + this.state.coordinador.apellido2}</span>
                                                <br /><br />
                                                <div className="form-line">

                                                </div>
                                            </li>
                                            <li>
                                                <span className="form-perfil-value-title">Edificio</span>
                                                <span className="form-perfil-value">{this.state.coordinador.edificio}</span>
                                                <br /><br />
                                                <div className="form-line">

                                                </div>
                                            </li>
                                            <li>
                                                <span className="form-perfil-value-title">Despacho</span>
                                                <span className="form-perfil-value">{this.state.coordinador.despacho}</span>
                                                <br /><br />
                                                <div className="form-line">

                                                </div>
                                            </li>
                                            <li>
                                                <span className="form-perfil-value-title">Teléfono</span>
                                                <span className="form-perfil-value">{this.state.coordinador.telefono}</span>
                                                <br /><br />
                                                <div className="form-line">

                                                </div>
                                            </li>
                                            <li>
                                                <span className="form-perfil-value-title">Correo electrónico</span>
                                                <span className="form-perfil-value">{this.state.coordinador.email}</span>
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
                </div>
            </div>
        );



    }



}

export default MiPerfil;