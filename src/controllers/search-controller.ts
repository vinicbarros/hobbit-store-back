import { searchService } from "@/services";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function search(req: Request, res: Response) {
  const { product } = req.params;

  const result = await searchService.searchProduct(product);
  return res.status(httpStatus.OK).send(result);
}
