import React, { Component } from 'react';
import Global from '../Global';
import GlobalProfesor from '../GlobalProfesor';
import axios from 'axios';
import swal from 'sweetalert';
import imagenlogo from '../assets/images/logo-erasmus.png';
import { Link, Redirect } from 'react-router-dom';

import imagen from '../assets/images/InicialScreen.png';
import imagenalumno from '../assets/images/boton-alumno.png';
import imagenprof from '../assets/images/boton-profesor.png';
import '../assets/css/InicialScreen.css';
import Form from 'react-bootstrap/Form';


class InicioSesion extends Component {

    passwordRef = React.createRef();
    usuarioRef = React.createRef();
    gettoken = true;

    url = Global.url;
    urlProfesor = GlobalProfesor.url;

    state = {
        alumno: {},
        status: 'waiting',
        nuevoAlumno: {},
        token: "",
        navigate: false
    };


    /* BUSCAR ALUMNOS EN LA BD */
    change = () => {
        this.setState({

            nuevoAlumno: {
                usuario: this.usuarioRef.current.value,
                password: this.passwordRef.current.value

            },

        });

    }

    getProfesor = (e) => {
        e.preventDefault();
        this.change();

        axios.post(this.urlProfesor + 'login', this.state.nuevoAlumno)
            .then(res => {
                this.setState({
                    // alumno: res.data.users,
                    sucess: 'sucess',
                    alumno: res.data.users,
                    token: res.data.token,
                    navigate: true

                });

                //persistir los datos del usuario
                console.log(JSON.stringify(this.state.alumno));
                localStorage.setItem('user', JSON.stringify(this.state.alumno));
                localStorage.setItem('token', this.state.token);

                //  this.get_token();
            })
            .catch(err => {
                this.setState({
                    alumno: {},
                    status: 'failed'
                });
                swal(
                    '¡Error!',
                    'Nombre de usuario o contraseña incorrectos',
                    'error'
                )
            });
        this.forceUpdate();
    }

    getAlumno = (e) => {
        e.preventDefault();
        this.change();


        axios.post(this.url + 'login', this.state.nuevoAlumno)
            .then(res => {
                this.setState({
                    // alumno: res.data.users,
                    sucess: 'sucess',
                    alumno: res.data.users,
                    token: res.data.token,
                    navigate: true

                });
                //persistir los datos del usuario


                localStorage.setItem('user', JSON.stringify(this.state.alumno));
                localStorage.setItem('token', this.state.token);
                localStorage.setItem('tipo', 'alumno');
                this.router.navigateByUrl('/');

                //  this.get_token();
            })
            .catch(err => {
                this.setState({
                    alumno: {},
                    status: 'failed'
                });


            });
        this.forceUpdate();

    }

    get_identity() {
        return JSON.parse(localStorage.getItem('user'));
    }



