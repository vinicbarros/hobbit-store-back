import { CreateProductParams } from "@/schemas/protocols";
import { productService } from "@/services";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function createProduct(req: Request, res: Response) {
  const { name, image, details, category, price } = req.body as CreateProductParams;

  await productService.addProduct({ name, image, details, category, price });

  return res.sendStatus(httpStatus.CREATED);
}

export async function getProducts(req: Request, res: Response) {
  const result = await productService.getAllProducts();

  return res.status(httpStatus.OK).send(result);
}

export async function getProductsOfCategory(req: Request, res: Response) {
  const category = req.params.category as string;

  const result = await productService.getProductsByCategory(category);
  return res.status(httpStatus.OK).send(result);
}

export async function getProduct(req: Request, res: Response) {
  const productId = req.params.productId as string;

  const result = await productService.getSingleProduct(productId);
  return res.status(httpStatus.OK).send(result);
}
