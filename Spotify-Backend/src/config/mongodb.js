import mongoose from "mongoose";

const connectDb = async() => {
    mongoose.connection.on('connected', ()=>{
        console.log('Connection Established')
    })
    mongoose.connection.on('error', ()=>{
        console.log('Error')
    })
    
    await mongoose.connect(`${process.env.MONGODB_URI}`)
}

export default connectDb