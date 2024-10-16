import React, { useState , useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'
import HomePage from './components/HomePage'
import { useDispatch, useSelector } from 'react-redux'
import io from 'socket.io-client'
import { setSocket } from './redux/socketSlice/socketSlice'
import { setOnlineUser } from './redux/userSlice/Userslice'

const router = createBrowserRouter([
  {
    path : '/',
    element : <HomePage/>
  },
  {
    path : '/signup',
    element : <Signup/>
  },
  {
    path : '/login',
    element : <Login/>
  }
])

export default function App() {
  const {authUser} = useSelector(store => store.user);
  const dispatch = useDispatch();
  const {socket} = useSelector(store => store.socket)
  
  useEffect(() => {
    if(authUser){
      const socket = io(`http://localhost:8080`,{
        query : {
          userId  :  authUser?._id   
        } 
      })
      dispatch(setSocket(socket))
      socket.on('getOnlineUsers',(onlineuser)=>{
      dispatch(setOnlineUser(onlineuser))  
      })
    }else{
      if(socket){
        socket.close();
        dispatch(setSocket(null))
      }
    }
    return () => socket.close()
  }, [authUser])

  return (
    <div>
     <RouterProvider router={router}></RouterProvider>
    </div>
  )
}
