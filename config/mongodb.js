import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const {MONGO_URL} = process.env

const conectarDB = async () =>{
    try {
        await mongoose.connect(MONGO_URL,{
            useNewUrlParser : true,
            useUnifiedTopology : true,
        })
        console.log('DB esta conectado')
    } catch (error) {
        console.log(error)
    }
}

conectarDB()