import { assets } from "@/assets/admin-assets/assets";
import React, { useState } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { url } from "@/App";
import { toast } from "react-toastify";

const AddAlbum = () => {
  const [image, setImage] = useState(false);
  const [name, setName] = useState("");
  const [color, setColor] = useState("#FFFFFF");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async(e) => {
    e.preventDefault();
    setLoading(true)
    try {
        const formData = new FormData();
        formData.append('name', name)
        formData.append('desc',desc)
        formData.append('image', image)
        formData.append('bgColor', color)

        const res = await axios.post(`${url}/api/album/add`, formData)
        if(res.data.success){
            toast.success('Album Added!')
            setName('')
            setDesc('')
            setImage(false)
            setColor("#FFFFFF")
        }
        else{
            toast.error('Something went wrong!')
        }
    } catch (error) {
        toast.error('Error occured!')
    }
    setLoading(false)
  };

  return loading ? (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-36 h-36 border-[5px] border-t-transparent border-blue-500 rounded-full animate-spin grid place-items-center">
        <div className="w-24 h-24 border-[5px] border-b-transparent border-black rounded-full animate-spin-reverse-fast"></div>
      </div>
    </div>
  ) : (
    <form
      onSubmit={submitHandler}
      className="flex flex-col items-start text-gray-600 gap-8"
    >
      <div className="flex flex-col gap-4">
        <p>Upload Image</p>
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          name=""
          id="image"
          accept="image/*"
          hidden
        />
        <label htmlFor="image">
          <img
            src={image ? URL.createObjectURL(image) : assets.upload_area}
            className="w-24 cursor-pointer"
            alt=""
          />
        </label>
      </div>
      <div className="flex flex-col gap-2.5">
        <p>Album Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          placeholder="Type here..."
          className="bg-transparent outline-green-800 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)] rounded-2xl "
          required
        />
      </div>
      <div className="flex flex-col gap-2.5">
        <p>Album Description</p>
        <input
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
          type="text"
          placeholder="Type here..."
          className="bg-transparent outline-green-800 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)] rounded-2xl "
          required
        />
      </div>
      <div className="flex flex-col gap-3">
        <p>Background Color</p>
        <input
          onChange={(e) => setColor(e.target.value)}
          value={color}
          type="color"
        />
      </div>
      <Button
        variant="outline"
        type="submit"
        className="text-base bg-black text-white py-2.5 px-14 cursor-pointer rounded-2xl drop-shadow-[1px_1px_gray]"
      >
        ADD
      </Button>
    </form>
  );
};

export default AddAlbum;
