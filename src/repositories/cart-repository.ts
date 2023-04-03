import { database } from "@/config";
import { Cart, Product } from "@/models";
import { ObjectId, WithId } from "mongodb";

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

async function mongoRemoveFromCart(fingerprint: string, id: string) {
  const _id = new ObjectId(id);
  return await database.collection("cart").deleteOne({ fingerprint, _id });
}

const cartRepository = {
  mongoInsertFingerprint,
  mongoInsertIntoCart,
  mongoFindCartByFingerprint,
  mongoRemoveFromCart,
};

export { cartRepository };
