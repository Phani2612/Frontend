import React from 'react'
import './App.css'
import {Link, Navigate, useNavigate} from 'react-router-dom'
import Axios from 'axios'
import Server_URL from './URL'

function Login(props) {

 const Navigate = useNavigate()

 const [login , setlogin] = React.useState({

           email:"",
           password:""
 })

 function Senddata(event)
 {
       setlogin({...login , [event.target.name] : event.target.value})
 }

 function Collectdata(event)
 { 
     event.preventDefault()
     Axios.post(`${Server_URL}/login` , login , { withCredentials: true } ).then(function(output)
     {
               console.log(output)

               if(output.data === 'login')
               {
                       Navigate('/')
               }

               else if(output.data === 'home')
               {
                    Navigate('/home')
                    props.data(true)

               }

               else{

                   Navigate('/register')
               }




     }).catch(function(error)
     {
        console.log(error)
     })

 }



  return (
    <div class="login-container">
    <form action="#" method="POST" onSubmit={Collectdata}>
        <h2>Login</h2>
        <div class="login-input-container">
            <input type="email" id="login-email" name="email" placeholder="Email" required onChange={Senddata}/>
        </div>
        <div class="login-input-container">
            <input type="password" id="login-password" name="password" placeholder="Password"  onChange={Senddata} required/>
        </div>
        <button type="submit">Login</button>

    </form>

    <div class="signup-link">
            <p>New user?<Link to='/register'>Sign up</Link></p>
        </div>
</div>
  )
}

export default Login