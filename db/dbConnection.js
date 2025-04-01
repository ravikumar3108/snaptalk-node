import mongoose from "mongoose";

export const connectToMongodb = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL,{
            family : 4 ,
        })
        console.log("connection to mongodb succesfull")
    }catch(err){
        console.log(`Error in connecting to Mongodb ${err.message}`)
    }
}

