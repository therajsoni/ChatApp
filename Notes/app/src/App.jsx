import React , {useEffect, useMemo, useState} from 'react'
import {io} from "socket.io-client";
import { Button, TextField } from "@mui/material"

const App = () => {
  
  const [messages,setMessages] = useState([])
  const [message,setMessage] = useState('');
  const [room,setRoom] = useState(''); // that roam in send their message roam is not just like group or also one client a spicific client
  const [socketId,setSocketId] = useState("");
  const [roomName,setRoomName] = useState('');

  // connect client to the circuit 
  const socket = useMemo(()=>io("http://localhost:3000"),[])

  //-- circuit path
  useEffect(()=>{
  socket.on("connect",()=>{
   console.log('conected',socket.id);    
  }) 
  socket.on("receive-msg",(data)=>{
                           console.log(data);                           
  })
  socket.on("welcome",(welcomemsg)=>console.log(welcomemsg)) 
 
  return socket.disconnect()
})

const hadleSubmit = () => {
socket.emit("message",{message,room});
setMessage("")
}
 
const onNewRoamHandler = () => {
  socket.emit('join-roam',roomName);
  setRoomName("");
}

  return (
    <div>
<form onSubmit={hadleSubmit}>
  <TextField value={message} onChange={(e)=>setMessage(e.target.value)} />
  <TextField value={room} onChange={(e)=>setRoom(e.target.value)} />
  <Button type='submit'>Send</Button>

  <TextField value={roomName} onChange={(e)=>setRoomName(e.target.value)} />
  <Button onClick={onNewRoamHandler} type='submit'>Join</Button>
</form>
    </div>
  )
}

export default App
