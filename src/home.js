import React from 'react'
import Navbar from './Navbar'
import ProductBody from './ProductBody'




function Home() {



  const [dissappear , setdissappear] = React.useState(false)

  const [hidden , sethidden] = React.useState(false)


  return (
    <div>

           <Navbar      ss = {setdissappear} value = {dissappear} hh = {sethidden}  hl = {hidden} />

         

          {dissappear ? null : <ProductBody />}



       


    </div>
  )
}

export default Home