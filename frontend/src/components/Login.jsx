import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setAuthUser } from '../redux/userSlice/Userslice';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user,setuser] = useState([])

   const dispatch = useDispatch();
   const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle form submission logic here

    // toast loading handle
    const loading = toast.loading("loading",{
        style : {
            background : "black",
            text : "green"
        }
      }) 
  
    try {
        

    const res = await fetch('http://localhost:8080/api/v1/user/login',{
        method:'POST',
        headers : {
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify({
            username,
            password
        })
    })
    if(res?.ok){
        // setTimeout(() => {
        toast.dismiss(loading)
        toast.success("login",{
            duration : 3000,
        })          
        // }, 3000);
       
        const data = await res.json();     
           
        dispatch(setAuthUser(data))
           }    
    else{
        // setTimeout(() => {
            toast.dismiss(loading)
            toast.error("login failed",{
                duration : 3000,
            })    
            // }, 3000);
    }
} catch (error) {
    // setTimeout(()=>{
        toast.dismiss(loading);
        toast.error("failed",{
            duration : 3000,
        })
    // },3000)
}
    setUsername('');setPassword('');
  };

  console.log(user);  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>



        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        
<Link className='font-extrabold' to={"/signup"}>Already have not an  account Signup</Link>
        <button
          type="submit"
          className="w-full  bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Login;
