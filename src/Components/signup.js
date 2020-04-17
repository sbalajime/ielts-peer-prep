import React from 'react';
import '../App.css'


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
            <div className = "signBatch" >
            <select  name="batch" onChange={this.givenValue}>
            <option value="01">Batch 1</option>
            <option value="02">Batch 2</option>
            <option value="03">Batch 3</option>
            </select>   
            </div>
            <div className="signButton">
            <input type="button" value="Sign Up" />
            </div>    
        </div>  
    ) 
}
}


export default Signup