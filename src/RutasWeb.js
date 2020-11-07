import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Inicio from './components/Inicio';
import Informacion from "./components/Informacion";
import Header from './components/Header';
import Documento from './components/DocumentoOficial';
import Dropbox from './components/Dropbox';
import MiPerfil from './components/views/MiPerfil';
import EditPerfil from './components/views/EditPefil';
import RutasInicio from './Rutas';
import PasswordEdit from './components/views/PasswordEdit';
import perfilErasmus from './components/views/perfilErasmus';
import './assets/css/App.css';
import enviar from './components/mensajes/enviar';
import recibidos from './components/mensajes/recibidos';
import enviados from './components/mensajes/enviados';
import mensaje from './components/mensajes/mensaje'
import Alumnos from './components/Alumnos';
import mydropbox from './components/mydropbox';
import quienes from './components/inicio/quienes-somos';
import donde from './components/inicio/donde-estamos';

class Rutas extends Component {

    render() {

        var user;
        return (
            <BrowserRouter>
                <div className="grid-general">
                    <Header />
                    <div>
                        <Switch>
                            <Route exact path="/inicio" component={Inicio} />
                            <Route exact path="/informacion" component={Informacion}></Route>
                            <Route exact path="/documentos/:id?" component={Documento}></Route>
                            <Route exact path="/dropbox/:id?/:nombre?/:apellido1?/:apellido2?" component={Dropbox}></Route>
                            <Route exact path="/mydropbox" component={mydropbox}></Route>
                            <Route exact path="/user/profile/:id?" component={MiPerfil}></Route>
                            <Route exact path="/user/edit" component={EditPerfil}></Route>
                            <Route exact path="/user/erasmus" component={perfilErasmus}/>
                            <Route exact path="/user/seguridad" component={PasswordEdit}></Route>
                            <Route exact path="/mensajes" component={recibidos} />
                            <Route exact path="/mensajes/enviar" component={enviar}/>
                            <Route exact path="/mensajes/:id" component={mensaje}></Route>
                            <Route exact path="/enviados" component={enviados}/>
                            <Route exact path="/Alumnos" component={Alumnos} />
                            <Route exact path="/quienes-somos" component={quienes}/>
                            <Route exact path="/donde-estamos" component={donde}/>
                           
                            <RutasInicio />
                            {/*  <Route exact path="/" component={InicioSesion}/> */}
                            {/*} <Route exact path="/inicioSesion" component={InicioSesion}/>*/}


                        </Switch>
                    </div>
                    <div className="clearfix"></div>


                </div>

            </BrowserRouter>

        );
    }
}


export default Rutas;