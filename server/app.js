import express from "express";
import AuthRouter from "./modules/auth/auth.routes.js";
import {errorHandle, notFound} from "./common/utils/errorHandler.utils.js";
import cookieParser from "cookie-parser";
import { config } from "dotenv";

config()

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.get("/",(req, res)=>{
    res.send("Hello World! lets test docker");
})





app.use("/api/auth",AuthRouter);






app.use(notFound);
app.use(errorHandle);

// }
export {app}