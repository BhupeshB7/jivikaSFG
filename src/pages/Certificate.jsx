import React from "react";
import html2canvas from "html2canvas";
import { useSelector } from "react-redux";
import idcard from "../assets/certificate.png";
import logo from "../assets/logo1.png";
import BackButton from "../components/BackButton";

const Certificate = () => {
  const user = useSelector((state) => state.user?.user || {});

  const handleDownload = () => {
    const idCardElement = document.getElementById("idCard");
    if (idCardElement) {
      html2canvas(idCardElement).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "IDCard.png";
        link.click();
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#020c17]">
      <BackButton />
      <div
        id="idCard"
        className="w-[90%] md:w-[70%] bg-slate-800 shadow-md rounded-lg overflow-hidden"
      >
        <div className="relative w-full h-full">
          <img
            src={idcard}
            alt="idcard"
            className="w-full h-[300px] md:h-[480px]"
          />
          <div className="absolute top-0 left-0 w-full h-full p-4 text-center flex flex-col items-center justify-center">
            <div className="p-4 text-center">
              <h3 className="text-md md:text-2xl font-bold text-amber-100 uppercase" style={{fontFamily:'cursive'}}>
                {user?.name || "Unknown User"}
              </h3>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={handleDownload}
        className="mt-4 px-4 py-2 bg-zinc-800 text-white rounded hover:bg-zinc-950"
      >
        Download Certificate
      </button>
    </div>
  );
};

export default Certificate;
