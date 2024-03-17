import React, { useEffect } from "react";
import Axios from "axios"
import { addProducts } from "./redux";
import { useDispatch, useSelector } from "react-redux"
import "./App.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

import { addToCart } from "./redux";
import {Link} from 'react-router-dom'



function ProductBody() 
{

   
  
    const productsData = useSelector(function(output)
    {
        return output.product.products
    })
   const dispatch = useDispatch()

   useEffect(function()
   {
      Axios.get("https://fakestoreapi.com/products")
      .then(function(output)
      {
        
        dispatch(addProducts(output.data))
        
      })
      .catch(function(error)
      {
        alert(error)
      })
   },[])


  

   function displayCart(productInfo)
   {
      
      
      dispatch(addToCart(productInfo))//Name and Price
      // dispatch(increaseQuantity())

           
    
   }
  
    return (
      
        <div className="outer">
        {
          
          
          productsData.map(function(i)
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
                    
                    <div style={{marginLeft:'180px', marginTop:'-30px'}}>
                    <Link to={`/product/${i.id}`}         ><FontAwesomeIcon data-toggle="modal" data-target="#exampleModalLong" icon={faCircleInfo} /></Link>
                      </div>

                   
                  </div>
                  
                </div>
          })
        }
        
      </div>
     
    )
}

export default ProductBody

