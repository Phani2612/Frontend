
import {BrowserRouter , Link , Routes , Route} from "react-router-dom"
import Login from "./Login";
import Register from "./Register";
import Home from "./home";
import Electronic from "./Electronic";
import Checkout from "./Gateway";
import Success from "./Success";
import Description from "./Description";
import Orders from "./Orders";
import React from "react";

import { createContext } from "react";
import Contact from "./Contact";
import About from "./About";
import Message from "./Message";


export const Mybox = createContext()


function App() 
{

 

 const [showData, setShowData] = React.useState(function()

  {

         const Mystoreddata = localStorage.getItem("showData")

         return Mystoreddata ? JSON.parse(Mystoreddata) : false
  }
 )

 React.useEffect(function()
 {  
     
   localStorage.setItem('showData' , JSON.stringify(showData))

 },[showData])


    return (
      <div>

        <Mybox.Provider   value = {{data : setShowData}}>



       

        <BrowserRouter>

        <Routes>

        <Route path="" element={<Login data = {setShowData}    />}></Route>

<Route path="/register" element={<Register/>}></Route>

        </Routes>
        

        {showData ?          <Routes>



<Route path="/home" element={<Home info = {setShowData}   />}></Route>

<Route path="/:category" element={<Electronic/>}></Route> 

<Route path="/message" element={<Message/>} ></Route>

<Route path="/payment" element={<Checkout/>}>


<Route path=":id" element={<Checkout/>}></Route>

</Route> 


<Route path="/contact" element={<Contact/>} ></Route>

<Route path="/About" element={<About/>}  ></Route>


<Route path="/success" element={<Success/>}></Route> 


<Route path="/product/:id" element={<Description/>}></Route> 

<Route path="/order" element={<Orders/>}></Route>

</Routes> : null}
        
      
        </BrowserRouter>


        </Mybox.Provider>
        
      </div>
    )
}

export default App;
