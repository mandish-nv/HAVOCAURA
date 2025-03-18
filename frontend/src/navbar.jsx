import { useState } from "react"
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Navbar() {
    const [check, setCheck] = useState(false)
    const [check1, setCheck1] = useState(false)
    const [check2, setCheck2] = useState(false)
    const userData = JSON.parse(sessionStorage.getItem('user')) || false

    const logout=()=>{
        sessionStorage.clear()
    }
    return (
        <div className="nav-bar">
            <div style={{height:'70px',width:'70px'}}>
                <img src="logo.png" style={{height:'100%',width:'100%',objectFit:'cover'}}/>
            </div>
            <div className="nav-btn">
                <div><Link to={'/'} className="link">Home</Link></div>
                <div style={{ position: 'relative' }} onMouseEnter={() => setCheck(true)} onMouseLeave={() => setCheck(false)}>
                    Store
                    <div className="hover-div" style={{ opacity: check ? '1' : '0' }} color="black">
                        <div><Link to={'/laptops'} className="link">Laptops</Link></div >
                        <div><Link to={'/parts'} className="link">Computer Parts</Link></div >
                    </div>
                </div>
                <div><Link to={'/buildapc'} className="link">Build a PC</Link></div>
                <div>Contact Us</div>
                
                <div style={{ fontSize: '1.7rem', position: 'relative' }}>
                    <MdOutlineShoppingCart />
                    <div className="cart-number">0</div>
                </div>
                <div style={{ position: 'relative',display: userData ? 'none' : '' }} onMouseEnter={() => setCheck1(true)} onMouseLeave={() => setCheck1(false)}>My Account
                    <div className="hover-div" style={{ opacity: check1 ? '1' : '0' }} color="black">
                        <div><Link to={'/login'} className="link">Login</Link></div >
                        <div><Link to={'/register'} className="link">Register</Link></div >
                    </div>
                </div>
                <div style={{ display: userData ? '' : 'none',position:'relative' }} onMouseEnter={() => setCheck2(true)} onMouseLeave={() => setCheck2(false)}>
                    <div  className="circle" >
                        <img src={userData.profilePicture} style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
                    </div>
                    <div className="logout" style={{ opacity: check2 ? '1' : '0' }} color="black" onClick={logout}>Logout</div>
                </div>
            </div>
        </div>
    )
}