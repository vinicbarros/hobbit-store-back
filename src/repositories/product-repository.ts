import { database } from "@/config";
import { CreateProductParams } from "@/schemas/protocols";

async function mongoInsertProduct(data: CreateProductParams) {
  return await database.collection("products").insertOne(data);
}

async function mongoFindProductByName(name: string) {
  return await database.collection("products").findOne({ name });
}

const productRepository = {
  mongoInsertProduct,
  mongoFindProductByName,
};

export { productRepository };
