import React from "react";
import logo from "../../assets/logo1.png";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
    const navItem =[
        {name: "Home", href: "/"},
        {name: "About", href: "/about"},
        {name: "Contact", href: "/contact"},
        {name: "Payment History", href: "/payment-history"},
    ]
    const works =[
        {name:'Data Entry'},
        {name:'Data Operator'},
        {name:'Ayushman card Apply'}
    ]
  return (
    <div className="mt-4">
      <section className="w-[90%] md:w-[80%] m-auto px-5 space-y-3 flex  justify-center gap-12 md:gap-48  lg:gap-[500px] h-32  shadow-slate-500 shadow rounded-lg    bg-[#020c17]">
        <div className="m-3 pt-6">
          <img src={logo} alt="logo" className="w-16 h-12  md:w-20 md:h-16 " />
        </div>
        <div className=" md:pr-48">
          <h1 className="text-2xl md:text-4xl font-bold text-amber-300">
            JIVIKA SFG
          </h1>
          <p className="text-center text-md md:text-lg text-amber-100">
            www.jivikasfg.in
          </p>
        </div>
      </section>
      <div className="w-[90%] md:w-[70%] overflow-x-auto whitespace-nowrap flex justify-center m-auto mt-4">
    <ul className="flex flex-wrap gap-1 justify-center">
      {navItem.map((item, index) => (
        <li
          key={index}
          className="text-center text-md md:text-lg text-amber-100 hover:text-amber-200 px-6 py-1 bg-gray-800 cursor-pointer  md:px-3 whitespace-nowrap"
        >
          <Link to={item.href}>
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
      <section className="relative w-[280px] h-12 flex items-center m-auto justify-center mt-4">
        <input placeholder="search..." />
        <FaSearch className="absolute top-1/2 right-3 transform -translate-y-1/2 text-amber-200 h-6 w-4 hover:w-6 cursor-pointer" />
      </section>
      <div className="w-[90%] md:w-[70%] overflow-x-auto whitespace-nowrap flex justify-center m-auto mt-4">
    <ul className="flex flex-wrap gap-1 justify-center">
      {works.map((item, index) => (
        <li
          key={index}
          className="text-center text-md md:text-lg text-amber-100 hover:text-amber-200 cursor-pointer px-1 md:px-3 whitespace-nowrap"
        >
          <Link to={item.href}>
            {item.name}
            {index < works.length - 1 && ' ||'}
          </Link>
        </li>
      ))}
    </ul>
  </div>
    </div>
  );
};

export default Header;
