import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import OtherUsers from './OtherUsers';
import { useSelector,useDispatch } from 'react-redux';
import { setAuthUser, setOtherUsers } from '../redux/userSlice/Userslice';
import toast from 'react-hot-toast';

const Sidebar = () => {
  const [search,setSearch] = useState("")
  const {otherUsers} = useSelector(store => store.user);
  const dispatch = useDispatch()
  const logoutHandler = async() => {
    try {
      const res = await fetch('http://localhost:8080/api/v1/user/logout',{
        method : "GET" 
      })
      if(res?.ok){
        console.log('ok');
        dispatch(setAuthUser(null))
      }   
      else{
        console.log('not ok');        
      }

    } catch (error) {
      console.log(error);      
    }
  }
  const searchSubmitHandler = (e) => {
  e.preventDefault();
  const conversationUser = otherUsers?.find((user)=>user?.fullName.toLowerCase().incldues(search.toLowerCase()))
  if(conversationUser){
  dispatch(setOtherUsers(conversationUser))  
  }else{
    toast.error('User not found')
  }  
} 


  return (
    <div className='border-r border-slate-500 p-4 flex flex-col'>
        <form onSubmit={searchSubmitHandler} action="" className='flex items-center gap-2'>
          <input
          value={search}
          onChange={e => setSearch(e.target.value)} 
          className='input input-bordered rounded-md' type='text' placeholder='Search...' />
          <button className='btn bg-zing-700'>
          <CiSearch className='w-6 h-6 outline-none'/>
          </button>
        </form>
        <div className="w-full mt-2 mx-2">
  <OtherUsers />
</div>


<div className='mt-2'>
  <button className='btn btn-sm' onClick={logoutHandler}>
Logout
  </button>
</div>
    </div>
  )
}

export default Sidebar