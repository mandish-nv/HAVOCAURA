import { useState } from "react"
import { MdOutlineShoppingCart } from "react-icons/md";


export default function Navbar(){
    const [check,setCheck]=useState(false)
    return(
        <div className="nav-bar">
            <div>Logo
                
            </div>
            <div className="nav-btn">
                <div>Home</div>
                <div style={{position:'relative'}} onMouseEnter={()=>setCheck(true)} onMouseLeave={()=>setCheck(false)}>
                    Store
                    <div className="hover-div" style={{opacity:check?'1':'0'}} color="black">
                        <div color="black">Laptops</div >
                        <div>Computer Parts</div >
                    </div>
                </div>
                <div>Build a PC</div>
                <div>Contact Us</div>
                <div>My Account</div>
                <div style={{fontSize:'1.7rem',position:'relative'}}>
                    <MdOutlineShoppingCart />
                    <div className="cart-number">0</div>
                </div>
                <div>Profile</div>
            </div>
        </div>
    )
}