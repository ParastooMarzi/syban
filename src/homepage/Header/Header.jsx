import React, { useState } from 'react'
import './Header.css'
import Logo from '../assets/logo.png'
import Bars from '../assets/bars.png'
import Syban from '../assets/Syban.png'
import {Link} from "react-scroll"

const Header = () => {
  const mobile = window.innerWidth<=768 ? true: false;
  const [menuOpened, setMenuOpened] = useState(false)
  return (
    <div className='header'>
      <div className='logo'>
        <img src={Logo} alt=''/>
        <img src={Syban} alt=''/>
      </div>

{(menuOpened===false && mobile===true)? (
  <div
  style={{backgroundColor: 'var(--appColor)' , padding:'0.5rem', borderRadius:'5px'}}
  onClick={() => setMenuOpened(true)}
  >
    <img src={Bars} alt='' style={{width:'1.5rem', height:'1.5rem'}}/>
  </div>
):(
  <ul className='header-menu'>
            <li onClick={() => setMenuOpened(false)}>
              <Link 
              to='header'
              span={true}
             smooth={true}
             onClick={() => setMenuOpened(false)}
              >Home</Link>
            </li>
            <li onClick={() => setMenuOpened(false)}>
              <Link 
              to='Programs'
              span={true}
             smooth={true}
             onClick={() => setMenuOpened(false)}
              >Products</Link>
            </li>
            <li onClick={() => setMenuOpened(false)}>
              <Link 
              to='workflow'
              span={true}
             smooth={true}
             onClick={() => setMenuOpened(false)}
              >task management</Link>
            </li>
            <li onClick={() => setMenuOpened(false)}>
              <Link 
               to='workflow'
               span={true}
             smooth={true}
             onClick={() => setMenuOpened(false)}
               >Team Workflow</Link>
            </li>
            <li onClick={() => setMenuOpened(false)}>
             <Link 
             to='Join'
             span={true}
             smooth={true}
             onClick={() => setMenuOpened(false)}
             >Book a demo</Link>
            </li>
        </ul>
)}

    </div>
  )
}

export default Header