import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router' 

import './styles/index.css'
import LandingPage from './landingPage'
import LoginForm from './login'
import ComputerPartForm from './partsDataEntry'
import LaptopForm from './laptopDataEntry'
import RegisterForm from './registration'

import LaptopList from './storeLaptops'
import PartsList from './storeParts'
// import DisplayPart from './components/partsDescription' //routing needed
// import DisplayLaptop from './components/laptopDescription' //routing needed
import BuildAPc from './buildAPc'
import Photo from './photo'


const router=createBrowserRouter([
  {
    path:'/',
    element:<LandingPage/>,  
    errorElement:<Error/>
  },
  {
    path:'/login',
    element:<LoginForm/>,  
    errorElement:<Error/>
  },
  {
    path:'/register',
    element:<RegisterForm/>,  
    errorElement:<Error/>
  },
  {
    path:'/buildapc',
    element:<BuildAPc/>,  
    errorElement:<Error/>
  },
  {
    path:'/laptops',
    element:<LaptopList/>,  
    errorElement:<Error/>
  },
  {
    path:'/parts',
    element:<PartsList/>,  
    errorElement:<Error/>
  },
  {
    path:'/laptopdata',
    element:<LaptopForm/>,  
    errorElement:<Error/>
  },
  {
    path:'/partsdata',
    element:<ComputerPartForm/>,  
    errorElement:<Error/>
  },
  {
    path:'/photo',
    element:<Photo/>,  
    errorElement:<Error/>
  },
], { debug: true })

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider> 
  </StrictMode>,
)
