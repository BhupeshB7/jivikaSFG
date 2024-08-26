import React from "react";
import { FaBell, FaPowerOff } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../store/userSlice";
import { googleLogout } from "@react-oauth/google";
import toast from "react-hot-toast";

const AuthDetails = () => {
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.user.status);
  const usersImage = useSelector((state) => state.user.user?.profile);
  const handleLogOut=()=>{
    const confirm = window.confirm("Do you want to logout?");
    if (confirm) {
      googleLogout();
      dispatch(clearUser());
      toast.success("Logged out successfully.");
    }
  }

  return <>{authStatus && <div className="flex flex-row-reverse  m-5 items-center gap-3">
      <FaPowerOff className="text-2xl text-red-600" onClick={ handleLogOut} />
      <img src={usersImage} className="w-12 h-12 rounded-full" alt="profile" />
      <FaBell className="text-2xl text-amber-200 bg-gray-800 rounded-full p-2 w-9 h-9" />
  </div>}</>;
};

export default AuthDetails;
