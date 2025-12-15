import createHttpError from "http-errors"

export const MakeOrder = async(req , res ,next)=>{
    try{
        const {type} = req.query
        if(!type || type!=="pickUp" || type!=="delivery") throw createHttpError(400,"درخواست نامعتبر")
        if(type==="pickUp"){
            
        }
        if(type==="delivery"){

        }
        
    }catch(err){
        next(err)
    }
}