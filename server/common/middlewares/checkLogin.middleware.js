import createHttpError from "http-errors";
import { verifyToken } from "../utils/auth.utils.js"; // wherever this is

export const checkLogin = (req, res, next) => {
    try {
        const token = req.signedCookies.planetPizza;
        if (!token) {
            throw createHttpError(401, "وارد حساب کاربری خود شوید");
        }
        verifyToken(token);
        next();
    } catch (err) {
        res.clearCookie("planetPizza")
        next(err);
    }
};
