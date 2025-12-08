import {hashSync, genSaltSync, compareSync} from "bcrypt";


const hashPassword = (password)=>{
    const salt =  genSaltSync();
    return  hashSync(password,salt)
}

const verifyPassword = (password,hash)=>{
    return compareSync(password,hash);
}
