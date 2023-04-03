import {
  addProductToCart,
  getCart,
  getFingerPrint,
  removeProductToCart,
} from "@/controllers";
import { authenticateFingerprint } from "@/middlewares";
import { Router } from "express";

const cartRouter = Router();

cartRouter
  .get("/fingerprint", getFingerPrint)
  .use(authenticateFingerprint)
  .post("/", addProductToCart)
  .get("/", getCart)
  .delete("/:itemId", removeProductToCart);

export { cartRouter };
