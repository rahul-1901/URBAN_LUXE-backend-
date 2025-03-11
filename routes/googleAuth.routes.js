import { Router } from 'express';
import { googleAuth } from '../controllers/googleAuth.controllers.js';

const authRouter = Router();
authRouter.get('/google', googleAuth);

export default authRouter;