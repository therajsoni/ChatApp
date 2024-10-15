import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'
import HomePage from './components/HomePage'
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
  return (
    <div>
     <RouterProvider router={router}></RouterProvider>
    </div>
  )
}
