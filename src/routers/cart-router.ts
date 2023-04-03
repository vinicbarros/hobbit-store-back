import { addProductToCart, getFingerPrint } from "@/controllers";
import { authenticateFingerprint } from "@/middlewares";
import { Router } from "express";

const cartRouter = Router();

cartRouter
  .get("/fingerprint", getFingerPrint)
  .post("/", authenticateFingerprint, addProductToCart);

export { cartRouter };
