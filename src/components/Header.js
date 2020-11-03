import React, { Component, useState } from 'react';
import logo from '../assets/images/logov3.png';
import { NavLink } from 'react-router-dom';
import '../assets/css/Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { Redirect, Link } from 'react-router-dom';
import InicioSesion from './InicioSesion';
import Global from '../Global';
import GlobalMensaje from '../GlobalMensaje';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import axios from 'axios';




class Header extends Component {

    contador = '1';
    url = Global.url;
    urlmensaje = GlobalMensaje.url;

    state = {
        navigate: false,
        identity: null,
        noleidos: 0
    }


    constructor(props) {

        super(props);



    }

    componentWillMount() {
        this.setState({
            identity: JSON.parse(localStorage.getItem('user')),
        })
    }

    componentDidMount() {

        this.getNotificaciones();
    }

    botonmenu = () => {

        if (this.contador == '1') {
            var elem = document.getElementById('menuvar');
            elem.style.left = '0';
            this.contador = '0';

        } else {
            this.contador = '1';
            var elem = document.getElementById('menuvar');
            elem.style.left = '-100%';
        }

    }




    getNotificaciones = () => {
        axios.get(this.urlmensaje + 'mensajes-no-leidos/' + JSON.parse(localStorage.getItem('user'))._id)
            .then(res => {
                this.setState({
                    // alumno: res.data.users,
                    sucess: 'sucess',
                    noleidos: res.data.noleidos,


                });

            })
            .catch(err => {
                this.setState({
                    noleidos: 0,

                });


            });
    }

    render() {

        const { navigate } = this.state


        if (navigate) {
            localStorage.clear();
            return <Redirect to="/" push={true} />
        }

        return (

            <header /*id="header"*/ className="background">

                {/***** LOGO  ****  */}
                <div >  <a href="/inicio" id="logo">
                    <img src={logo} id="logo-img"></img>
                </a>
                </div>

                <div className="menu_bar">
                    <a href="#" id="btn-menu" onClick={this.botonmenu}>
                        <span>A</span>
                    </a>
                </div>
                {this.state.identity.tipo == 'Alumno' &&
                    <div className="menu">
                        <nav /*id="menu"*/ id="menuvar">

                            <ul >

                                <li >
                                    <NavLink exact to="/inicio" activeClassName="active"> HOME </NavLink>
                                </li>
                                <li>

                                    <NavLink to="/informacion" activeClassName="active">    INFORMACIÓN </NavLink >
                                </li>

                                <li>
                                    <NavLink to="/documentos" activeClassName="active"> DOCUMENTOS </NavLink >
                                </li>
                                <li>
                                    <NavLink to="/dropbox" activeClassName="active">  DROPBOX </NavLink >
                                </li>
                                {/*<li>
                                    <NavLink to="/mensaje" activeClassName="active"> <span className="glyphicon glyphicon-envelope" > </span>   </NavLink >
                                </li>*/}
                            </ul>

                            <Link
                                label="Mensajes"
                                variant="primary"
                                className="notificacion-mensajes"
                                
                                to={
                                    '/mensajes'
                                }
                            ><span className="glyphicon glyphicon-envelope" style={{color:'black'}}></span> <Badge variant="light" >{this.state.noleidos}</Badge> </Link>
                            

                            {JSON.parse(localStorage.getItem('user')) != null &&
                                <div className="perfil-header">
                                    <img src={this.url + '/get-image-user/' + JSON.parse(localStorage.getItem('user')).image} className="mini-avatar" ></img>
                                    <h1>{JSON.parse(localStorage.getItem('user')).nombre}</h1>
                                    <DropdownButton id="dropdown-basic-button" style={{ left: "auto" }, { rigth: '85%' }} className="dropdown-menu.show">
                                        <Dropdown.Item href="/user/profile">Perfil</Dropdown.Item>
                                        <Dropdown.Item href="/user/edit">Editar Perfil</Dropdown.Item>
                                        <Dropdown.Item href="/user/erasmus">Erasmus</Dropdown.Item>
                                        <Dropdown.Item href="/user/seguridad">Constraseña</Dropdown.Item>
                                        <Dropdown.Item href="#">Ayuda</Dropdown.Item>
                                        <Dropdown.Item onClick={() => this.setState({ navigate: true })}>Cerrar Sesion</Dropdown.Item>
                                    </DropdownButton>
                                </div>
                            }



                        </nav>
                    </div>
                }{this.state.identity.tipo == 'profesor' &&

                    <div className="menu">
                        <nav /*id="menu"*/ id="menuvar">

                            <ul >

                                <li >
                                    <NavLink exact to="/inicio" activeClassName="active">{/*<span className="glyphicon glyphicon-home"></span> */}  HOME  </NavLink>
                                </li>
                                <li>

                                    <NavLink to="/informacion" activeClassName="active">    INFORMACIÓN </NavLink >
                                </li>
                                <li>
                                    <NavLink to="/Alumnos" activeClassName="active"> ALUMNOS </NavLink >
                                </li>


                            </ul>

                            <Link
                                label="Mensajes"
                                variant="primary"
                                className="notificacion-mensajes"
                                
                                to={
                                    '/mensajes'
                                }
                            > <span className="glyphicon glyphicon-envelope" style={{color:'black'}}></span> <Badge variant="light" >{this.state.noleidos}</Badge> </Link>
                            {JSON.parse(localStorage.getItem('user')) != null &&
                                <div className="perfil-header">
                                    
                                    <img src={this.url + '/get-image-user/' + JSON.parse(localStorage.getItem('user')).image} className="mini-avatar" ></img>
                                    <h1>{JSON.parse(localStorage.getItem('user')).nombre}</h1>
                                    <DropdownButton id="dropdown-basic-button" style={{ left: "auto" }, { rigth: '85%' }} className="dropdown-menu.show">
                                        <Dropdown.Item href="/user/profile">Perfil</Dropdown.Item>
                                        <Dropdown.Item  href="/user/edit">Editar Perfil</Dropdown.Item>
                                        <Dropdown.Item href="/user/seguridad">Constraseña</Dropdown.Item>
                                        <Dropdown.Item href="#">Ayuda</Dropdown.Item>
                                        <Dropdown.Item onClick={() => this.setState({ navigate: true })}>Cerrar Sesion</Dropdown.Item>
                                    </DropdownButton>
                                </div>
                            }



                        </nav>
                    </div>
                }
                <div className="clearfix"></div>

            </header>
        );
    }
}

export default Header;