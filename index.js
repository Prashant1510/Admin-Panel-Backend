import cookieParser from "cookie-parser";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToMongoDB from "./DB/connectToMongoDB.js";
import adminAuthRoute from "./routes/admin.auth.js"
import employeeAuthRoute from "./routes/employee.auth.js"

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin:"https://admin-panel-dealsdray.netlify.app", credentials: true }));

app.use('/api/adminauth', adminAuthRoute);
app.use('/api/employeeauth', employeeAuthRoute);

app.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`Server is running on ${PORT}`);
});