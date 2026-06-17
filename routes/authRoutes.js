import express from "express";
import {
  loginUser,
  signUpUser,
  logoutUser,
  profile,
  updateProfile
} from "../controllers/authControllers.js";
import { protectRoute } from "../middlewares/protectRoutes.js";
const router = express.Router();

router.post("/login", loginUser);
router.post("/signup", signUpUser);
router.post("/logout", logoutUser);
router.get("/profile", protectRoute, profile);
router.put("/update-profile", protectRoute, updateProfile);

export default router;
