import { database } from "@/config";
import { Cart, Product } from "@/models";
import { WithId } from "mongodb";

async function mongoInsertFingerprint(fingerprint: string) {
  return await database.collection("fingerprint").insertOne({ fingerprint });
}

async function mongoInsertIntoCart(
  fingerprint: string,
  product: WithId<Omit<Product, "_id">>
) {
  return await database.collection<Omit<Cart, "_id">>("cart").insertOne({
    fingerprint,
    productId: product._id.toHexString(),
    productName: product.name,
    productImg: product.image,
    productPrice: product.price,
  });
}

async function mongoFindCartByFingerprint(fingerprint: string): Promise<Cart[]> {
  return await database.collection<Cart>("cart").find({ fingerprint }).toArray();
}

const cartRepository = {
  mongoInsertFingerprint,
  mongoInsertIntoCart,
  mongoFindCartByFingerprint,
};

export { cartRepository };
