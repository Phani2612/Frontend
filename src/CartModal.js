import React from 'react'
import { useSelector } from "react-redux"
import "./CartModal.css"
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash , faPlus , faMinus } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios'
import Server_URL from './URL';



function CartModal() 
{

 
    let total = 0
    //Read the data from the redux store

    const [output , setoutput] = React.useState([])
    

    // const output = useSelector(function(i)
    // {
    //     console.log(i)
    //     return i.product.cart
        
    // }) 

    React.useEffect(function()
    {
             Axios.post(`${Server_URL}/cart`  ).then(function(output)
             {   
                 console.log("cartmodal",output.data)
                 setoutput(output.data)
                 
             }).catch(function(error)
             {
              console.error(error)
             })
    },[output])

    function deleteparticular(id)
    {
      Axios.delete(`${Server_URL}/delete/${id}`).then(function(output)
      {   
          
          setoutput(output.data)
      }).catch(function(error)
      {
       console.error(error)
      })
    }
    
    function increaseproduct(id)
    {
        console.log("increase quantity")

        Axios.patch(`${Server_URL}/update/${id}`).then(function(output)
        {   
            console.log(output.data)
            setoutput(output.data)
        }).catch(function(error)
        {
         console.error(error)
        })
    }

    function decreaseproduct(id)
    {
      Axios.patch(`${Server_URL}/decrease/${id}`).then(function(output)
      {   
          console.log(output.data)
          setoutput(output.data)
      }).catch(function(error)
      {
       console.error(error)
      })
    }






    function payment()
    {
     

         window.location.pathname = '/payment'
    }

    
    function Particular(data)
    {
         Axios.post(`${Server_URL}/Particular`,data).then(function(output)
         {

         }).catch(function(error)
         {

         })

         window.location.pathname = `/payment/${data.id}`
    }


    function Allitems()
    {
      Axios.post(`${Server_URL}/all`,output ).then(function(output)
      {

      }).catch(function(error)
      {

      })
    }


   
   

  return (

    
    
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">


    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">Product details</h5>
          <button style={{width:'100px'}} className='bluebutton' type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          
        {
          
             output.map(function(i)
             {
              {total = total + Math.floor(i.final * 85)}

              
              
                return <div className='cartproducts' style={{border: "1px dotted black", marginTop:"10px"}}>

                  <div style={{fontSize:'20px'}}  ><FontAwesomeIcon icon={faMinus} onClick={function()
                  {
                        decreaseproduct(i.id)
                  }} /></div>
                 <div><FontAwesomeIcon onClick={function()
                 {
                  increaseproduct(i.id)
                 }} style={{fontSize:'50px'}} icon={faPlus} /></div>
                 <div className='deletecarticon' style={{marginLeft:"400px", marginTop:'-50px'}}><FontAwesomeIcon className='deletecart' onClick={function(){
                    deleteparticular(i.id)
                 }} style={{fontSize:'50px'}} icon={faTrash} /></div>
                <img src={i.image} width="40px" height="80px"/> 
               
                <h5><b>Name : </b>{i.title}</h5>
                <h6><b>Price : </b>{Math.floor(i.final * 85)}</h6>
                <h6><b>Quantity : </b>{i.quantity}</h6>
                <button onClick={function()
                {
                  Particular(i)
                }} style={{width:'100px' , fontSize:'10px' , marginLeft:'160px'}} type="button" class="btn btn-success">Buy Product</button>
               </div>
             })
             
        }


        </div>
        <div class="modal-footer">
          


{output.length != 0 ?  <button class="btn btn-success" onClick={function()
{
   payment()
   Allitems(output)
}}>
    Proceed to pay {total} .INR
</button> : <button type="button" class="btn btn-secondary">Please add Items</button>}

        
          
        </div>
      </div>
    </div>
  </div>

  
  )
}

export default CartModal
