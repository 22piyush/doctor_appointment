import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB connection failed ❌");
    console.error(error.message);

    process.exit(1); // stop the app if DB fails
  }
};

export default connectDB;
