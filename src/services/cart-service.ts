import { notFoundError } from "@/errors";
import { cartRepository, productRepository } from "@/repositories";
import { v4 as uuidv4 } from "uuid";

async function handleFingerprint() {
  const uuid = uuidv4();

  await cartRepository.mongoInsertFingerprint(uuid);
  return {
    fingerprint: uuid,
  };
}

async function addToCart(productId: string, fingerprint: string) {
  const product = await productRepository.mongoFindProductById(productId);
  if (!product) throw notFoundError();

  await cartRepository.mongoInsertIntoCart(fingerprint, product);
}

const cartService = {
  handleFingerprint,
  addToCart,
};

export { cartService };
