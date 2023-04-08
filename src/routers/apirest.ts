import {Router} from 'express';
import * as control from "../controls/costrolapi";
const router = Router();
router.post("/create",control.home)
router.get("/bus",control.busc)
//router.get("",)
//router.get("",)
//router.delete("",)
//router.put("",)
//router.post("",)
//router.post("",)
//router.get("",)
//router.get("",)
//router.get("",)
//router.get("",)
//router.get("",)
//router.get("",)
export default router;