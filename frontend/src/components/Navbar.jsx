import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
        <img src={assets.logo} alt="logo_img"/>
        <ul>
            <NavLink>
                <li>Home</li>
                <hr/>
            </NavLink>
             <NavLink>
                <li>All Doctors</li>
                <hr/>
            </NavLink>
             <NavLink>
                <li>About</li>
                <hr/>
            </NavLink>
                <NavLink>
                <li>Contact</li>
                <hr/>
            </NavLink>
        </ul>
        <div>
            <button>Create Account</button>
        </div>
    </div>
  )
}

export default Navbar