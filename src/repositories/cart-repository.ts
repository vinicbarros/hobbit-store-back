import { database } from "@/config";

async function mongoInsertFingerprint(fingerprint: string) {
  return await database.collection("fingerprint").insertOne({ fingerprint });
}

const cartRepository = {
  mongoInsertFingerprint,
};

export { cartRepository };
