import express from "express";
import AuthRouter from "./modules/auth/auth.routes.js";
import {errorHandle, notFound} from "./common/utils/errorHandler.utils.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/",(req, res)=>{
    res.send("Hello World! lets test docker");
})





app.use("/api/auth",AuthRouter);






app.use(notFound);
app.use(errorHandle);

// }
export {app}