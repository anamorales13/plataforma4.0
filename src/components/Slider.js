import React, {Component} from 'react';
import imagen from '../assets/images/pantalla-principal.png';

class Slider extends Component{
    render(){
        return(
            <div id="slider" className="slider-big">
                <img src={imagen} alt="Pantalla principal"/>
            </div>
        );
    }
}

export default Slider;