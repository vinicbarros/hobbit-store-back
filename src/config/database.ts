import { MongoClient } from "mongodb";
import { loadEnv } from "./env";

loadEnv();

export const connectDB = async (): Promise<void> => {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    console.log("Mongo conectado!");
  } catch (error) {
    console.log(error);
  }
};
