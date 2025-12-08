import express from "express";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/",(req, res)=>{
    res.send("Hello World! lets test docker");
})

app.listen(4000,'0.0.0.0',(req,res)=>{
    console.log("server started http://localhost:4000")
})