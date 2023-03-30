import { cartService } from "@/services";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function getFingerPrint(req: Request, res: Response) {
  const result = await cartService.handleFingerprint();

  return res.status(httpStatus.CREATED).send(result);
}
