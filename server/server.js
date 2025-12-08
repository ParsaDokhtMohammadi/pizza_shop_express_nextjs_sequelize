import {app} from './app.js';
import {modelsInit} from "./config/models.init.js";
import cluster from "cluster";
import os from "os";




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


app.listen(4000,"0.0.0.0",async ()=>{
    try{
        await modelsInit()
        console.log("server started http://localhost:4000",process.pid)
    }catch (err){
        console.log(err);
    }
})