    render() {

        const { navigate } = this.state
        if (navigate && JSON.parse(localStorage.getItem('user')) != null) {
            return <Redirect to="/inicio" push={true} />
        }


        const { tipo } = this.props.location.state
        return (

            <div>
                {tipo == 'profesor' &&
                    <div className="grid-inicio">
                        <div className="logo-titulo">
                            <img src={imagenlogo} width="100px" height="80px"></img>
                            <div className="titulo-completo">
                                <h3>Universidad de Huelva</h3>
                                <h1> ERASMUS+ </h1>
                            </div>
                        </div>
                        <hr className="linea"></hr>

                        <div className="grid-logo-inicio">
                            <div className="inicio-logo">

                                <h3 id="header-boton"> ALUMNOS </h3>
                                <Link to={{
                                    pathname: '/inicioSesion',
                                    state: {
                                        tipo: 'alumno'
                                    }
                                }}>
                                    <img src={imagenalumno} width="200px" height="280px"></img>
                                </Link>
                            </div>

                            <article className="formulario-inicioSesion">
                                <div className="cabecera-login">
                                    <h3 className="title-login" style={{ fontSize: '25px' }}>INICIAR SESIÓN </h3>
                                    <h1 className="title-login" style={{ fontSize: '18px' }}><strong>PROFESOR</strong>   </h1>
                                    <Link to={{
                                        pathname: '/nuevoProfesor',
                                        state: {
                                            tipo: 'profesor'
                                        }
                                    }} className="link-nuevoUsuario" > Registrarse</Link>

                                </div>
                                <Form onSubmit={this.getProfesor} >
                                    {/*<div className="form-login">*/}

                                    <div className="form-group ">

                                        <div className="input-group">
                                            <div className="input-group-addon icono-form">
                                                <span className="glyphicon glyphicon-user"></span>
                                            </div>
                                            <input className="form-login-input" onChange={this.change} type="text" ref={this.usuarioRef} placeholder="Usuario" />
                                        </div>
                                    </div>

                                    <div className="form-group ">

                                        <div className="input-group">
                                            <div className="input-group-addon icono-form">
                                                <span className="glyphicon glyphicon-lock"></span>
                                            </div>
                                            <input className="form-login-input" onChange={this.change} type="password" ref={this.passwordRef} placeholder="Contraseña" />
                                        </div>
                                    </div>

                                    <input type="submit" value="INICIAR SESIÓN" className="btn-login " ></input>
                                </Form>
                            </article>
                        </div>
                    </div>


                }
                {tipo == 'alumno' &&
                    <div className="grid-inicio">
                        <div className="logo-titulo">
                            <img src={imagenlogo} width="100px" height="80px"></img>
                            <div className="titulo-completo">
                                <h3>Universidad de Huelva</h3>
                                <h1> ERASMUS+ </h1>
                            </div>
                        </div>
                        <hr className="linea"></hr>

                        <div className="grid-logo-inicio">

                            <article className="formulario-inicioSesion form-alumno">
                                <div className="cabecera-login">
                                    <h3 className="title-login" style={{ fontSize: '25px' }}>INICIAR SESIÓN </h3>
                                    <h1 className="title-login" style={{ fontSize: '18px' }}><strong>ALUMNOS</strong>   </h1>

                                    <Link to={{
                                        pathname: '/nuevoUsuario',
                                        state: {
                                            tipo: 'alumno'
                                        }
                                    }} className="link-nuevoUsuario" > Registrarse</Link>
                                </div>
                                <form onSubmit={this.getAlumno} >
                                    <div className="form-group ">

                                        <div className="input-group">
                                            <div className="input-group-addon icono-form">
                                                <span className="glyphicon glyphicon-user"></span>
                                            </div>
                                            <input className="form-login-input" onChange={this.change} type="text" ref={this.usuarioRef} placeholder="Usuario" />
                                        </div>
                                    </div>
                                    <div className="form-group ">

                                        <div className="input-group">
                                            <div className="input-group-addon icono-form">
                                                <span className="glyphicon glyphicon-lock"></span>
                                            </div>
                                            <input className="form-login-input" onChange={this.change} type="password" ref={this.passwordRef} placeholder="Contraseña"></input>
                                        </div>
                                    </div>
                                   
                                    <input type="submit" value="INICIAR SESIÓN" className="btn-login" ></input>
                                </form>
                            </article>

                            <div className="boton-profesor">

                                <h3 id="header-boton-prof"> PROFESOR </h3>
                                <Link to={{
                                    pathname: '/inicioSesion',
                                    state: {
                                        tipo: 'profesor'
                                    }
                                }}>
                                    <img src={imagenprof} width="200px" height="280px"></img>
                                </Link>



                            </div>
                        </div>
                    </div>
                }
                <div id="administrador">
                    <label>¿Eres administrador?</label> <Link to={"/inicioAdministrador"}>Inicia sesión aquí</Link> </div>
            </div>






        );



    }
}

export default InicioSesion;