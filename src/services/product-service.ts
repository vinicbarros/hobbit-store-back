import { badRequestError, notFoundError } from "@/errors";
import { productRepository } from "@/repositories";
import { CreateProductParams } from "@/schemas/protocols";

async function addProduct(data: CreateProductParams) {
  const product = await productRepository.mongoFindProductByName(data.name);
  if (product) throw badRequestError();

  return await productRepository.mongoInsertProduct(data);
}

async function getAllProducts() {
  const products = await productRepository.mongoFindProducts();

  return products;
}

async function getProductsByCategory(category: string) {
  const products = await productRepository.mongoFindProductsOfCategory(category);

  return products;
}

async function getSingleProduct(productId: string) {
  const product = await productRepository.mongoFindProductById(productId);
  if (!product) throw notFoundError();

  return product;
}

const productService = {
  addProduct,
  getAllProducts,
  getProductsByCategory,
  getSingleProduct,
};

export { productService };
