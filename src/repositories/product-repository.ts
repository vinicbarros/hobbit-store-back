import { database } from "@/config";
import { Product } from "@/models";
import { CreateProductParams } from "@/schemas/protocols";

async function mongoInsertProduct(data: CreateProductParams) {
  return await database.collection("products").insertOne(data);
}

async function mongoFindProductByName(name: string) {
  return await database.collection("products").findOne({ name });
}

async function mongoFindProducts(): Promise<Product[]> {
  return await database.collection<Product>("products").find().toArray();
}

const productRepository = {
  mongoInsertProduct,
  mongoFindProductByName,
  mongoFindProducts,
};

export { productRepository };
