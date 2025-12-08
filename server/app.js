import express from "express";
import cluster from "cluster";
import os from "os";
import {modelsInit} from "./config/models.init.js";
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
//
// if(cluster.isMaster){
//     for (let index=0; index<os.cpus().length;index++){
//         cluster.fork();
//     }
// cluster.on("exit", (worker)=>{
//     console.log(`worker ${worker.process.pid} died restarting`);
//     cluster.fork()
// })
// }else{
//     app.listen(4000,"0.0.0.0",async ()=>{
//         try{
//             await modelsInit()
//             console.log("server started http://localhost:4000",process.pid)
//         }catch (err){
//             console.log(err);
//         }
//     })
// }
app.listen(4000,"0.0.0.0",async ()=>{
    try{
        await modelsInit()
        console.log("server started http://localhost:4000",process.pid)
    }catch (err){
        console.log(err);
    }
})