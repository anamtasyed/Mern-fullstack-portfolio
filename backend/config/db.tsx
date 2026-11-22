import mongoose from "mongoose";
const connectDB = async(): Promise<void> => {
    try {
        const mongoURI = process.env.MONGO_URI;
        if (!mongoURI) {
          throw new Error("MONGO_URI is not found in backend/.env");
    }
    
        await mongoose.connect(mongoURI);
        console.log("MongoDB connected successfully!");
        console.log(`Database: ${mongoose.connection.name}`);
    } catch (error) {
        console.error("MongoDB connection failed: ", error);
        throw error;
    }
};
export default connectDB;