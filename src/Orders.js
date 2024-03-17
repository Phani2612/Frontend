import React from 'react'
import Axios from 'axios'
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom'
import Navbar from './Navbar'
import Server_URL from './URL';


function Orders() {

const [Output , setOutput] = React.useState([])

React.useEffect(function()
{
    Axios.get(`${Server_URL}/orderhistory`).then(function(output)
    {
        console.log(output.data)
        setOutput(output.data)

    }).catch(function(error)
    {
        console.error(error)
    })

},[Output])


  return (
    <div>

      <Navbar/>

      <div className='orderdetails'>

   {Output ?     

Output.map(function(i)
{
return <div class="card">

 <h6>{i.id}</h6>

 <img id="images" class="card-img-top" src={i.image} alt="" />
 <div class="card-body">
   <h5 class="card-title" style={{fontSize: "15px", fontWeight: 700}}>{i.title.substring(0, 20)}</h5>
   <h6 style={{fontWeight: 300}}>INR.{Math.floor(i.price * 85)}</h6>
   <p class="card-text">{i.description.substring(0, 40)}</p>
  
   
   <div style={{marginLeft:'180px', marginTop:'-30px'}}>
   <Link to={`/product/${i.id}`}         ><FontAwesomeIcon data-toggle="modal" data-target="#exampleModalLong" icon={faCircleInfo} /></Link>
     </div>

  
 </div>
 
</div>
})


 :  <h1>You don't have any orders right Now!</h1>}




      </div>



    </div>
  )
}

export default Orders