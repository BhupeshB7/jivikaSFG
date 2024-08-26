import React from "react";
import { useDispatch } from "react-redux";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { setUser } from "../../store/userSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
const navigate = useNavigate();
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const { access_token } = tokenResponse;
        const response = await axios.get(
          `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
        );

        const { name, email, picture } = response.data;
        const userData = { name, email, profile: picture };

        // Store user data in Redux
        dispatch(setUser(userData));
        console.log(userData);
        // // Send user data to your database
        // await fetch("/api/saveUser", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(userData),
        // });
        toast.success("Login Successful");
        navigate("/profile");
      } catch (error) {
        console.error("Failed to fetch user information", error);
        toast.error("Login Failed", error);
      }
    },
    onError: () => console.log("Login Failed"),
  });


  return (
    <div className="flex flex-col items-center justify-center h-[500px]">
      <button
        onClick={() => login()}
        className="p-3 px-9 bg-gray-900 border border-slate-700 rounded text-gray-300 flex justify-center gap-5 items-center"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/128/300/300221.png"
          className="w-8 h-8"
          alt="icon_google"
        />
        Google
      </button>


    </div>
  );
};

export default Login;
