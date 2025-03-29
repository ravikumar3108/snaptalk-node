import express from 'express'
import { userGetForSlidebar } from '../controllers/userControllers.js';
import { protectRoute } from '../middlewares/protectRoutes.js';

const router = express.Router()
router.get("/", protectRoute, userGetForSlidebar)


export default router;