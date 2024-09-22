import React from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className=' hidden bg-blue-400 h-[60px] sm:flex items-center w-full fixed top-0 z-10'>
      <div className='w-full px-2 flex justify-between items-center'>
        <div>
          <img src="" alt="Logo" />
        </div>

        <div className='relative'>
          <input type="search" className='w-[350px] rounded-full pl-2 pr-8 flex items-center py-1 outline-none' placeholder='search as ingredient...'/>
          <IoSearchOutline  className='absolute right-2 top-2 text-gray-400 cursor-pointer hover:text-gray-500' size={22} />
        </div>

        <div className='flex gap-2 cursor-pointer hover:text-gray-700'>
          <Link to="/login">SignIn/SignUp</Link>
        </div>
      </div>
    </div>
  )
}

export default Header