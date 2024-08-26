import React from "react";
import {
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
  FaWhatsapp,
  FaHome,
  FaInfoCircle,
  FaUser,
  FaCalendarCheck,
  FaChartBar,
  FaListAlt,
  FaAward,
  FaUserTie,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
const footerIcons = [
  {
    icon: <FaLinkedin />,
    link: "https://www.linkedin.com/in/bhupesh-kumar-35011224b",
  },
  {
    icon: <FaEnvelope />,
    link: "mailto:bhupeshkr2912@gmail.com",
  },
  {
    icon: <FaInstagram />,
    link: "https://www.instagram.com/bhupeshb7?igsh=ODVvMWd0bmQ0ZG10",
  },
  {
    icon: <FaTwitter />,
    link: "https://x.com/Bhupeshb7?t=F49fYUEO8Wj5I-jPaXL6CQ&s=09",
  },
  {
    icon: <FaWhatsapp />,
    link: "https://wa.me/918581869783",
  },
];

const Footer = () => {
  const handleIconClick = (link) => {
    // Open WhatsApp link in a new tab
    if (link.startsWith("https://wa.me")) {
      window.open(link, "_blank");
    } else {
      // For other links, handle navigation
      window.location.href = link;
    }
  };

  return (
    <footer className="bg-[#02000c] py-8 mt-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-center justify-center">
            <img src={logo} alt="logo" className="w-20 h-16" />
          </div>
          <div>
            <h6 className="text-white text-lg mb-2">Quick Links</h6>
            <div className="flex flex-col space-y-2">
              <a href="/" className="text-gray-400 flex items-center">
                <FaHome className="mr-2" /> Home
              </a>
              <a href="/contact" className="text-gray-400 flex items-center">
                <FaEnvelope className="mr-2" /> Contact Us
              </a>
              <a href="/about" className="text-gray-400 flex items-center">
                <FaInfoCircle className="mr-2" /> About Us
              </a>
              <a href="/profile" className="text-gray-400 flex items-center">
                <FaUserTie className="mr-2" />Profile
              </a>
            </div>
          </div>
          <div>
            <h6 className="text-white text-lg mb-2"> Links</h6>
            <div className="flex flex-col space-y-2">
              <Link to="/Login" className="text-gray-400 flex items-center">
                <FaUser className="mr-2" />
                Login
              </Link>
              <Link
                to="/attendance"
                className="text-gray-400 flex items-center"
              >
                <FaCalendarCheck className="mr-2" />
                Attendance
              </Link>
              <Link to="/result" className="text-gray-400 flex items-center">
                <FaChartBar className="mr-2" /> Result
              </Link>
              <Link
                to="/certificate"
                className="text-gray-400 flex items-center"
              >
                <FaAward className="mr-2" /> Certificate
              </Link>
              <Link
                to="/total-attendance"
                className="text-gray-400 flex items-center"
              >
                <FaListAlt className="mr-2" /> Total Attendance
              </Link>
            </div>
          </div>
          <div>
            <h6 className="text-white text-lg mb-2">Contact Us</h6>
            <p className="text-gray-400 text-sm">Email: support@gmail.com</p>
            <p className="text-gray-400 text-sm">
              Phone:{" "}
              <a href="tel:+917870179467" className="text-gray-400">
                +917870179467
              </a>
            </p>
            <div className="flex mt-4 space-x-4">
              {footerIcons.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  className="text-gray-400 text-xl"
                  onClick={() => handleIconClick(item.link)}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Jivika SFG.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
