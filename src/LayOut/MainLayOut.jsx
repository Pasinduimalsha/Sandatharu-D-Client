
import { Outlet } from "react-router-dom"

import Navbar from "../Components/Navbar/Navbar"



const MainLayOut = () => {

 

  return (
   <div>
    <Navbar/> 
    <Outlet/>
   
    
   </div>
  )
}

export default MainLayOut