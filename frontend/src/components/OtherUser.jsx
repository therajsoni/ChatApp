import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setSelecteduser } from '../redux/userSlice/Userslice';

const OtherUser = ({user}) => {
    // const user = props.user;
    const dispatch = useDispatch()
    const {selectedUser} = useSelector((store)=>store?.user)
    const selectedUserHandler = (user) => {
          console.log(user);          
           dispatch(setSelecteduser(user));
        }
  return (
    <>
    <div onClick={() => selectedUserHandler(user)} className={` ${selectedUser?._id === user?._id ? 'bg-zinc-900' : 'text-white'} flex gap-2 items-center  hover:bg-zinc-200 rounded py-2 px-3  cursor-pointer`}>
        <div className="avatar outline">
            <div className='w-12 rounded-full'>
                <img src={user?.profilePhoto} alt="" srcset="" />
            </div>
        </div>
        <div className="flex flex-col flex-1">
            <div className='flex justify-between gap-2'>
            <p>{user?.fullName}</p>
            </div>
        </div>
    </div>
    <div className='divider my-0 py-0 h-1'>

    </div>
</>
  )
}

export default OtherUser
