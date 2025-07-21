import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.DATABASE_URL}`, {
            dbName: "Gallery",
        });
        console.log(`MongoDB Connected`);
    } catch (error) {
        console.log(`Error in connecting to MongoDB: ${error}`);
        process.exit(1); // Exit process with failure
    }
}

export default connectDB;