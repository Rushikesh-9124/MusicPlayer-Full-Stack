import { url } from '@/App'
import axios from 'axios'
import { Delete, DeleteIcon, Trash } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Button } from '../ui/button'

const ListSong = () => {
  const [data, setData] = useState([])

  const fetchSongs = async() => {
    try {
      const res = await axios.get(`${url}/api/song/list`)
      if(res.data.success){
        setData(res.data.songs)
      }
    } catch (error) {
      toast.error('Error Occured!')
    }
  }

  const removeSong = async(id) => {
    try {
      const res = await axios.post(`${url}/api/song/remove`, {id})
      if(res.data.success){
        toast.success('Song removed!')
        await fetchSongs()
      }
    } catch (error) {
      toast.error('Error occured!')
    }
  }

  useEffect(()=>{
    fetchSongs()
  }, [])
  return (
    <div>
      <p>All Songs List</p>
      <br />
      <div className="">
        <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-600 text-sm mr-5 bg-gray-400">
          <b>Image</b>
          <b>Name</b>
          <b>Album</b>
          <b>Duration</b>
          <b>Action</b>
        </div>
        {
          data.map((item, idx)=>(
            <div key={idx} className='grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr]  items-center gap-2.5 p-3 border border-gray-600 text-sm mr-5'>
              <img src={item.image} className='w-10' alt="" />
              <b>{item.name}</b>
              <b>{item.album}</b>
              <b>{item.duration}</b>
              <Button className='flex gap-2 cursor-pointer hover:bg-gray-400 min-w-3' onClick={()=>removeSong(item._id)}><Trash className='text-red-600' /> <p className='hidden sm:block'>Delete</p></Button>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default ListSong
