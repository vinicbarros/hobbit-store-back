import "express-async-errors";
import express, { Express, json } from "express";
import cors from "cors";
import { connectDB, loadEnv } from "@/config";
import { cartRouter } from "./routers";

loadEnv();

const app = express();

app.use(cors());
app.use(json());
app.use("/cart", cartRouter);

export async function init(): Promise<Express> {
  await connectDB();
  return Promise.resolve(app);
}

export default app;
