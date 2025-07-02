import { ArrowBigLeftIcon, ArrowRight, ArrowRightCircle, Home, Plus, Search } from 'lucide-react'
import {assets} from '../assets/frontend-assets/assets'
import React from 'react'
import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
    const Navigation = useNavigate()
  return (
    <div className='w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex'>
        <div className="bg-[#121212] h-[15%] rounded-lg flex flex-col justify-around">
            <div onClick={()=>Navigation('/')} className="flex items-center gap-4 pl-10 cursor-pointer">
                <Home /> <p className='font-bold'>Home</p>
            </div>
            <div className="flex items-center gap-4 pl-10 cursor-pointer">
                <Search /> <p className='font-bold'>Search</p>
            </div>
        </div>
        <div className="bg-[#121212] h-[85%] rounded-lg">
            <div className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img src={assets.stack_icon} alt="" className='w-8' />
                    <p className='font-semibold'>Your Library</p>
                </div>
                <div className="flex items-center gap-3">
                    <ArrowRight className='cursor-pointer text-[25px] transition-all hover:bg-gray-50 hover:text-black rounded-full '/>
                    <Plus className='cursor-pointer text-[25px]  transition-all hover:bg-gray-50 hover:text-black rounded-full '/>
                </div>
            </div>
            <div className="p-4 bg-[#242424] m-2 rounded-lg font-semibold flex flex-col items-start justify-start gap-1 pl-4">
                <h1>Create Your First Playlist</h1>
                <p className='font-light'>It's ease we'll help you</p>
                <Button variant='outline' className='px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4 transition-all cursor-pointer active:scale-102'>Create Playlist</Button>
            </div>
            <div className="p-4 bg-[#242424] m-2 rounded-lg font-semibold flex flex-col items-start justify-start gap-1 pl-4">
                <h1>Let's find some podcast to follow</h1>
                <p className='font-light'>We'll keep you update on new episodes</p>
                <Button variant='outline' className='px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4 transition-all cursor-pointer active:scale-102'>Browse Podcast</Button>
            </div>
        </div>
    </div>
  )
}

export default Sidebar
