import React from "react";
import { Link } from "react-router-dom";
import {
  FaUserTie,
  FaUser,
  FaFileAlt,
  FaChartBar,
  FaAward,
  FaUsers,
} from "react-icons/fa";
import { useSelector } from "react-redux";
const Work = () => {
  const authStatus = useSelector((state) => state.user.status);

  const iconMap = {
    'Admin': <FaUserTie />,
    'Login': <FaUser />,
    'Apply Form': <FaFileAlt />,  
    'Employee': <FaUsers />,
    'Certificate': <FaAward />,   
    'Result': <FaChartBar />, 
    'Profile': <FaUser />,
};

  const works = [
    { name: "Admin", url: "/admin", icon: iconMap["Admin"] },
    { name: "Apply Form", url: "/apply-form", icon: iconMap["Apply Form"] },
    { name: "Employee", url: "/employees", icon: iconMap["Employee"] },
    ...(authStatus
      ? [{ name: "Profile", url: "/profile", icon: iconMap["Profile"] }]
      : [{ name: "Login", url: "/login", icon: iconMap["Login"] }]),
  ];

  return (
    <div className="mt-5">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 m-auto w-[90%] md:w-[70%] lg:w-[65%]">
        {works.map((work, index) => (
          <Link
            to={work.url}
            key={index}
            className={`work-card flex ${
              index % 2 === 0 ? "flex-row" : "flex-row-reverse"
            } py-2 gap-3 items-center justify-between m-auto w-[100%] bg-gray-800 hover:bg-zinc-900 rounded-xl`}
          >
            <div
              className={`icon-container flex items-center justify-center text-4xl text-amber-200 bg-gray-900 w-100 h-100 p-5 px-7 ${
                index % 2 === 0 ? "rounded-r-full" : "rounded-l-full"
              }`}
            >
              {work.icon}
            </div>
            <h2 className="px-6 text-xl font-bold text-white text-center md:text-2xl">
              {work.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Work;
