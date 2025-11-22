import express from "express"
import { createLink,getLinksData ,getSingleLinkStat,deleteSingleLink} from "../controller/linkController.js";
const router=express.Router();


router.get("/links",getLinksData);
router.post("/links",createLink);
router.get("/links/:code",getSingleLinkStat);
router.delete("/links/:code",deleteSingleLink);

export default router;