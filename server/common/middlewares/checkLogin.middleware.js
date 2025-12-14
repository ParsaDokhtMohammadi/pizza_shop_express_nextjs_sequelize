export const checkLogin = (req, res, next) => {
    try {
        const token = req.signedCookies.planetPizza
        if(!token){
            res.status(401).json({message:"وارد حساب کاربری خود شوید"})
        }
        next()
    } catch (err) {
        next(err)
    }

}