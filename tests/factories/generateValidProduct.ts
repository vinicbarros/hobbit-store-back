import { Product } from "@/models";
import { faker } from "@faker-js/faker";
import { ObjectId, WithId } from "mongodb";

export default function generateValidProduct(): WithId<Omit<Product, "_id">> {
  return {
    _id: new ObjectId(faker.datatype.number()),
    name: faker.random.word(),
    details: faker.lorem.lines(),
    image: faker.image.abstract(),
    category: faker.random.word(),
    price: faker.datatype.number(),
  };
}
