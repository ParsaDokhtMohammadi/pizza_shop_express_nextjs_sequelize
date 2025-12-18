import multer from "multer";
import path from "path"
import fs from "fs"

const storage = multer.diskStorage({
    destination:(req , file , cb)=>{
        fs.mkdirSync("./public/uploads",{recursive:true})
        cb(null,"public/uploads")
    },
    filename:(req , file , cb)=>{
        const ext = path.extname(file.originalname)
        const whiteListFormat = [".png",".jpg",".jpeg",".webp"]
        if(whiteListFormat.includes(ext)){
            const fileName = Date.now() + ext
            cb(null , fileName)
        }else{
            cb(new Error("فرمت فایل پشتیبانی نمیشود"))
        }
    }
})

const _10MB = 10*1000*1000
export const uploadFile = multer({storage,limits:{fieldSize:_10MB}})