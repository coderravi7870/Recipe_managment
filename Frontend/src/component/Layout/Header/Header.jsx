import React from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { useSelector } from 'react-redux';

const Header = () => {
  const {user } = useSelector(state=>state.user);
  
  // if(user){
  //   console.log(user);
  // }
  
  return (
    <div className=' hidden bg-blue-400 h-[60px] sm:flex items-center w-full fixed top-0 z-10'>
      <div className='w-full px-2 flex justify-between items-center'>
        <div>
          <img src="" alt="Logo" />
        </div>

        <div className='relative'>
          <input type="search" className='w-[400px] rounded-full pl-2 pr-8 flex items-center py-1 outline-none' placeholder='search as ingredient...'/>
          <IoSearchOutline  className='absolute right-2 top-1 text-gray-400 cursor-pointer hover:text-gray-500' size={22} />
        </div>

        <div className='flex gap-2 cursor-pointer hover:text-gray-700'>
          <Link to={`${user ? "/profile" : "/login" }`} className='flex items-center'>{
            user ? (
              <img src={user.avatar.url} className='w-[40px] h-[40px] border border-blue-500 rounded-full'/>
            ) : <CgProfile size={40}/>
          } ({user && user?.email})</Link>
        </div>
      </div>
    </div>
  )
}

export default Header