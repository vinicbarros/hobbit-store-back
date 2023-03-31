import Joi from "joi";
import { CreateProductParams } from "./protocols";

export const productSchema = Joi.object<CreateProductParams>({
  name: Joi.string().required(),
  image: Joi.string().uri().required(),
  details: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.string().required(),
});
