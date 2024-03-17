

import { useState , useEffect } from 'react'
import CartModal from './CartModal'
import './CartModal.css'
import {Link , Route , Routes} from 'react-router-dom'
import Axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo , faCartShopping} from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from "react-redux"
import { addToCart } from "./redux";
import './App.css'
import { Mybox } from './App'
import { useContext } from 'react'
import Server_URL from './URL'


function Navbar(props) 
{

  const {data} = useContext(Mybox)



  // const output = useSelector(function(i)
  // {
  //   return i.product.cart
  // })

  const dispatch = useDispatch()

  const [output , setoutput] = useState([])

  const [Product , setproduct] = useState([])

  const [searchproduct , setsearchproduct] = useState([])

  const [Another , setAnother] = useState(false)
 
  const [Gather , setGather] = useState('')

  
useEffect(function()
    {
             Axios.post(`${Server_URL}/cart`).then(function(output)
             {   
                
                 setoutput(output.data)
             }).catch(function(error)
             {
              console.error(error)
             })

  
    },[output])


useEffect(function()
{

  Axios.get(`${Server_URL}/getproduct`,{withCredentials : true}).then(function(output)
  {   
      
    setproduct(output.data)
      
  }).catch(function(error)
  {
   console.error(error)
  })

},[])
    

    function searchdata(event)
    {
          // console.log(event.key)

         
          if(event.target.value === "")
          {
              
               props.ss(false)
               setsearchproduct([])
               setAnother(false)
          }

          
          else{
              
              
          props.ss(true)
             
         
          const Searchedterm = event.target.value.toLowerCase()

          setGather(Searchedterm)

          const FilteredProducts = Product.filter(function(i)
          {
            if(i.title.toLowerCase().startsWith(Searchedterm) || i.category.toLowerCase().startsWith(Searchedterm)   )
            {
                   return i
            }

          })

           
          if(FilteredProducts.length > 0)
          {
              setAnother(true)
              setsearchproduct(FilteredProducts)
          }

          else{

             setAnother(false)
             setsearchproduct([])
          }
           

          
          }

          
         
        
          
          
    }

    function displayCart(productInfo)
    {
       
       
       dispatch(addToCart(productInfo))//Name and Price
       // dispatch(increaseQuantity())
 
            
     
    }


    function updatestate()
    {
          data(false)
    }


    function searchlinks(event)
    {

          

          

          console.log(Gather)


          event.preventDefault()

          
          const arrayy = ["men's clothing"  , 'jewelery' , "women's clothing" ,  'electronics']

          
          arrayy.map(function(i)
          {
               if(i.startsWith(Gather))
               {
                   window.location.pathname = `/${i}`
               }
          })
      


          
          

         
    }


  
  return (
   <div>

  
<div className='Navbar'>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark" style={{height: "70px"}}>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className='navbarUL' class="navbar-nav mr-auto">
            <li class="nav-item active">
                <Link class="nav-link" to='/home'>Home <span class="sr-only">(current)</span></Link>
                
            </li>
            <li class="nav-item">
                <Link class="nav-link" to='/About'  >About us</Link>
            </li>
            <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Categories
        </a>
        <div  class="dropdown-menu" aria-labelledby="navbarDropdown">
          <Link to='/electronics' class="dropdown-item" href="#">Electronics</Link>
          <Link   to='/jewelery' class="dropdown-item" href="#">Jewelery</Link>
          <Link className='menslink'  to= "/men's clothing"   class="dropdown-item">Men's</Link>
          <Link  to="/women's clothing" class="dropdown-item">Women's</Link>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
      

            <li class="nav-item">
                <Link class="nav-link" to='/order' >Orders</Link>
            </li>
            <li class="nav-item">
                <Link class="nav-link"  to='/contact' >Contact</Link>
            </li>
            <li  class="nav-item">
                <Link class="nav-link" to='/'  onClick={updatestate}>Logout</Link>
            </li>
            </ul>
    <form className='formnav' class="form-inline my-2 my-lg-0">
           



<div className='searchinput'>

<input className='searchbar'  onChange={searchdata}  class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" style={{width: '500px', marginTop:"10px",marginLeft:"-300px" ,  '@media (max-width: 480px)': {
      display: 'block'
    }}}/>
</div>

         
              
<div className='searchbutton'>
<button style={{width:'100px'}} onClick={searchlinks} className='SearchButton' class="btn btn-outline-success my-2 my-sm-0"   type="submit">Search</button>      
</div>
 

<div className='cartimage'>
{/* <img style = {{marginLeft:'20px', marginTop:"-60px"}}data-target="#exampleModal" data-toggle="modal" width="40px" src="https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/shopping_cart.png"/>  */}

<FontAwesomeIcon icon={faCartShopping} data-target="#exampleModal" data-toggle="modal"  style={{color : 'white' , fontSize:'40px'}}      />

</div>

<div  id="cartCount">{output.length}

         
</div>
 
            </form>
        </div>
        </nav>






        
    </div>

 {Another ?   
   <div className='outer' >

   {
 
    searchproduct.map(function(i)
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
 : null}


    <CartModal/>

   </div>
  )
}



export default Navbar
