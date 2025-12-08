import {Router} from "express";
import {registerController} from "./auth.service.js";
const router = Router();

router.post("/register",registerController)



export default router