import { search } from "@/controllers";
import { Router } from "express";

const searchRouter = Router();

searchRouter.get("/:product", search);

export { searchRouter };
