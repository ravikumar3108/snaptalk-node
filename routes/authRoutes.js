import express from 'express'
import { loginUser, signUpUser, logoutUser, profile ,dumy} from '../controllers/authControllers.js';
import { protectRoute } from '../middlewares/protectRoutes.js';
const router = express.Router()

router.get("/login", loginUser)
router.get("/dumy", dumy)
router.post("/signup", signUpUser)
router.post("/logout", logoutUser)
router.get("/profile", protectRoute, profile)


export default router;