import { cartRepository, productRepository } from "@/repositories";
import { cartService } from "@/services";
import { jest } from "@jest/globals";
import { ObjectId } from "mongodb";
import generateValidProduct from "../factories/generateValidProduct";
import { generateValidFingerprint } from "../helpers";

describe("addToCart test suite", () => {
  it("should not add to cart if the product doesn't exist", async () => {
    jest.spyOn(productRepository, "mongoFindProductById").mockResolvedValueOnce(null);

    const fingerprint = await generateValidFingerprint();

    const promise = cartService.addToCart("oi", fingerprint);

    expect(promise).rejects.toEqual({
      name: "NotFoundError",
      message: "No result for this search!",
    });
  });

  it("should add to cart if the product exist", async () => {
    const product = generateValidProduct();
    jest.spyOn(productRepository, "mongoFindProductById").mockResolvedValueOnce(product);

    const fingerprint = await generateValidFingerprint();

    const promise = cartService.addToCart(String(product._id), fingerprint);

    expect(promise).resolves.toBeUndefined();
  });
});

describe("removeToCart test suite", () => {
  it("should not remove product from cart if the itemId fingerprint isn't equal to user fingerprint", async () => {
    jest.spyOn(cartRepository, "mongoFindIdFromCart").mockResolvedValueOnce({
      _id: new ObjectId(1),
      productId: "1",
      productName: "Anel",
      productImg: "https://image.com/image.png",
      productPrice: 1000,
      fingerprint: "WILLFAIL",
    });

    const fingerprint = await generateValidFingerprint();

    const promise = cartService.removeToCart("1", fingerprint);

    expect(promise).rejects.toEqual({
      name: "UnauthorizedError",
      message: "You must have a fingerprint to edit cart!",
    });
  });

  it("should remove product from cart if everything is right", async () => {
    const fingerprint = await generateValidFingerprint();
    jest.spyOn(cartRepository, "mongoFindIdFromCart").mockResolvedValueOnce({
      _id: new ObjectId(1),
      productId: "1",
      productName: "Anel",
      productImg: "https://image.com/image.png",
      productPrice: 1000,
      fingerprint: fingerprint,
    });

    jest
      .spyOn(cartRepository, "mongoRemoveFromCart")
      .mockResolvedValueOnce({ deletedCount: 1, acknowledged: true });

    const promise = cartService.removeToCart("1", fingerprint);

    expect(promise).resolves.toBeUndefined();
  });
});
