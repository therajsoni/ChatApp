import React, { useEffect } from 'react'
import Sendinput from './Sendinput'
import Messages from './Messages'
import { useDispatch, useSelector } from 'react-redux'
import { setSelecteduser } from '../redux/userSlice/Userslice'

const MessageContainer = () => {
  const {selectedUser} = useSelector(store => store.user)
  const dispatch = useDispatch()
  
  useEffect(() => {

    return () => dispatch(setSelecteduser(null))
  }, [])



  return (
<div>
  {
    selectedUser ? (
      <div className='md:min-w-[450px] flex flex-col justify-between'>
      <div className='flex gap-2 items-center bg-zinc-800 text-white px-4 py-2 mb-2'>
      <div className="avatar outline">
          <div className='w-12 rounded-full'>
              <img src={selectedUser?.profilePicture} alt="" srcset="" />
          </div>
      </div>
      <div className="flex flex-col flex-1">
          <div className='flex justify-between gap-2'>
          <p>{selectedUser?.fullName}</p>
          </div>
      </div>
  </div>
<Messages/>
  <Sendinput/>
  </div>
    ) : (
      <div className='md:min-w-[450px] flex flex-col justify-between items-center' >
  <h1 className='text-4xl text-white font-bold'>Hi , {fullName}</h1>
   <h1 className='text-2xl text-white'>
   Let's start conversation
   </h1>
      </div>
    )
  }
 
</div>
  )
}

export default MessageContainer