import React from 'react'
import Axios from 'axios'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupeeSign} from '@fortawesome/free-solid-svg-icons';
import Navbar from './Navbar';
import './index.css'
import CartModal from './CartModal';
import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "./redux";
import Server_URL from './URL';

function Description() {

    const [output , setoutput] = React.useState([])

    const {id} = useParams()

    const dispatch = useDispatch()

React.useEffect(function()
{

    Axios.get(`${Server_URL}/getproduct` , { withCredentials: true }).then(function(output)
    {
        console.log(output.data)
        setoutput(output.data)

    }).catch(function(error)
    {
        console.error(error)
    })

},[])


function displayCart(ProductInfo)
{
      dispatch(addToCart(ProductInfo))
}

   
function Particular(data)
{
     Axios.post(`${Server_URL}/Particular`,data ).then(function(output)
     {

     }).catch(function(error)
     {

     })

     window.location.pathname = `/payment/${data.id}`
}



  return (
    
    <div >

        <Navbar/>
        
       {


     output.map(function(i)
     {
            
          

           if(id == i.id)
           {

        
            return <div className='descdiv'  >


              <h1 className='title'>{i.title}</h1>

              <div className='singularflex'>

              <img className='infoimage' src={i.image} height='450px' width = '450px'/>

                

<div className='primaryclass'>
                <button   id='blue'     onClick={function()
                {
                    displayCart(i)
                }}  type="button" class="btn btn-primary">Add to cart</button>
                </div>


                <div className='successclass'>
               <button id='green'    onClick={function()
               {
                  Particular(i)
               }}  type="button" class="btn btn-success">Buy now</button>
                </div> 


                </div>

                <p id='paradesi' >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac risus eget ex fringilla consequat. Suspendisse potenti. Phasellus suscipit felis sed semper bibendum. Sed placerat neque eget lorem ultrices, nec malesuada libero sollicitudin. Nulla facilisi. Cras volutpat quam eget lectus blandit, non cursus purus consequat. Quisque vel felis nunc. Nullam in nunc auctor, bibendum nulla eget, venenatis justo. Mauris vitae dolor ac nibh tristique malesuada eget eu odio. Nulla interdum nunc a ligula scelerisque, vel rhoncus justo fermentum. Nullam scelerisque purus nec est ullamcorper, vel rhoncus turpis fringilla. Cras sit amet venenatis lacus. Suspendisse fringilla malesuada felis, a convallis ex tincidunt at.</p>

              <h3 className='price'>{Math.floor(i.price * 85)}<FontAwesomeIcon icon={faIndianRupeeSign} /></h3>

              <h3 className='description'  >{i.description}</h3>
              
            </div>
           }
     })








       }




   <CartModal/>


    </div>

  )
}

export default Description