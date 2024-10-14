import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const Signup = () => {

    const navigate = useNavigate()

    const [user,setUser] = useState({
        fullName : ''
        ,username : '',
        password : '',
        confirmPassword : '',
        gender:''
    })

    const handleSubmit = async(e) => {
e.preventDefault();
try {
    console.log(user);    
    const res = await axios.post('http://localhost:8000/api/v1/user/register',user,{
        headers : {
            'Content-Type' : 'application/json',

        },
        withCredentials : true
    })

    if(res.data.success){
        toast.success('ok')
        navigate('/login')
    }
    else{
        toast.error('error')
    }
    console.log(res);
    
} catch (error) {
    console.log(error);
    toast.error('error')
}

console.log(user);
setUser({
    fullName : ''
    ,username : '',
    password : '',
    confirmPassword : '',
    gender:''
})
    }

// const handleSubmit = async(e) => {
//     e.preventDefault();
//     await fetch(`http://localhost:8000/api/v1/user/register`,user,{
//         method : "POST",
//         headers : {
//             'Content-Type' : 'application/json'
//        ,
//        }
//     })
// }


    const handleCheckbox = (gender) => {
        setUser({
            ...user,gender
        })
    }
    


  return (
    <div className='min-w-96 mx-auto'>
        <div className='w-full p-6  rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-100'>
            <h1 className='text-3xl font-bold text-center'>SignUp</h1>
           <form>
           <div>
           <label className='label p-2' >
            <span className='text-base label-text'>Full Name</span>
            </label>
            <input  onChange={(e)=>setUser({...user,fullName : e.target.value})}    value={user.fullName} type='text' placeholder='FullName'  className='w-full input input-bordered h-10 rounded-sm' />    
           </div>
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
           <div>
           <label className='label p-2' >
            <span className='text-base label-text'>Confirm Password</span>
            </label>
            <input  onChange={(e)=>setUser({...user,confirmPassword : e.target.value})}   value={user.confirmPassword} type='text' placeholder='Confirm Password'  className='w-full input input-bordered h-10 rounded-sm' />    
           </div>
           <div className='flex items-center my-4'>
            <div className='flex items-center'>
                <p>Male</p>
                <input   checked={user.gender === "male"} onChange={()=>handleCheckbox("male")}  type="checkbox" class="checkbox mx-2" />
            </div>
            <div className='flex items-center'>
                <p>Female</p>
                <input  checked={user.gender === "female"} onChange={()=>handleCheckbox("female")} type="checkbox" class="checkbox mx-2" />
            </div>
           </div>
           <div className='flex items-center text-center'>
<p>Already have account ? {" "}
<Link  to={"/login"}> Login</Link></p>
           </div>

<div>
<button type='submit' onClick={handleSubmit} class="btn btn-block btn-sm mt-2 border-slate-700">
    SignUp
</button>
</div>
           </form>
        </div>
 
    </div>
  )
}

export default Signup