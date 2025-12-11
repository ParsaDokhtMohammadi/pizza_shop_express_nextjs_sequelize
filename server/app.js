import express from "express";
import AuthRouter from "./modules/auth/auth.routes.js";
import {errorHandle, notFound} from "./common/utils/errorHandler.utils.js";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import { specs } from "./config/swagger.config.js";
import swaggerUi from "swagger-ui-express";
import cors from "cors"
config()

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors())


app.use("/api-docs",swaggerUi.serve, swaggerUi.setup(specs));


app.get("/",(req, res)=>{
    res.send("Hello World! lets test docker");
})





app.use("/api/auth",AuthRouter);






app.use(notFound);
app.use(errorHandle);

// }
export {app}