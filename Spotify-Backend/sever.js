import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import songRouter from './src/routes/songRoute.js'
import connectDb from './src/config/mongodb.js'
import connectCloudinary from './src/config/cloudinary.js'
import albumRouter from './src/routes/albumRoute.js'

//app config
const app = express()
const port = process.env.PORT || 10000
connectDb();
connectCloudinary();

//middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors()) // Used to connect both backend and frontend

//Initialzing routes
app.use('/api/song', songRouter)
app.use('/api/album', albumRouter)

app.get('/', (req,res)=>{
    res.status(200).json({success:true, msg:"API Working"})
})

app.listen(port, ()=>{
    console.log(`Server is listening  on http://localhost:${port}`)
})