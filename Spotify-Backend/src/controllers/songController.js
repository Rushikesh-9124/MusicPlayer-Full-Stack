import { v2 as cloudinary } from 'cloudinary';
import songModel from '../models/songModel.js';

const addSong = async (req, res) => {
    try {
      console.log("Upload started");
  
      const { name, desc, album } = req.body;
  
      if (!req.files?.audio || !req.files?.image) {
        return res.status(400).json({ success: false, message: "Files missing" });
      }
  
      const audioFile = req.files.audio[0];
      const imageFile = req.files.image[0];
  
      console.log("Uploading audio...");
      const audioUpload = await cloudinary.uploader.upload(audioFile.path, {
        resource_type: "video",
      });
      console.log("Audio uploaded");
  
      console.log("Uploading image...");
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      console.log("Image uploaded");
  
      const duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(audioUpload.duration % 60)}`;
  
      const songData = {
        name,
        desc,
        album,
        image: imageUpload.secure_url,
        file: audioUpload.secure_url,
        duration,
      };
  
      const song = new songModel(songData);
      await song.save();
      console.log("Song saved to DB");
  
      return res.status(200).json({
        success: true,
        data: song,
      });
    } catch (error) {
      console.error("Upload failed:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  };
  
  

const listSong = async (req, res) => {
    try {
        const allSongs = await songModel.find({})
        res.json({success:true, songs: allSongs})
    } catch (error) {
        res.status(404).json({success:false, message:error})
    }
};

const removeSong = async(req,res) => {
    try {
        await songModel.findByIdAndDelete(req.body.id)
        res.status(200).json({success:true, message:"Successfully removed the song"})
    } catch (error) {
        res.status(500).json({success:false})
    }
}

export { addSong, listSong, removeSong };
