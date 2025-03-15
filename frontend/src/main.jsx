import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import Navbar from './navbar'
import LandingDiv from './landingDiv'
// import ComputerPartForm from './partsDataEntry'
// import LaptopForm from './laptopDataEntry'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar/>
    <LandingDiv/>
    {/* <ComputerPartForm/>
    <LaptopForm/> */}
  </StrictMode>,
)
