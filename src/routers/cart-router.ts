import { addProductToCart, getCart, getFingerPrint } from "@/controllers";
import { authenticateFingerprint } from "@/middlewares";
import { Router } from "express";

const cartRouter = Router();

cartRouter
  .get("/fingerprint", getFingerPrint)
  .use(authenticateFingerprint)
  .post("/", addProductToCart)
  .get("/", getCart);

export { cartRouter };
