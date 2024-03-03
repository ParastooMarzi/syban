import React from 'react'
import './Header.css'
import Logo from '../assets/logo.png'
import Syban from '../assets/Syban.png'
const Header = () => {
  return (
    <div className='header'>
      <div className='logo'>
        <img src={Logo} alt=''/>
        <img src={Syban} alt=''/>
      </div>
        

        <ul className='header-menu'>
            <li>Home</li>
            <li>Products</li>
            <li>task management software</li>
            <li>Seamless Team Workflow</li>
            <li>Contact</li>
        </ul>
    </div>
  )
}

export default Header