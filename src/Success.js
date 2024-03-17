import React from 'react';
import Axios from 'axios';
import './index.css'
import {Link} from 'react-router-dom'
import Server_URL from './URL';

function Success() {
  const [output, setOutput] = React.useState([]);

  React.useEffect(() => {
    Axios.get(`${Server_URL}/ordersave`)
      .then((response) => {
        setOutput(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

   function resetdata()
   {
       Axios.delete(`${Server_URL}/reset`).then(function(output)
       {
         console.log("hey")
       }).catch(function(error)
       {
          console.error(error)
       })
   }
  

  return (
    
    <div>
   


       {output.length != 0 ? <div>  <h2 className='heading'>You have successfully ordered these items</h2>
        <div className="success-container">
    
    {output.map((item) => (
      <div className="card" key={item.id}>
        <h6>{item.id}</h6>
        <img className="card-img-top" src={item.image} alt="" />
        <div className="card-body">
          <h5 className="card-title">{item.title.substring(0, 20)}</h5>
          <h6>INR. {Math.floor(item.price * 85)}</h6>
          <p className="card-text">{item.description.substring(0, 40)}</p>
        </div>
      </div>
    ))}
  </div>

   <h2>Thank you for shopping , please visit us again!</h2>
   
  <Link to='/home'  onClick={resetdata} > <button type="button" class="btn btn-light">Please click here to go home</button></Link>


</div> :<div> <h1>Please go back to home</h1>




<Link to='/home' onClick={resetdata} > <button type="button" class="btn btn-light">Please click here to go home</button></Link>
</div>



}



    </div>
  );
}

export default Success;
