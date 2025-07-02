import { Play } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const AlbumItem = ({image, name, desc, id}) => {
  return (
    <Link to={`/album/${id}`}>
      <div className='min-w-[175px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26] relative group'>
        <img className='rounded' src={image} alt="" />
          <p className='font-bold mt-2 mb-1'>{name}</p>
          <p className='text-gray-400 group-hover:text-slate-200 text-[15.1px] '>{desc}</p>

          <div className='absolute right-5 bottom-[118px] w-[40px] h-[40px] bg-green-500 rounded-full flex justify-center items-center  translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 duration-300'>
              <Play  className='text-black'/>
          </div>
      </div>
    </Link>
  )
}

export default AlbumItem
