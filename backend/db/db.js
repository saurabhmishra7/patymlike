import mongoose from "mongoose";
import { configEnv } from "../config/config-dev.js";

export async function getMongoose() {
  try {
    const dbInstance = await mongoose.connect(configEnv.mongoUri);
    console.log("MongoDb Connected");
    return dbInstance;
  } catch (error) {
      throw new Error("Error in mongo connection");
  }
  
} 