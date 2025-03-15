import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './styles/index.css'
import Navbar from './navbar'
import LandingDiv from './landingDiv'
// import ComputerPartForm from './partsDataEntry'
// import LaptopForm from './laptopDataEntry'
// import RegisterForm from './registration'
// import LoginForm from './login'
// import LogoutButton from './logout'
// import LaptopList from './storeLaptops'
// import PartsList from './storeParts'
// import DisplayPart from './components/partsDescription' //routing needed
// import DisplayLaptop from './components/laptopDescription' //routing needed
// import BuildAPc from './buildAPc'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar/>
    <LandingDiv/>
    {/* <ComputerPartForm/>
    <LaptopForm/>
    <RegisterForm/> 
    <LoginForm/>
    <LogoutButton/>*/}

    {/* <LaptopList/>
    <PartsList/> */}
    
    {/* <DisplayPart/> 
    <DisplayLaptop/>*/}

    {/* <BuildAPc/> */}
  </StrictMode>,
)
