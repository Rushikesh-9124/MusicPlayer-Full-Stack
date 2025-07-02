import { albumsData, assets, songsData } from '@/assets/frontend-assets/assets'
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from './Navbar'
import { PlayerContext } from '@/context/PlayerContext'

const MusicItem = () => {
  const { id } = useParams(); // <-- now this is _id, not index
  const { songsData, playWithId } = useContext(PlayerContext)
  
  const songData = songsData.find(song => song._id === id); 
  
  if (!songData) return <p>Loading or song not found</p>
  
  return (
    <div>
      <Navbar />
      <div className='mt-10 flex flex-col gap-8 md:flex-row md:items-end'>
        <img className='rounded-lg w-50'  src={songData.image} alt="" />
        <div className="flex flex-col ">
            <p >Song</p>
            <h2 className='text-5xl md:text-7xl font-bold  mb-4'>{songData.name}</h2>
            <h4>{songData.desc}</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 mt-10 mb-4 sm:grid-cols-4 pl-2 text-[#a7a7a7]'>
            <p><b className='mr-4'>#</b>Title</p>
            <p>Album</p>
            <p className='hidden sm:block'>Date Added</p>
            <img className='w-4 m-auto' src={assets.clock_icon} alt="" />
        </div>
        <div onClick={()=>playWithId(songData._id)}  className='grid grid-cols-3 sm:grid-cols-4 items-center py-3 rounded-lg mb-4 pl-2 tetx-white hover:bg-[#ffffff26] group cursor-pointer'>
            <p className='max-w-40 truncate overflow-ellipsis '><b className='mr-4 '>1</b><img className='w-10 inline mr-3' src={songData.image} alt="" /><p className='inline '>{songData.name}</p></p>
            <p>{songData.album ?? ""}</p>
            <p className='hidden sm:block'>5 days ago</p>
            <p className='text-center'>{songData.duration}</p>
        </div>
    </div>
  )
}

export default MusicItem
