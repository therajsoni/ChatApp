import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRoute from  "./routes/userRoute.js"
import cookiesParser from "cookie-parser"
import messageRoute from  "./routes/messageRoute.js"
import cors from "cors";

dotenv.config({})
const app = express();

// const corsOptions = {
//     origin : 'http://localhost:5173',
//     credential : true 
// }

app.use(cors())



app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });

  




app.use(express.urlencoded({
extended : true
}))
app.use(express.json())
app.use(cookiesParser())
connectDB()
//middleware
app.use("/api/v1/user",userRoute)
app.use("/api/v1/message",messageRoute)



app.listen(process.env.PORT||3000,()=>{
    console.log('app listen' , process.env.PORT);    
})