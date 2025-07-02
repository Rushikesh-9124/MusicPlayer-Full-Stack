import React, { useContext, useEffect, useRef, useState } from 'react'
import { songsData} from '../assets/frontend-assets/assets'
import { FileStack, Maximize2, Mic2, Pause, Play, PlaySquare, Repeat, Shuffle, SkipBack, SkipForward, Speaker, TvMinimalPlayIcon, Volume2 } from 'lucide-react'
import { Volume1, VolumeX } from 'lucide-react';
import { Button } from './ui/button';
import { PlayerContext } from '@/context/PlayerContext';

const Player = () => {


    const {seekBar, seekBg, playStatus, play, pause, track, time, next, prev, repeat, setRepeat, seekSong, audioRef} = useContext(PlayerContext)
    const [volume, setVolume] = useState(50)
    useEffect(()=>{
        if(audioRef.current){
            audioRef.current.volume = volume/100
        }
    }, [volume])
    
    const getVolumeIcon = () => {
        if (volume === 0) return <VolumeX className="text-white" />;
        if (volume > 0 && volume < 50) return <Volume1 onClick={()=>setVolume(0)} className="text-white" />;
        return <Volume2 onClick={()=>setVolume(0)} className="text-white" />;
    };
  return track ? (
    <div className='h-[10%] bg-black flex justify-between items-center text-white px-4 '>
      <div className="hidden lg:flex items-center gap-4">
        <img src={track.image} alt="" className='w-12 rounded-full' />
        <div className="">
            <p className='font-semibold'>{track.name}</p>
            <p className='truncate w-40 overflow-ellipsis'>{track.desc}</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-1 m-auto">
            <div className="flex gap-4 ">
                <Shuffle className='cursor-pointer' />
                <SkipBack onClick={prev} className='cursor-pointer'/>
                {
                    playStatus ?  <Pause  onClick={pause}/> : <Play onClick={play}/>
                }
                <SkipForward onClick={next} className='cursor-pointer' />
                <Repeat onClick={()=>{setRepeat(prev=>!prev);}} className={`${repeat ? 'text-red-500 cursor-pointer' : 'cursor-pointer'}`}  />
            </div>
            <div className="flex items-center gap-4">
                <p>{time.currentTime.minute}:{time.currentTime.second < 10 ? `0${time.currentTime.second}` : time.currentTime.second}</p>
                <div ref={seekBg} onClick={seekSong} className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer">
                    <hr ref={seekBar} className='h-1  border-none w-0 bg-green-800 rounded-full' />
                </div>
                <p>{time.totalTime.minute}:{time.totalTime.second < 10 ? `0${time.totalTime.second}` : time.totalTime.second}</p>
            </div>
        </div>
        <div className="hidden lg:flex items-center gap-2 opacity-75 pt-5">
            <PlaySquare/>
            <Mic2 />
            <FileStack />
            <Speaker />
            {getVolumeIcon()}
            <audio ref={audioRef} src={songsData[0].src} autoPlay />
            <div className='relative w-20 h-1 bg-slate-200 rounded overflow-hidden group'>
                <div 
                    className="h-full top-0 left-0 absolute bg-green-600 rounded transition-all duration-200" 
                    style={{width : `${volume}%`}}>
                </div>
                <input 
                    type="range" 
                    min={0} 
                    max={100} 
                    onChange={e => setVolume(Number(e.target.value))}
                    className='absolute opacity-0 top-0 left-0 w-full h-full cursor-pointer'
                    aria-label="Volume Slider"
                />
            </div>
            <TvMinimalPlayIcon/>
            <Maximize2 />
        </div>
    </div>
  ) : null
}

export default Player
