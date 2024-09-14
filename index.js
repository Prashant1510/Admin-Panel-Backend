import cookieParser from "cookie-parser";
import express from "express";
import dotenv from "dotenv";
import connectToMongoDB from "./DB/connectToMongoDB";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;
app.use(cookieParser());

app.use('/',(req,res)=>{
    res.send("Hello world");
})
app.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`Server is running on ${PORT}`);
});