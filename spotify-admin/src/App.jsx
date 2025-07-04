import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AddSong from './components/pages/AddSong';
import AddAlbum from './components/pages/AddAlbum';
import ListSong from './components/pages/ListSong';
import ListAlbum from './components/pages/ListAlbum';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

export const url = 'https://musicplayer-full-stack-2.onrender.com'

const App = () => {
  return (
    <div className='flex items-start min-h-screen '>
      <ToastContainer />
      <Sidebar />
      <div className="flex-1 h-screen overflow-y-scroll bg-[#f3fff7]">
        <Navbar />
        <div className="pt-8 pl-5 sm:pt-12 sm:pl-12 ">
          <Routes>
            <Route path='/add-song' element={<AddSong />} />
            <Route path='/add-album' element={<AddAlbum />} />
            <Route path='/list-song' element={<ListSong />} />
            <Route path='/list-album' element={<ListAlbum />} />
            
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
