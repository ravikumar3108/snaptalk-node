import express from 'express'
import { sendMessage, getMessage } from '../controllers/messageControllers.js';
import { protectRoute } from '../middlewares/protectRoutes.js';
const router = express.Router()

router.post("/:id", protectRoute, getMessage)
router.post("/send/:id", protectRoute, sendMessage)


export default router;