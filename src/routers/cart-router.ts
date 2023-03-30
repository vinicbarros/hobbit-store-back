import { getFingerPrint } from "@/controllers";
import { Router } from "express";

const cartRouter = Router();

cartRouter.get("/fingerprint", getFingerPrint);

export { cartRouter };
