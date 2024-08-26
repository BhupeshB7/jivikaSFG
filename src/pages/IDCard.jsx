import React from "react";
import html2canvas from "html2canvas";
import { useSelector } from "react-redux";
import  idcard from "../assets/idcard.png";
import logo from "../assets/logo1.png";
const IDCard = () => {
  const user = useSelector((state) => state.user?.user);
  const handleDownload = () => {
    const idCardElement = document.getElementById("idCard");
    html2canvas(idCardElement).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "IDCard.png";
      link.click();
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#020c17]">
      <div
        id="idCard"
        className="w-80 bg-slate-800 shadow-md rounded-lg overflow-hidden"
      >
        <div className="relative w-full h-full">
          <img src={idcard} alt="idcard" className="w-full h-[480px]" />
          <div className="absolute top-0 left-0 w-full h-full p-4 text-center">
            <img src={logo} alt="logo" className="w-16 h-12 mb-4" />
            <div className="flex justify-center mt-12">
              <img
                src={user?.profile}
                alt="Profile"
                className="w-28 h-28 rounded-full border-2 border-gray-400"
              />
            </div>
            <div className="p-4 text-center">
              <h3 className="text-md font-bold text-gray-700 uppercase">{user?.name}</h3>
              <p className="text-sm text-gray-600">Student</p>
              <div className="mt-4 text-left">
                <p>
                  <strong>ID:</strong> {Date.now()}   
                </p>
                <p className="mt-2">
                  <strong>Email:</strong> {user?.email}    
                </p>
              </div>
              <p className="pt-4 text-end">Valid Till: 20/12/2025</p>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={handleDownload}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Download ID Card
      </button>
    </div>
  );
};

export default IDCard;
