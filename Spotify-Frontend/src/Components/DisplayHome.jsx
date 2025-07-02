import React, { useContext } from 'react'
import Navbar from './Navbar'
import AlbumItem from './AlbumItem'
import SongItem from './SongItem'
import { Link } from 'react-router-dom'
import { PlayerContext } from '@/context/PlayerContext'

const DisplayHome = () => {
    const {songsData, albumsData} = useContext(PlayerContext)
  return (
    <>
        <Navbar />
        <div className="mb-4">
            <h1 className='my-5 font-bold text-2xl '>Featured Charts</h1>
            <div className="flex overflow-auto ">
                {albumsData.map((item, index) => (
                    <AlbumItem key={index} image={item.image} name={item.name} desc={item.desc} id={item._id}/>
                ))}
            </div>
        </div>
        <div className="mb-8">
            <h1 className='my-5 font-bold text-2xl '>Today's Biggest Hits</h1>
            <div className="flex overflow-auto ">
                {
                    songsData.map((item, index)=>(
                       
                        <Link  key={index} to={`/music/${item._id}`}>
                            { console.log(item)}
                            <SongItem key={index} name={item.name} image={item.image} desc={item.desc} id={item._id}/>
                        </Link>
                    ))
                }
            </div>
        </div>
    </>
  )
}

export default DisplayHome
