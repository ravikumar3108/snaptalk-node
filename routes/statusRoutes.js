import express from "express";
import {
  createStatus,
  getAllStatus,
  viewStatus,
} from "../controllers/statusControllers.js";

import { protectRoute } from "../middlewares/protectRoutes.js";

const router = express.Router();

router.post("/", protectRoute, createStatus);

router.get("/", protectRoute, getAllStatus);

router.post("/view/:id", protectRoute, viewStatus);

export default router;
