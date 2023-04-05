import { productRepository } from "@/repositories";
import { productService } from "@/services";
import { jest } from "@jest/globals";
import generateValidProduct from "../factories/generateValidProduct";

describe("addProduct test suite", () => {
  it("should return bad request error if the product name is already in use", async () => {
    const product = generateValidProduct();
    jest
      .spyOn(productRepository, "mongoFindProductByName")
      .mockResolvedValueOnce(product);

    const promise = productService.addProduct(product);

    expect(promise).rejects.toEqual({
      name: "BadRequestError",
      message: "Bad request!",
    });
  });

  it("should add product if the name isn't in use", async () => {
    const product = generateValidProduct();
    jest.spyOn(productRepository, "mongoFindProductByName").mockResolvedValueOnce(null);

    const promise = productService.addProduct(product);

    expect(promise).resolves.toBeUndefined();
  });
});

describe("getSingleProduct test suite", () => {
  it("should return not found error if the productId doesn't exist", async () => {
    jest.spyOn(productRepository, "mongoFindProductById").mockResolvedValueOnce(null);

    const promise = productService.getSingleProduct("12");

    expect(promise).rejects.toEqual({
      name: "NotFoundError",
      message: "No result for this search!",
    });
  });

  it("should return the product if id is valid", async () => {
    const product = generateValidProduct();
    jest.spyOn(productRepository, "mongoFindProductById").mockResolvedValueOnce(product);

    const result = await productService.getSingleProduct(String(product._id));

    expect(result._id).toBe(product._id);
    expect(result.name).toBe(product.name);
    expect(result.details).toBe(product.details);
    expect(result.image).toBe(product.image);
    expect(result.category).toBe(product.category);
    expect(result.price).toBe(product.price);
  });
});
