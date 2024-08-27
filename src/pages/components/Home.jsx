import React from "react";
import Header from "../../components/Header/Header";
import Work from "./Work";
import Carousel from "./Carousel";
import AuthDetails from "../auth/AuthDetails";
import Footer from "../../components/Footer";
import ContactForm from "../contact/ContactForm";
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
      <ContactForm />
      <div>
          <div fluid className="p-2">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3591.9191999791356!2d86.26371027493624!3d25.806239606764226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ee0961837d7e4f%3A0x9575f75e355bcf7d!2sSahorba%20ghat%20k.%20asthan!5e0!3m2!1sen!2sin!4v1694430240629!5m2!1sen!2sin"
               width="100%"
              height="450"
              style={{ border: "0" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          
          </div>
        </div>
      <Footer/>
      </div>
  );
};

export default Home;
