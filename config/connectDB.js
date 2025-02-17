import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

if(!process.env.MONGO_URL) {
    throw new Error("Add monogDB URL...")
}

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Mongoose connected`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
}

mongoose.connection.on("connected", () => {console.log("MongoDB connected")});
mongoose.connection.on("error", () => {console.error(`MongoDB Error: ${error.message}`)});
mongoose.connection.on("disconnected", () => {console.log("MongoDB disconneted...")})

export default connectDB;