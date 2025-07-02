import { PlayerContext } from '@/context/PlayerContext'
import { Pause, Play } from 'lucide-react'
import React, { useContext } from 'react'

const SongItem = ({name, image, desc, id}) => {
  const {play, playStatus, playWithId} = useContext(PlayerContext)
  return (
    <div className='max-w-[175px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26] group relative'>
      <img src={image} className='rounded w-38' alt="" />
      <p className='font-bold mt-2 mb-1 truncate overflow-ellipsis w-[150px]'>{name}</p>
      <p className='text-gray-400 group-hover:text-slate-200 text-[15.1px] break-words'>{desc}</p>

      <div className='absolute  right-5 bottom-[80px] bg-green-500 rounded-full w-[40px] h-[40px] flex items-center justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300'>
           <Play onClick={(e)=>{
            e.preventDefault();
            e.stopPropagation();
            playWithId(id)
           }} className='text-black ' />
      </div>
    </div>
  )
}

export default SongItem
