import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setOtherUsers } from "../redux/userSlice/Userslice";

const useGetOtherUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        // isAuthenticated pass in backend so pass withCreadentiats
        axios.defaults.withCredentials = true;
        const res = await axios.get(`http://localhost:8080/api/v1/user/`);
        console.log(res.data);
        // store
        dispatch(setOtherUsers(res.data));
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchOtherUsers();
  }, []);

  return <div>
    
  </div>;
};

export default useGetOtherUsers;
