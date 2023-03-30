import { cartRepository } from "@/repositories";
import { v4 as uuidv4 } from "uuid";

async function handleFingerprint() {
  const uuid = uuidv4();

  await cartRepository.mongoInsertFingerprint(uuid);
  return {
    fingerprint: uuid,
  };
}

const cartService = {
  handleFingerprint,
};

export { cartService };
