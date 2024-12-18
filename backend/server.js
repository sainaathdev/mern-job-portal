import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"; 
import dotenv from 'dotenv'
import connectDb from "./utils/db.js";
import userRoute from './routes/user.route.js'
import companyRoute from './routes/company.route.js'
import jobRoute from './routes/job.route.js'
import applicationRoute from './routes/application.route.js'
import path from "path";

dotenv.config({})
const app = express();

const _dirname = path.resolve();

//middlewares-------------------
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())

// app.get("/home", (req,res) =>{
//     return res.status(200).json({
//         message: "im home",
//         success: true
//     })
// })
const corsOptions = {
    origin:'http://localhost:5173',
    credentials:true
}

app.use(cors(corsOptions));
const PORT = process.env.PORT || 3000

//api-------

app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute)
app.use("/api/v1/job", jobRoute)
app.use("/api/v1/application", applicationRoute)

app.use(express.static(path.join(_dirname, "/Frontend/dist")));
app.get('*', (_,res) => {
    res.sendFile(path.resolve(_dirname, "Frontend", "dist", "index.html"));
});

app.listen(PORT, () =>{
    connectDb()
    console.log(`server running on port ${PORT}`)
})