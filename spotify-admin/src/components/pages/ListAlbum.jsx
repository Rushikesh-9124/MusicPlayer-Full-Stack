import { url } from '@/App'
import axios from 'axios'
import { Trash } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Button } from '../ui/button'

const ListAlbum = () => {
    const [data, setData] = useState([])

    const fetchAlbum = async() => {
        try {
            const res = await axios.get(`${url}/api/album/list`)
            if(res.data.success){
                setData(res.data.albums)
            }
        } catch (error) {
            toast.error('Error occured!')
        }
    }

    useEffect(()=>{
        fetchAlbum()
    },[])

    const removeAlbum = async(id) => {
        try {
            const res = await axios.post(`${url}/api/album/remove`, {id})
            if(res.data.success){
                toast.success('Album Removed!')
                await fetchAlbum();
            }
        } catch (error) {
            toast.error('Error Occured!')
        }
    }

  return (
    <div>
      <p>All Albums List</p>
      <br />
      <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100">
        <b>Image</b>
        <b>Name</b>
        <b>Description</b>
        <b>Album Color</b>
        <b>Action</b>
      </div>
      {
        data.map((item, idx)=>(
            <div key={idx} className='grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5'>
                <img src={item.image} className='w-12' alt="" />
                <p>{item.name}</p>
                <p>{item.desc}</p>
                <input type="color" value={item.bgColor} />
                <Button onClick={()=>removeAlbum(item._id)} className='flex gap-2 cursor-pointer hover:bg-gray-400'><Trash className='text-red-600' /> <p className='hidden sm:block'>Delete</p></Button>
            </div>
        ))
      }
    </div>
  )
}

export default ListAlbum
