import express from "express"
const router=express.Router();
import { redirectOriginalURL } from "../controller/redirectController.js";
router.get("/:code",redirectOriginalURL)

export default router;