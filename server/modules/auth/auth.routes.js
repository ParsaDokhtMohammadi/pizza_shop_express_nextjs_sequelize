import {Router} from "express";
import { validate } from "express-validation";
import {registerController} from "./auth.service.js";
import { registerSchema } from "./auth.validation.js";
const router = Router();

router.post("/register",validate(registerSchema),registerController)



export default router