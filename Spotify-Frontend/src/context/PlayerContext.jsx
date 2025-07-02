import axios from 'axios';
import  { createContext, useEffect, useRef, useState } from 'react'

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {

    const audioRef = useRef()
    const seekBg = useRef()
    const seekBar = useRef()

    const url = 'https://musicplayer-full-stack-2.onrender.com'
    const [songsData, setSongsData] = useState([])
    const [albumsData, setAlbumsData] = useState([])


    const [track, setTrack] = useState(songsData[2])
    const [playStatus, setPlayStatus] = useState(false)
    const [repeat, setRepeat] = useState(false)
    const [time, setTime] = useState({
        currentTime : {
            second : 0,
            minute : 0
        },
        totalTime : {
            second : 0,
            minute : 0
        }
    })


    const play = () => {
        audioRef.current.play()
        setPlayStatus(true)
    }
    const pause = () => {
        audioRef.current.pause()
        setPlayStatus(false)
    }

    const playWithId = async(id) => {
        await songsData.map((item, idx)=>{
            if(id == item._id){
                setTrack(item)
            }
        })
        await audioRef.current.play()
        setPlayStatus(true)
    }

    const prev = async() => {
        songsData.map(async (item, idx)=>{
            if(track._id == item._id && idx>0){
                await setTrack(songsData[idx-1])
                await audioRef.current.play()
                setPlayStatus(true)
            }
        })
    }
    const next = async() => {
        songsData.map(async (item, idx)=>{
            if(track._id == item._id && idx<songsData.length){
                await setTrack(songsData[idx+1])
                await audioRef.current.play()
                setPlayStatus(true)
            }
        })
    }

    useEffect(() => {
        if (audioRef.current) {
          audioRef.current.loop = repeat;
        }
      }, [repeat]);

    const seekSong = async(e) => {
        audioRef.current.currentTime = ((e.nativeEvent.offsetX/seekBg.current.offsetWidth) * audioRef.current.duration)
    }

    const getSongsData = async() => {
        try {
            const res = await axios.get(`${url}/api/song/list`)
            if(res.data.success){
                setSongsData(res.data.songs)
                setTrack(res.data.songs[0])
            }
        } catch (error) {
            
        }
    }

    const getAlbumsData = async() => {
        try {
            const res = await axios.get(`${url}/api/album/list`)
            console.log(res.data)
            setAlbumsData(res.data.albums)
        } catch (error) {
            
        }
    }

    useEffect(() => {
        if (!audioRef.current) return;
      
        const audio = audioRef.current;
      
        audio.ontimeupdate = () => {
          if (!seekBar.current) return;
      
          seekBar.current.style.width = `${Math.floor((audio.currentTime / audio.duration) * 100)}%`;
          setTime({
            currentTime: {
              second: Math.floor(audio.currentTime % 60),
              minute: Math.floor(audio.currentTime / 60),
            },
            totalTime: {
              second: Math.floor(audio.duration % 60),
              minute: Math.floor(audio.duration / 60),
            },
          });
        };
      
        // Clean up on unmount
        return () => {
          audio.ontimeupdate = null;
        };
      }, [audioRef.current, seekBar.current]); // 👈 safer to use ref.current values
      

    useEffect(()=>{
        getSongsData()
        getAlbumsData()
    },[])

    const contextValue = {
        audioRef,
        seekBg,
        seekBar,
        track, setTrack,
        playStatus, setPlayStatus,
        time, setTime,
        play, pause,
        playWithId,
        prev, next,
        repeat,
        setRepeat,
        seekSong,
        songsData, albumsData
    }

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}

        </PlayerContext.Provider>
    )
}

export default PlayerContextProvider
