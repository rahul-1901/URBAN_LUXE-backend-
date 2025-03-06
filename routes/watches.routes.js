import WatchesModel from "../models/watches.model.js";
import {Router} from "express";
import { WatchesCollection } from "../controllers/watches.controllers.js";

const watchesRouter = Router();

watchesRouter.get("/", WatchesCollection);

export default watchesRouter;
