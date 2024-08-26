import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/components/Home";
import Login from "./pages/auth/Login";
import { Toaster } from "react-hot-toast";
import ApplyForm from "./pages/components/user/ApplyForm";
import Profile from "./pages/Profile";
import IDCard from "./pages/IDCard";
const App = () => {
  return (
    <>
     <Toaster/>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/apply-form" element={<ApplyForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/id-card" element={<IDCard />} />
      </Routes>
   
    </BrowserRouter>
    </>
  );
};

export default App;
