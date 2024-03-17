import React from 'react'
import './index.css'
import Axios from 'axios'
import {Link} from 'react-router-dom'
import Server_URL from './URL';

function Contact() {

const [Change , setChange] = React.useState({

       name : "",
       email : "",
       subject:"",
       message:""
})

function Collectdata(event)
{
         setChange({...Change , [event.target.name] : event.target.value})
}


function Senddata(event)
{
         event.preventDefault()
         
         Axios.post(`${Server_URL}/contact`, Change) . then(function(output)
         {
             
                if(output.data)

                {

                      window.location.pathname = '/contact'
                }


         }).catch(function(error)
         {
             console.error(error)
         })


}


  return (
    <div>

  

  <div class="contactcontainer">
    <h2>Contact Us</h2>
    <div class="contact-form">
      <form action="#" method="post" onSubmit={Senddata}  >
        <input type="text" name="name" placeholder="Your Name" required  onChange={Collectdata}  />
        <input type="text" name="email" placeholder="Your Email" required onChange={Collectdata}     />
        <input type="text" name="subject" placeholder="Subject" required  onChange={Collectdata}   />
        <textarea name="message" placeholder="Your Message" required  onChange={Collectdata}   ></textarea>
        <input type="submit" value="Submit"/>
      </form>
    </div>

    
  </div>



  
<Link to='/home'  ><button type="button" class="btn btn-light">Please go back to home</button></Link>
    </div>
  )
}

export default Contact