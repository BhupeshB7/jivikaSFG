import React from "react";
import Header from "../../components/Header/Header";
import Work from "./Work";
import Carousel from "./Carousel";
import AuthDetails from "../auth/AuthDetails";
import Footer from "../../components/Footer";
const Home = () => {
  return (
    <div >
      <AuthDetails />
      <Header />
      <div className="w-[90%] flex justify-center mx-auto mt-5 ">
        <Carousel />
      </div>
      <Work />
      <hr className="border-b-4 border-gray-700 w-[90%] md:w-[70%] mx-auto mt-5 rounded" />
      <marquee behavior="scroll" direction="left" style={{ color: "white" }}>
        <h1 className="text-center text-4xl font-bold  bg-gradient-to-r from-green-500 via-violet-500 to-pink-500 bg-clip-text text-transparent ">
          JIVIKA SFG
        </h1>
      </marquee>
      <Footer/>
      </div>
  );
};

export default Home;
