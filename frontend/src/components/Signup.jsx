import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [fullName,setFullName] = useState('')

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ fullName ,username, password, confirmPassword, gender });

    try {
        const res = await fetch('http://localhost:8080/api/v1/user/register',{
            method : "POST",
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({
                fullName , 
                username,
                password,
                confirmPassword,
                gender
            }) 
        })

        const loadingToast = toast.loading("loading",{
            position : "top-center",
            style : {
                background : "black"
            }
        })

        if(res){
            console.log('ok');      
            setTimeout(() => {
             toast.dismiss(loadingToast);
             toast.success("ok",{
                position : 'top-right',
                duration : 1000
            })    
            }, 3000);     
        }
        else{
            console.log('not ok'); 
            setTimeout(()=>{
            toast.dismiss(loadingToast);
            toast.error('not ok',{
                position : 'top-right',
                duration : 1000
            })      
            },3000)        
        }
    } catch (error) {
        console.log(error);      
        toast.error("something went wrong!")
    }

    setUsername('');setPassword('');setConfirmPassword('');setGender('');setFullName('')
  };



  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>


        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="username">
            FullName
          </label>
          <input
            type="text"
            id="fullname"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

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

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        <fieldset className="mb-4">
          <legend className="block text-sm font-medium mb-2">Gender</legend>
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id="male"
              checked={gender === 'male'}
              onChange={() => setGender(gender === 'male' ? '' : 'male')}
              className="mr-2"
            />
            <label htmlFor="male" className="text-sm">Male</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="female"
              checked={gender === 'female'}
              onChange={() => setGender(gender === 'female' ? '' : 'female')}
              className="mr-2"
            />
            <label htmlFor="female" className="text-sm">Female</label>
          </div>
        </fieldset>
<Link className='font-extrabold' to={"/login"}>Already have an account Login</Link>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
