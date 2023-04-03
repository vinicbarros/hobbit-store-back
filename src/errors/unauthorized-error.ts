import { ApplicationError } from "./protocols";

export function unauthorizedError(): ApplicationError {
  return {
    name: "UnauthorizedError",
    message: "You must have a fingerprint to edit cart!",
  };
}
