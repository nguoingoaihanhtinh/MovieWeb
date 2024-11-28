import React from 'react'
import { FaAngleDown } from "react-icons/fa6";

const Header = () => {
  return (
    <div className='fixed top-0 w-full transition-all duration-300 shadow-lg bg-container backdrop-blur-sm bg-gradient-to-r from-black/70 to-transparent'>
        <div className="mx-auto flex h-16 max-w-full items-center justify-between px-6 sm:px-8 lg:px-16">
            <div className="flex items-center space-x-6 lg:space-x-8">
                <a href="/">
                    <img className='w-24 sm:w-28 bg-white'>
                    </img>
                </a>
                <nav className='hidden space-x-5 text-base text-gray-200 lg:flex capitalize items-center'>
                    <a href="/" className='transition-colors hover:text-basicLime duration-300'>Trang chủ</a>
                    <a href="/" className='transition-colors hover:text-basicLime duration-300'>Phim lẻ</a>
                    <a href="/" className='transition-colors hover:text-basicLime duration-300'>Phim bộ</a>
                    <a href="/" className='transition-colors hover:text-basicLime duration-300'>Tv show</a>
                    <a href="/" className='transition-colors hover:text-basicLime duration-300'>Hoạt hình</a>
                    <button className='transition-colors hover:text-[#9aff3c] duration-300 flex items-center gap-3'>
                        Thể loại <FaAngleDown />
                    </button>
                </nav>
            </div>
        </div>
    </div>
  )
}

export default Header
