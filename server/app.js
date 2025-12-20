import express from "express";
import AuthRouter from "./modules/auth/auth.routes.js";
import {errorHandle, notFound} from "./common/utils/errorHandler.utils.js";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import { specs } from "./config/swagger.config.js";
import swaggerUi from "swagger-ui-express";
import cors from "cors"
import { CartRouter } from "./modules/Cart/Cart.routes.js";
import { OrderRouter } from "./modules/order/Order.routes.js";
import { ItemRouter } from "./modules/item/Item.routes.js";
import { DiscountRouter } from "./modules/discount/Discount.routes.js";
config()

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"))
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors())


app.use("/api-docs",swaggerUi.serve, swaggerUi.setup(specs));


app.get("/",(req, res)=>{
    res.send("Hello World! lets test docker");
})





app.use("/api/auth",AuthRouter);
app.use("/api/cart",CartRouter)
app.use("/api/order",OrderRouter)
app.use("/api/product",ItemRouter)
app.use("/api/discount",DiscountRouter)





app.use(notFound);
app.use(errorHandle);

// }
export {app}