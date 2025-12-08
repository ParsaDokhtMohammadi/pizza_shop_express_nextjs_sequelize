import {hashSync, genSaltSync, compareSync} from "bcrypt";


export const hashPassword = (password)=>{
    const salt =  genSaltSync();
    return  hashSync(password,salt)
}

export const verifyPassword = (password,hash)=>{
    return compareSync(password,hash);
}
