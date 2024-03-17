import React from 'react'

import Axios from 'axios'

import './App.css'
import {useParams} from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Server_URL from './URL';


function Checkout() {

   const {id} = useParams
  
  const [Orderdata , setorderdata] = React.useState([])

  const [output,setoutput] = React.useState(false)

  const [print , setprint] = React.useState([])

  // const [Random , setrandom] = React.useState(false)

  const [details , setdetails] = React.useState({

      firstname:"",
      lastname:"",
      address:"",
      city:"",
      state:"",
      zip:''
  })

  React.useEffect(function()
  { 
    Axios.get(`${Server_URL}/info`, { withCredentials: true } ).then(function(output)
    {
       console.log(output.data)
       
      
      
       setprint(output.data)
    }).catch(function(error)
    {
       console.error(error)
    }) 


  },[print])


  React.useEffect(function()
  { 
    Axios.get(`${Server_URL}/orders`, { withCredentials: true } ).then(function(output)
    {
       console.log(output.data)
       
      
      
       setorderdata(output.data)
    }).catch(function(error)
    {
       console.error(error)
    }) 


  },[Orderdata])

  





  function PaymentGateway()
  {  

    
        
    
        if(Orderdata.length == 0)
        {
          window.location.href = "https://ecommercefrontend-si2i.onrender.com/message"
        }

        else{
          window.location.href = `${Server_URL}/debit`
        }

      
  }



 


  function collectAddress()

  {
          //  window.location.href = "http://localhost:5000/address"
          //  Axios.post('http://localhost:5000/address').then(function(output)
          //  {
          //     console.log(output.data)
          //  }).catch(function(error)
          //  {
          //     console.error(error)
          //  })   

          setoutput(!output)
  }


  function collectdata(event)
  {
         setdetails({...details , [event.target.name] : event.target.value})
  }


  function deleteaddress(data)
  {
       Axios.delete(`${Server_URL}/deladdress` , {data}).then(function(output)
       {
        console.log("deletedsuccessfully")
        window.location.pathname ='/payment'
       }).catch(function(error)
       {
          console.error(error)
       })
  }


  function senddata(event)
  {
      event.preventDefault()

       
           Axios.post(`${Server_URL}/address`,details).then(function()
           {
          
               setoutput(!output)
               

           }).catch(function(error)
           {
              console.error(error)
           }) 

           window.location.pathname ='/payment'
  }


  return (
    <div>


     
<button style={{marginBottom:'30px'}} onClick={collectAddress} type="button" class="btn btn-warning">Add Address</button>

{
     
     print.map(function(i)
     {
          return  <div className="address-item">
           <input type='radio'/>
           <FontAwesomeIcon icon={faTrash} className='trashicon' onClick={function()
           {
               deleteaddress(i)
           }} />
          <p><span className="address-label">Firstname:</span> {i.Firstname}</p>
          <p><span className="address-label">Lastname:</span> {i.Lastname}</p>
          <p><span className="address-label">Address:</span> {i.Address}</p>
          <p><span className="address-label">City:</span> {i.City}</p>
          <p><span className="address-label">State:</span> {i.State}</p>
          <p><span className="address-label">Zip:</span> {i.Zip}</p>
          <button onClick={function()
          {
            PaymentGateway()
            

          }} type="button" class="btn btn-success">Pay now</button>
        
        </div>
     })





}





{output ? <div class="address-container">
  <h2>Address Form</h2>
  <form action="#" method='post' onSubmit={senddata}>
  


    <div class="address-input-group">
      <label for="fname" class="address-label">First Name:</label>
      <input type="text" id="fname" name="firstname" onChange={collectdata} class="address-input"/>
    </div>
    <div class="address-input-group">
      <label for="lname" class="address-label">Last Name:</label>
      <input type="text" id="lname" name="lastname" onChange={collectdata} class="address-input"/>
    </div>
    <div class="address-input-group">
      <label for="address" class="address-label">Address:</label>
      <input type="text" id="address" name="address" onChange={collectdata} class="address-input"/>
    </div>
    <div class="address-input-group">
      <label for="city" class="address-label">City:</label>
      <input type="text" id="city" name="city" onChange={collectdata} class="address-input"/>
    </div>
    <div class="address-input-group">
      <label for="state" class="address-label">State:</label>
      <input type="text" id="state" name="state" onChange={collectdata} class="address-input"/>
    </div>
    <div class="address-input-group">
      <label for="zip" class="address-label">Zip Code:</label>
      <input type="text" id="zip" name="zip" onChange={collectdata} class="address-input"/>
    </div>
    <button type="submit" class="address-submit-btn">Submit</button>
  </form>
</div>
 : null}


    </div>
  )
}

export default Checkout