import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';

import './Join.css';



const Join =() => {
    
      
        const [room, setRoom] = useState('');
        const identity= JSON.parse(localStorage.getItem('user'));
        const nombre= identity.nombre + " " + identity.apellido1;
        const name = nombre;
        return (
            <div className="joinOuterContainer">
                <div className="joinInnerContainer">
                    <h1 className="heading">Crear sala</h1>
                    
                    <div> <input placeholder="Nombre" className="joinInput" type="text" /*onChange={(event)=>setName(event.target.value)} */ value={nombre} /> </div>
                    <div> <input placeholder="Nombre de la sala" className="joinInput mt-20" type="text" onChange={(event)=>setRoom(event.target.value)} /> </div>
                    <Link onClick={event=> (!name || !room) ? event.preventDefault() : null} to={'/chat?name='+name+'&room='+room}>
                        <button className="button-join mt-20" type="submit">crear sala</button>
                    </Link>
                    

                </div>

            </div>

        );
    
}

export default Join;