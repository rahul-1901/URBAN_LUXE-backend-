import { Router } from "express";
import { userAuthentication } from "../middlewares/user.middleware.js";
import { deliveryDetails, deliveryInfo } from "../controllers/delivery.controllers.js";

const deliveryRoute = Router();
deliveryRoute.post("/delivery", userAuthentication, deliveryInfo);
deliveryRoute.get("/getOrderDetails", userAuthentication, deliveryDetails);

export default deliveryRoute;