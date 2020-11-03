import React, { Component } from 'react';
import Slider from './Slider';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
import Header from './Header';

/*IMAGENES - BOTONES */
import btn1 from '../assets/images/bot-documentos1.png';
import btn2 from '../assets/images/bot-informacion1.png';
import btn3 from '../assets/images/bot-dropbox1.png';
import InicioSesion from './InicioSesion';
import Carousel from 'react-bootstrap/Carousel';

class Inicio extends Component {

    state = {
        user: {}
    }



    render() {
        return (
            <div>
                <Slider/>

            </div>

        );
    }
}

export default Inicio;