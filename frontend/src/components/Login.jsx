import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { setAuthuser } from '../redux/userSlice'

const Login = () => {

    const [user,setUser] = useState({
        username : '',
        password : '',
    })
    const dispatch = useDispatch()

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            console.log(user);    
            const res = await axios.post('http://localhost:8000/api/v1/user/login',user,{
                headers : {
                    'Content-Type' : 'application/json',
        
                },
                withCredentials : true
            })        
            if(res.data.success){
                toast.success('ok')
                navigate('/');
                dispatch(setAuthuser(res?.data));
            }
            else{
                toast.error('error')
            }
            console.log(res);
            
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
            
        }
        
        console.log(user);
        setUser({
            username : '',
            password : ''
        })
    }

    


  return (
    <div className='min-w-96 mx-auto'>
        <div className='w-full p-6  rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-100'>
            <h1 className='text-3xl font-bold text-center'>Login</h1>
           <form>
           <div>
           <label className='label p-2' >
            <span className='text-base label-text'>UserName</span>
            </label>
            <input  onChange={(e)=>setUser({...user,username : e.target.value})}   value={user.username} type='text' placeholder='UserName'  className='w-full input input-bordered h-10 rounded-sm' />    
           </div>
           <div>
           <label className='label p-2' >
            <span className='text-base label-text'>Password</span>
            </label>
            <input  onChange={(e)=>setUser({...user,password : e.target.value})}   value={user.password} type='text' placeholder='password'  className='w-full input input-bordered h-10 rounded-sm' />    
           </div>
           
           <div className='flex items-center text-center'>
<p>Already have account ? {" "}
<Link  to={"/register"}> SignUp</Link></p>
           </div>

<div>
<button type='submit' onClick={handleSubmit} class="btn btn-block btn-sm mt-2 my-3 bg-white  w-full rounded-lg border-slate-700">
    Login
</button>
</div>
           </form>
        </div>
 
    </div>
  )
}

export default Login