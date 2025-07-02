import { ArrowLeft, ArrowRight, Download } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { Button } from './ui/button'
import { PlayerContext } from '@/context/PlayerContext'

const Navbar = () => {
    const {id} = useParams()
    const {songsData, albumsData} = useContext(PlayerContext)
    const Navigation = useNavigate()
    const path = ['/',`/album/`, `/music/`, '/podcast']
  return (
    <>
      <div className="w-full flex justify-between items-center font-semibold">
        <div className="flex items-center gap-2">
            <ArrowLeft onClick={()=>Navigation(-1)} className='hover:bg-white hover:text-black transition-all hover:rounded-full'/>
            <ArrowRight onClick={()=>Navigation(+1)} className='hover:bg-white hover:text-black transition-all hover:rounded-full' />
        </div>
        <div className='flex items-center gap-4'>
            <Button onClick={()=>{window.location.assign('https://www.spotify.com/in-en/premium/')}}
            className='h-[30px] px-5 bg-white text-black rounded-full pb-7 text-center hover:text-white hover:bg-[#333] hidden md:block  transition-all delay-100'
            >Explore Premium</Button>
            <Button onClick={()=>{window.location.assign('https://open.spotify.com/download')}}
            className='h-[30px] px-5 bg-green-600 cursor-pointer rounded-full pb-7 text-center text-black hidden md:block
            hover:bg-[#333] hover:text-white transition-all delay-100'
            ><span className='flex items-center gap-2'><Download/> Install App</span></Button>
            <div className='w-8 h-8 font-semibold cursor-pointer shadow-amber-50 rounded-full bg-purple-800 flex items-center justify-center text-black'>R</div>
        </div>
      </div>
      <div className='flex items-center gap-2 mt-4'>
            {
                ["All", "Album", "Music", "Podcast"].map((item, index) => (
                    <NavLink to={path[index]}
                    key={index}
                    className={({isActive}) => `list-none cursor-pointer px-3.5 py-1 rounded-full  ${isActive ? 'bg-green-600 text-black' : 'text-black bg-white '}`}
                    >
                        <li onClick={()=>setActiveIndex(index)}>{item}</li>
                    </NavLink>
                ))
            }
      </div>
    </>
  )
}

export default Navbar
