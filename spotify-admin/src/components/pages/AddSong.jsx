import { assets } from "@/assets/admin-assets/assets";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { url } from "@/App";
import { toast } from "react-toastify";

const AddSong = () => {
  const [song, setSong] = useState(false);
  const [image, setImage] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [album, setAlbum] = useState("none");
  const [loading, setLoading] = useState(false);
  const [albumData, setAlbumData] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
        setLoading(true)
        const formData = new FormData()
        formData.append('name',name)
        formData.append('desc', desc)
        formData.append('image', image)
        formData.append('audio', song)
        formData.append('album', album)

        const res = await axios.post(`${url}/api/song/add`, formData)
        if(res.data.success){
            toast.success('Song Added')
            setName("")
            setAlbum("none")
            setDesc("")
            setSong(false)
            setImage(false)
        }
        else{
            toast.error('Something went wrong!')
        }
    } catch (error) {
        toast.error('Error occured!')
    }
    setLoading(false)
  };

  const fetchAlbumData = async() => {
    try {
      const res = await axios.get(`${url}/api/album/list`);
      if(res.data.success){
        setAlbumData(res.data.albums)
      }
      else{
        toast.error('Unable to load albums data!')
      }
    } catch (error) {
      toast.error('Error occured!')
    }
  }

  useEffect(()=>{
    fetchAlbumData()
  },[])

  return loading ? (
    <div className="grid place-items-center min-h-[80vh]  ">
        <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
    </div>
  ) : (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-start text-gray-600 gap-8"
    >
      <div className="flex gap-8">
        <div className="flex flex-col gap-4">
          <p>Upload Song</p>
          <input
            onChange={(e) => {
              setSong(e.target.files[0]);
            }}
            type="file"
            name=""
            id="song"
            accept="audio/*"
            hidden
          />
          <label htmlFor="song">
            <img
              src={song ? assets.upload_added : assets.upload_song}
              alt=""
              className="w-24 cursor-pointer "
            />
          </label>
        </div>
        <div className="flex flex-col gap-4">
          <p>Upload Image</p>
          <input
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            type="file"
            name=""
            id="image"
            hidden
            accept="image/*"
          />
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              className="w-24 cursor-pointer"
              alt=""
            />
          </label>
        </div>
      </div>
      <div className="flex flex-col gap-2.5 ">
        <p>Song Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="bg-transparent outline-green-800 border-2 rounded-2xl border-gray-400 p-2.5 w-[max(40vw,250px)] "
          placeholder="Type here..."
          required
        />
      </div>
      <div className="flex flex-col gap-2.5">
        <p>Song Description</p>
        <input
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
          type="text"
          className="bg-transparent outline-green-800 border-2 rounded-2xl border-gray-400 p-2.5 w-[max(40vw,250px)] "
          placeholder="Type here..."
          required
        />
      </div>
      <div className="flex flex-col gap-2.5">
        <p>Album </p>
        <select
          onChange={(e) => setAlbum(e.target.value)}
          defaultValue={album}
          className="bg-transparent rounded-2xl outline-green-800 border border-y-gray-400 p-2.5 w-[150px]"
        >
          <option value="none">None</option>
          {
            albumData.map((item, idx)=>(
              <option key={idx} value={item.name}>{item.name}</option>
            ))
          }
        </select>
      </div>
      <Button
        type="submit"
        className="text-base bg-black  text-white py-2.5 px-12 cursor-pointer rounded-2xl"
      >
        ADD
      </Button>
    </form>
  );
};

export default AddSong;
