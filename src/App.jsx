import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/components/Home";
import Login from "./pages/auth/Login";
import { Toaster } from "react-hot-toast";
import ApplyForm from "./pages/components/user/ApplyForm";
import Profile from "./pages/Profile";
import IDCard from "./pages/IDCard";
import Scrolltotop from "./utils/Scrolltotop";
import Certificate from "./pages/Certificate";
import Test from "./pages/Test";
import Exam from "./pages/Exam";
import Result from "./pages/Result";
import Attendance from "./pages/Attendance";
import TotalAttendance from "./pages/TotalAttendance";
const App = () => {
  return (
    <>
     <Toaster/>
    <BrowserRouter>
     <Scrolltotop/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/apply-form" element={<ApplyForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/id-card" element={<IDCard />} />
        <Route path="/certificate" element={<Certificate />} />
        <Route path="/test" element={<Test />} />
        <Route path="/exam" element={<Exam />} />
        <Route path="/result" element={<Result />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/total-attendance" element={<TotalAttendance />} />
      </Routes>
   
    </BrowserRouter>
    </>
  );
};

export default App;
