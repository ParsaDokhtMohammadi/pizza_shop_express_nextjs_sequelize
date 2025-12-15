import createHttpError from "http-errors"

export const checkLogin = (req, res, next) => {
    try {
        const token = req.signedCookies.planetPizza
        if(!token) throw createHttpError(401,"وارد حساب کاربری خود شوید")
        next()
    } catch (err) {
        next(err)
    }

}