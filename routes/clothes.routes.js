import { Router } from "express";
import { clothesApi, bestSeller, clotheById } from "../controllers/clothes.controllers.js";
import { userAuthentication } from "../middlewares/user.middleware.js";

const route = Router();

route.get("/", clothesApi);
route.get("/bestSellers", bestSeller);
route.get("/item/:id", clotheById);

export default route;