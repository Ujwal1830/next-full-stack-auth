
import mongoose from "mongoose";

export async function connectToDB(){
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on('connected', ()=>{
            console.log('MongoDB connected successfully');
        });

        connection.on('error',(error)=>{
            console.log('MongoDB connection error, Please make sure MongoDB is running. Error::'+error);
            process.exit();
        })
    } catch (error) {
        console.log(error)
        console.log("Something went wrong");
    }
}