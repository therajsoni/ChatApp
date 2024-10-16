import React, { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'
import HomePage from './components/HomePage'
import { useSelector } from 'react-redux'
import io from 'socket.io client'

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
  const [socket,setSocket] = useState(null)

  useEffect(() => {
    if(authUser){
     const socket = io(`http://localhost:8080`,{
      query : authUser?._id    
     })
     setSocket(socket)
    }
  }, [authUser])

  return (
    <div>
     <RouterProvider router={router}></RouterProvider>
    </div>
  )
}
