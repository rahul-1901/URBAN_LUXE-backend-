import {Router} from 'express';
import { userSignUp, userLogin, purchaseClothes } from '../controllers/user.controllers.js';
import { userLoginValidation, userSignUpValidation} from '../middlewares/userInputValidation.middleware.js'
import { userAuthentication } from '../middlewares/user.middleware.js';

const userRoute = Router();
userRoute.post("/signUp", userSignUpValidation, userSignUp);
userRoute.post("/login", userLoginValidation, userLogin);
userRoute.post("/clothes/:id", userAuthentication, purchaseClothes);

export default userRoute;