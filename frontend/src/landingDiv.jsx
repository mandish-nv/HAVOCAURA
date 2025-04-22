import laptop from './assets/laptop.png'
import {Link} from 'react-router-dom'

export default function LandingDiv(){
    return(
        <div className="landing">
            <div className='landing-text'>
                <div style={{fontSize:'1.2rem',fontWeight:'500'}}>Wide Range of Selections of Laptop and Computer Parts</div>
                <div style={{fontSize:'3rem',fontWeight:'bold'}}>Enhance your PC Building Experience With Our Service</div>
                <div className='shop-now'><Link to={'/laptops'} className='link' style={{color:'white'}}>Shop Now</Link></div>
            </div>
            <div>
                <img src={laptop} style={{height:'100%',width:'100%',objectFit:'contain'}}></img>
            </div>
        </div>
    )
}