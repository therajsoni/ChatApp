import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMessages } from '../redux/messageSlice/messageSlice.js'

const UseGetMessages = () => {
    const {selectedUser} = useSelector(store => store.user)
    const dispatch = useDispatch()
    useEffect(()=>{
        const fetchMessages = async() => {
            try {                         
                axios.defaults.withCredentials = true;
                /// undefined means anthuricates
                const res = await axios.get(`http://localhost:8080/api/v1/message/${selectedUser._id}`);
                dispatch(setMessages(res.data))
                console.log(res.data);      
            } catch (error) {
                console.log(error);                
            }
        }
        fetchMessages();
    },[])

    return (
    <div>
      
    </div>
  )
}

export default UseGetMessages
