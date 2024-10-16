import express from "express";
import { Server } from "socket.io";
import {createServer} from "http"
import cors from "cors";
import cookieParser from "cookie-parser";

const port = 3000;
const app = express();
const server =  createServer(app);
const io = new Server(server,{
    cors : {
        origin : "http://localhost:5173/",
        methods : ["GET","POST"],
        credentials : true
    }
});


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
})
app.use(cors())

app.get('/',(req,res)=>console.log('ok'))


io.on("connection",(socket)=>{ // io jab bhi connection event get karega tab ye print hoga 
    console.log('socket'); // msg to io
    console.log(socket.id);
    
    // socket.emit("welcome",`welcome to th server ${socket.id}`);// keval usi user ko message jayega jo add hoga
// socket.broadcast.emit("welcome",`welcome to th server ${socket.id}`)
socket.on("message",({message,room})=>{
console.log(message);
// io.emit('receive-msg',data)
io.to(room).emit('receive-msg',message)
})

//join
socket.on('join-roam',(data)=>{
    socket.join(data);
    console.log(data);    
})

let user = false;
let secretKeyJWT = 1

io.use((socket,next)=>{
    cookieParser()(socket.request,socket.request.res,(err)=>{
        if(err)return next(err)
            const token = socket.request.cookies.token;
        if(!token)return next(new Error("Authentication Error"));
        const decoded = jwt.verify(token,secretKeyJWT) 
        if(!decoded){
            return next(new Error("Authentication Error"));
        }
         
    });
    if(user)next(); 
})

// room 
socket.on("disconnect",()=>{
    console.log('disconnect');    
})
})


// server to listen not app 
server.listen(port,()=>{               
    console.log(`server`);    
})
