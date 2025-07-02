import React, { useContext, useEffect, useRef } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import DisplayHome from './DisplayHome'
import DisplayAlbum from './DisplayAlbum'
import MusicItem from './MusicItem'
import NotFound from './NotFound'
import { PlayerContext } from '@/context/PlayerContext'

const Display = () => {

  const {albumsData} = useContext(PlayerContext)

  const displayRef = useRef(null);
  const location = useLocation()
  const isAlbum = location.pathname.includes('album')
  const albumId = isAlbum ? location.pathname.split('/').pop() : ""
  const bgColor =  isAlbum && albumsData.length >0 ? albumsData.find((x)=>(x._id == albumId)).bgColor  : '#121212'
  useEffect(()=>{
    if(isAlbum){
      displayRef.current.style.background = `linear-gradient(${bgColor}, #121212)`
    }
    else{
      displayRef.current.style.background = '#121212'
    }
  }, [location.pathname.includes('album')])
  return (
    <div ref={displayRef} className='w-[100%] m-2 px-6 pt-4 rounded-lg bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0'>
      <Routes>
        <Route  path='/' element={<DisplayHome />}/>
        <Route path='/album/:id' element={<DisplayAlbum album={albumsData.find((x)=>(x._id == albumId))}/>}/>
        <Route path='/music/:id' element={<MusicItem />}/>
        <Route path='/podcast' element={<NotFound />}/>
        <Route path='*'  element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default Display
