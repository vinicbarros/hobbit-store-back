import { v4 as uuidv4 } from "uuid";
import { database } from "../src/config/database";

export async function generateValidFingerprint() {
  const fingerprint = uuidv4();

  await database.collection("fingerprint").insertOne({ fingerprint });

  return fingerprint;
}
