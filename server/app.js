import express from "express";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.listen(4000,(req,res)=>{
    console.log("server started http://localhost:4000")
})