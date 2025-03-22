import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router' 

import './styles/index.css'
import LandingPage from './landingPage'
import LoginForm from './login'

import RegisterForm from './registration'

import LaptopList from './storeLaptops'
import PartsList from './storeParts'
import BuildAPc from './buildAPc'
import Photo from './photo'
import DisplayLaptop from './components/laptopDescription'
import DisplayPart from './components/partsDescription'
import CartList from './cart'
import Checkout from './checkout'
import ViewOrders from './components/viewOrders'


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
    path:'/photo',
    element:<Photo/>,  
    errorElement:<Error/>
  },
  {
    path:'/laptopdescription/:id',
    element:<DisplayLaptop/>,  
    errorElement:<Error/>
  },
  {
    path:'/partdescription/:id',
    element:<DisplayPart/>,  
    errorElement:<Error/>
  },
  {
    path:'/cart',
    element:<CartList/>,  
    errorElement:<Error/>
  },
  {
    path:'/checkout/:checkoutId',
    element:<Checkout/>,  
    errorElement:<Error/>
  },
  {
    path:'/viewOrders',
    element:<ViewOrders/>,  
    errorElement:<Error/>
  },
], { debug: true })

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider> 
  </StrictMode>,
)
