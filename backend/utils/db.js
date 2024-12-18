import mongoose from "mongoose";

const connectDb = async ()=> {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("DB connected");
        
    } catch (error) {
        console.log("connection failed");
        
    }
}

export default connectDb