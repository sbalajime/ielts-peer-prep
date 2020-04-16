import React from 'react';
import '../App.css'


class Signup extends React.Component{
render() {
    return  (
        <div className ="loginBlock">
            <h4>Signup</h4>
            <input  type = "text" placeholder ="E-mail"  />
            <input  type = "text" placeholder ="Username"  />
            <input  type = "text" placeholder ="Password"  />
            <select>
            <option value="01">Batch 1</option>
            <option value="02">Batch 2</option>
            <option value="03">Batch 3</option>
            </select>
            <input type="button" value="Signup" />
        </div>  
    ) 
}
}


export default Signup