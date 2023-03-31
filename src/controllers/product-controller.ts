import { CreateProductParams } from "@/schemas/protocols";
import { productService } from "@/services";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function createProduct(req: Request, res: Response) {
  const { name, image, details, category, price } = req.body as CreateProductParams;

  await productService.addProduct({ name, image, details, category, price });

  return res.sendStatus(httpStatus.OK);
}
