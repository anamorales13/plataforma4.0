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
                        <NavLink exact to="/mensajes/enviar" activeClassName="active"> <span className="glyphicon glyphicon-send"></span> Enviar mensaje</NavLink >
                    </li>
                    <li>
                        <NavLink exact to="/mensajes" activeClassName="active"> <span className="glyphicon glyphicon-save"></span> Recibidos </NavLink >
                    </li>
                    <li>
                        <NavLink exact to="/enviados" activeClassName="active"> <span className="glyphicon glyphicon-open"></span> Enviados </NavLink >
                    </li>
                </ul>
                </nav>
            </div>
        
        );
    }


}



export default MenuMensajes;








