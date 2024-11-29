import React from 'react'
import { FaAngleDown } from "react-icons/fa6";
import NavBar from './NavBar';

const Header = () => {
  return (
    <div className='fixed top-0 z-50 w-full transition-all duration-300 shadow-lg bg-container backdrop-blur-sm bg-gradient-to-r from-black/70 to-transparent'>
        <div className="mx-auto flex h-16 max-w-full items-center justify-between px-6 sm:px-8 lg:px-16">
            <div className="flex items-center space-x-6 lg:space-x-8">
                <a href="/">
                    <img className='w-24 sm:w-28 bg-white' />
                </a>
                <NavBar />
            </div>
        </div>
    </div>
  )
}

export default Header;
