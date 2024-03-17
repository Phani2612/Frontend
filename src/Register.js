import React from 'react'
import './App.css'
import Axios from 'axios'
import {useNavigate} from "react-router-dom"
import Server_URL from './URL'


function Register() {

    const Navigate = useNavigate()
     
    const [details , setdetails] = React.useState({

          name:"",
          email:"",
          password:"",
          confirmpassword:""

    })


    function collectdata(event)
    {
          setdetails({...details ,[event.target.name] : event.target.value })
          
    }

   
   function Senddata(event)
   {
          event.preventDefault()
          
               Axios.post(`${Server_URL}/register`, details).then(function(output)
          {
              
                if(output.data === 'Login')
                {
                        Navigate("/")
                }

                else
                {
                      Navigate("/register")
                }


          }).catch(function(error)
          {
            console.error(error)
          })
    
     
    
   }

  return (
    
<div class="container">
        <form action="#" method='POST' onSubmit={Senddata}>
            <h2>Register</h2>
            <div class="input-container">
                <input type="text" id="name" name="name" placeholder="Name" required onChange={collectdata}/>
            </div>
            <div class="input-container">
                <input type="email" id="email" name="email" placeholder="Email" onChange={collectdata} required/>
            </div>
            <div class="input-container">
                <input type="password" id="password" name="password" placeholder="Password" onChange={collectdata}  required/>
            </div>
            <div class="input-container">
                <input type="password" id="confirm-password" name="confirmpassword" placeholder="Confirm Password"  onChange={collectdata} required/>
            </div>
            <button type="submit">Register</button>
        </form>
    </div>



  )
}

export default Register