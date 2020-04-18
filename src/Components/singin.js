import  React , {Component} from 'react'
import '../App.css'
import {Link} from 'react-router-dom'
import Homeimg from './homeimg'


class Signin extends Component{

    constructor(){
        super()
        this.state = {email:"",pass:""}
    }


    givenValue = (e) =>{
        const {name ,value} = e.target
        this.setState({[name]:value})
    }



    render(){

        const {email , pass } = this.state
    return(
        <div>
        <Homeimg/>

        <div className ="signBlock">
            

            <div className="signHeader">
            <h3>Sign In</h3>
            </div>
            
         

            <div className="signEmail">
            <input  type = "text" onChange={this.givenValue} placeholder ="E-mail" name="email" value={email} />
            </div>
            <div className = "signPass">
            <input  type = "password" onChange={this.givenValue} placeholder ="Password" name="pass" value={pass} />
            </div>
            <div className="signButton">
            <input type="button" value="Sign In" />
            </div>    
            <button className = "nav"> 
            <Link to="/signup">Sign Up</Link>
            </button>
        </div>
        </div>
    )
    }



}   
export default Signin



