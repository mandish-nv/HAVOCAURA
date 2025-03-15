import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import Navbar from './navbar'
import LandingDiv from './landingDiv'
// import ComputerPartForm from './partsDataEntry'
// import LaptopForm from './laptopDataEntry'
// import RegisterForm from './registration'
// import LoginForm from './login'
// import LogoutButton from './logout'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar/>
    <LandingDiv/>
    {/* <ComputerPartForm/>
    <LaptopForm/>
    <RegisterForm/> 
    <LoginForm/>
    <LogoutButton/>*/}
  </StrictMode>,
)
