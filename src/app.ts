import "express-async-errors";
import express, { Express, json } from "express";
import cors from "cors";
import { connectDB, loadEnv } from "@/config";
import { cartRouter, productRouter, searchRouter } from "@/routers";
import { handleApplicationErrors } from "@/middlewares";

loadEnv();

const app = express();

app.use(cors());
app.use(json());
app.use("/cart", cartRouter);
app.use("/products", productRouter);
app.use("/search", searchRouter);
app.use(handleApplicationErrors);

export async function init(): Promise<Express> {
  await connectDB();
  return Promise.resolve(app);
}

export default app;
