import { badRequestError } from "@/errors";
import { productRepository } from "@/repositories";
import { CreateProductParams } from "@/schemas/protocols";

async function addProduct(data: CreateProductParams) {
  const product = await productRepository.mongoFindProductByName(data.name);
  if (product) throw badRequestError();

  return await productRepository.mongoInsertProduct(data);
}

const productService = {
  addProduct,
};

export { productService };
