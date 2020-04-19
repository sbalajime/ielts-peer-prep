import React from 'react'
import home from '../images/home.svg'


function Homeimg() {

    return (
        <img className="homeImg" src={home} alt="pic" style={{
            minWidth: '70vw', objectFit: 'contain', marginTop: 50
        }} />
    )

}


export default Homeimg;