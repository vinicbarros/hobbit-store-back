import { AuthenticatedRequest } from "@/middlewares";
import { cartService } from "@/services";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function getFingerPrint(req: Request, res: Response) {
  const result = await cartService.handleFingerprint();

  return res.status(httpStatus.CREATED).send(result);
}

export async function addProductToCart(req: AuthenticatedRequest, res: Response) {
  const { productId } = req.body;
  const { fingerprint } = req;

  await cartService.addToCart(productId, fingerprint);

  return res.sendStatus(httpStatus.OK);
}
