import {hashPassword, verifyPassword} from "../../common/utils/auth.utils.js";


export const registerController = (req , res , next)=>{
    const {password} = req.body;
    const hash = hashPassword(password)
    res.status(200).json({ hash });
}