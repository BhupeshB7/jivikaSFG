import React from "react";
import Student from "./components/user/Student";
import { useSelector } from "react-redux";

const Profile = () => {
    const user = useSelector(state => state.user?.user);
  return (
    <>
      <div className="max-w-sm mt-5 border rounded-lg shadow bg-gray-800  border-gray-700 flex flex-col justify-center items-center mx-auto">
        <a href="#">
          <img
            className="rounded-full w-24 h-24 m-3"
            src= {user.profile}
            alt
          />
        </a>
        <div className="p-5">
           <h6 className="text-amber-200 font-bold text-lg">Name: {user.name}</h6>
           <h6 className="text-amber-100 text-md">Email: {user.email}</h6>
        </div>
      </div>
      <Student/>
    </>
  );
};

export default Profile;
