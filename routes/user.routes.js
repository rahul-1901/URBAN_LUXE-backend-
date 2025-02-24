import {Router} from 'express';
import { userSignUp, userLogin, purchaseClothes, purchasedItems, deleteClothes } from '../controllers/user.controllers.js';
import { userLoginValidation, userSignUpValidation} from '../middlewares/userInputValidation.middleware.js'
import { userAuthentication } from '../middlewares/user.middleware.js';

const userRoute = Router();
userRoute.post("/signUp", userSignUpValidation, userSignUp);
userRoute.post("/login", userLoginValidation, userLogin);
userRoute.post("/clothes/:id", userAuthentication, purchaseClothes);
userRoute.get("/purchasedItems", userAuthentication, purchasedItems);
userRoute.delete("/deleteClothes/:id", userAuthentication, deleteClothes);

export default userRoute;