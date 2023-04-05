import { notFoundError, unauthorizedError } from "@/errors";
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

async function getCartByFingerprint(fingerprint: string) {
  const cart = await cartRepository.mongoFindCartByFingerprint(fingerprint);

  return cart;
}

async function removeToCart(id: string, fingerprint: string) {
  const cartId = await cartRepository.mongoFindIdFromCart(id);
  if (cartId.fingerprint !== fingerprint) throw unauthorizedError();

  await cartRepository.mongoRemoveFromCart(fingerprint, id);
}

const cartService = {
  handleFingerprint,
  addToCart,
  getCartByFingerprint,
  removeToCart,
};

export { cartService };
