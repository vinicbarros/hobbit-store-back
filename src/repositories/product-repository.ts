import { database } from "@/config";
import { Product } from "@/models";
import { CreateProductParams } from "@/schemas/protocols";
import { ObjectId } from "mongodb";

async function mongoInsertProduct(data: CreateProductParams) {
  return await database.collection("products").insertOne(data);
}

async function mongoFindProductByName(name: string) {
  return await database.collection("products").findOne({ name });
}

async function mongoFindProducts(): Promise<Product[]> {
  return await database.collection<Product>("products").find().toArray();
}

async function mongoFindProductsOfCategory(category: string): Promise<Product[]> {
  return await database.collection<Product>("products").find({ category }).toArray();
}

async function mongoFindProductById(productId: string) {
  const _id = new ObjectId(productId);
  return await database.collection<Omit<Product, "_id">>("products").findOne({ _id });
}

async function mongoSearchProductInsensitive(name: string): Promise<Product[]> {
  await database.collection("products").createIndex({ name: "text" });

  return await database
    .collection<Product>("products")
    .find({ $text: { $search: `${name}` } })
    .toArray();
}

const productRepository = {
  mongoInsertProduct,
  mongoFindProductByName,
  mongoFindProducts,
  mongoFindProductsOfCategory,
  mongoFindProductById,
  mongoSearchProductInsensitive,
};

export { productRepository };
