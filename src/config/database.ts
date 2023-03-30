import { MongoClient } from "mongodb";
import { loadEnv } from "./env";

loadEnv();

const client = new MongoClient(process.env.MONGODB_URI);

export const connectDB = async (): Promise<void> => {
  try {
    await client.connect();
    console.log("Mongo conectado!");
  } catch (error) {
    console.log(error);
  }
};

export const database = client.db();
