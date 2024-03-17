 import React from 'react'
import Navbar from './Navbar'
import './CartModal.css'
import './App.css'
import Axios  from 'axios'
import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "./redux";
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom'


 function Electronic() {

   
  const [dissappeared , setdissappeared] = React.useState(false)

 

   const {category} = useParams()

   console.log(category)


   const [output , setoutput] = React.useState([])

   const dispatch = useDispatch()

   React.useEffect(function()
   {

      Axios.get(`https://fakestoreapi.com/products/category/${category}`).then(function(output)
      {

        setoutput(output.data)

      }).catch(function(error)
      {
        console.error(error)
      })

   },[category])

   function displayCart(productInfo)
   {
      
      
      dispatch(addToCart(productInfo))//Name and Price
      // dispatch(increaseQuantity())

           
    
   }



   return (
     <div>
          <Navbar ss = {setdissappeared}  />
         
         <div className="outer">



         {

output.map(function(i)
{
    return <div class="card">

    <h6>{i.id}</h6>
 
    <img id="images" class="card-img-top" src={i.image} alt="" />
    <div class="card-body">
      <h5 class="card-title" style={{fontSize: "15px", fontWeight: 700}}>{i.title.substring(0, 20)}</h5>
      <h6 style={{fontWeight: 300}}>INR.{Math.floor(i.price * 85)}</h6>
      <p class="card-text">{i.description.substring(0, 40)}</p>
      <button onClick={function()
      {
       
        displayCart(i)

      }}  className="btn btn-primary">ADD TO CART</button>

      <div style={{marginLeft:'180px', marginTop:'-30px'}} >

      <Link to={`/product/${i.id}`}         ><FontAwesomeIcon data-toggle="modal" data-target="#exampleModalLong" icon={faCircleInfo} /></Link>

      </div>

     
    </div>
    
  </div>
})
}




         </div>

     </div>
   )
 }
 
 export default Electronic