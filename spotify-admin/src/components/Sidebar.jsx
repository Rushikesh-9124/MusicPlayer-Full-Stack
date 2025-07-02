import { assets } from '@/assets/admin-assets/assets'
import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Sidebar = () => {
    const NavLinkCss = 'flex items-center gap-2.5 text-gray-800 border border-black p-2 pr-[max(5vw,10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium transition-all duration-200 ease-in-out';
  return (
    <div className='bg-[#003A10] min-h-screen pl-[4vw]'>
      <img src={assets.logo} alt="" className='mt-5 w-[max(10vw,100px)] mr-12 hidden sm:block' />
      <img src={assets.logo_small} alt="" className='mt-5 w-[max(5vw,40px)] mr-5  block sm:hidden' />

      <div className='flex flex-col gap-5 mt-10'>
        <NavLink to={'/add-song'} className={({isActive}) => isActive ? `${NavLinkCss} bg-gradient-to-r from-lime-400 via-emerald-400 to-green-500` : `${NavLinkCss} bg-white`}>
            <img src={assets.add_song} className='w-5' alt="" />
            <p className='hidden sm:block'>Add Song</p>
        </NavLink>
        <NavLink to={'/list-song'} className={({isActive}) => isActive ? `${NavLinkCss} bg-gradient-to-r from-lime-400 via-emerald-400 to-green-500` : `${NavLinkCss} bg-white`}>
            <img src={assets.song_icon} className='w-5' alt="" />
            <p className='hidden sm:block'>List Song</p>
        </NavLink>
        <NavLink to={'/add-album'} className={({isActive}) => isActive ? `${NavLinkCss} bg-gradient-to-r from-lime-400 via-emerald-400 to-green-500` : `${NavLinkCss} bg-white`}>
            <img src={assets.add_album} className='w-5' alt="" />
            <p className='hidden sm:block'>Add Album</p>
        </NavLink>
        <NavLink to={'/list-album'} className={({isActive}) => isActive ? `${NavLinkCss} bg-gradient-to-r from-lime-400 via-emerald-400 to-green-500` : `${NavLinkCss} bg-white`}>
            <img src={assets.album_icon} className='w-5' alt="" />
            <p className='hidden sm:block'>List Album</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
