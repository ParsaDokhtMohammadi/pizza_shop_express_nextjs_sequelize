import {Router} from "express";
import { validate } from "express-validation";
import {loginController, registerController} from "./auth.service.js";
import { loginSchema, registerSchema } from "./auth.validation.js";
const router = Router();

router.post("/register",validate(registerSchema),registerController)
router.post("/login",validate(loginSchema),loginController)


export default router