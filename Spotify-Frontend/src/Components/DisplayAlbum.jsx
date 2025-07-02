import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from './Navbar'
import { PlayerContext } from '@/context/PlayerContext'
import { assets } from '@/assets/frontend-assets/assets'

const DisplayAlbum = ({album}) => {
    const {id} = useParams()
    const {playWithId, albumsData, songsData} = useContext(PlayerContext)
    const [albumData, setAlbumData] = useState("")

    useEffect(()=>{
      albumsData.map((item, idx)=>{
        if(item._id === id){
          setAlbumData(item)
        }
      })
    },[])

  return albumData ? (
    <>
      <Navbar />
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
        <img className='w-48 rounded' src={albumData.image} alt="" />
        <div className="flex flex-col ">
            <p>Playlist</p>
            <h2 className='text-5xl font-bold mb-4 md:text-7xl'>{albumData.name}</h2>
            <h4>{albumData.desc}</h4>
            <p className='mt-1'>
              <img src={assets.spotify_logo} className='inline-block w-5' alt="" />
              <b>Spotify </b>
              &bull; 1,254,036 likes
              &bull; <b>50 songs, </b>
              <span className='inline-block text-[#ffffff83]'>about 2 hours 30 min</span>
            </p>
        </div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
        <p><b className='mr-4'>#</b> Title</p>
        <p>Album</p>
        <p className='hidden sm:block'>Date Added</p>
        <img className='m-auto w-4' src={assets.clock_icon} alt="" />
      </div>
      <hr />
      {
        songsData.filter((item)=>item.album == album.name).map((item, idx) => (
            <Link onClick={()=>{playWithId(item._id)}} to={`/music/${item._id}`} key={item._id} className="grid grid-cols-3 mt-1 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer">
                <p  className='text-white flex items-center'>
                    <b className='mr-4 text-[#a7a7a7]'>{idx +1}</b>
                    <img src={item.image} className='inline w-10 mr-5 rounded' alt="" />
                    {item.name}
                </p>
                <p className='text-start text-[15px] hidden sm:block'>{albumData.name}</p>
                <p>5 days ago</p>
                <p className='text-center text-[15px]'>{item.duration}</p>
            </Link>
        ))
      }
    </>
  ) : null
}

export default DisplayAlbum
