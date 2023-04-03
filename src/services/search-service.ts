import { productRepository } from "@/repositories";

async function searchProduct(name: string) {
  const result = await productRepository.mongoSearchProductInsensitive(name);

  return result;
}

const searchService = {
  searchProduct,
};

export { searchService };
