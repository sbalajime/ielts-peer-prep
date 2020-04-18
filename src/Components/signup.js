import React from 'react';
import '../App.css'
import Homeimg from './homeimg.js'


class Signup extends React.Component{

    constructor(){
        super()
        this.state = {email:"",pass:"",rpass:"",batch:""}
    }


    givenValue = (e) =>{
        const {name ,value} = e.target
        this.setState({[name]:value})
    }

render() {

        const {email , pass , rpass} = this.state

    return  (

        <div>
            <Homeimg/>

            <div className ="signBlock">
            <div className="signHeader">
            <h3>Sign Up</h3>
            </div>
            <div className="signEmail">
            <input  type = "text" onChange={this.givenValue} placeholder ="E-mail" name="email" value={email} />
            </div>
            <div className = "signPass">
            <input  type = "password" onChange={this.givenValue} placeholder ="Password" name="pass" value={pass} />
            </div>           
            <div className = "signPass">
            <input  type = "password" onChange={this.givenValue} placeholder ="Confirm-Password" name="rpass" value ={rpass} />
            </div>
         
            <div className="signButton">
            <input type="button" value="Sign Up" />
            </div>    
        </div>  
     </div>   
    ) 
}
}


export default Signup