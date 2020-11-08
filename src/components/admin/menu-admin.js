import React, { Component } from 'react';
import "../../assets/css/MiPerfil.css";
import { NavLink } from 'react-router-dom';

import "../../assets/css/mensajeria.css";

class MenuMensajes extends Component {
    render() {

        return (
                              
            <div className="menu-perfil menu-mensaje">
                
                <nav> <ul>
                <li>
                        <NavLink exact to="/nuevo-destino" activeClassName="active"> <span className="glyphicon glyphicon-send"></span>Nuevo destino</NavLink >
                    </li>
                    <li>
                        <NavLink exact to="/editar-destinos" > <span className="glyphicon glyphicon-send"></span>Editar destinos</NavLink >
                    </li>
                    <li>
                        <NavLink exact to="/mensajes" > <span className="glyphicon glyphicon-save"></span> Recibidos </NavLink >
                    </li>
                    <li>
                        <NavLink exact to="/enviados"> <span className="glyphicon glyphicon-open"></span> Enviados </NavLink >
                    </li>
                </ul>
                </nav>
            </div>
        
        );
    }


}



export default MenuMensajes;