import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { FaMessage } from "react-icons/fa6";
import contact from "../../assets/contact.png";
import { ImageComponent } from "./ImageComponent";
const ContactCard = () => {
  const ref2 = useRef(null);
  const isInView = useInView(ref2, { once: false });
  const controls = useAnimation();
  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        x: 0,
        scale: 1,
        transition: { duration: 0.5 },
      });
    } else {
      controls.start({
        opacity: 0,
        x: -140,
        scale: 1.4,
        transition: { duration: 0.5 },
      });
    }
  });
  return (
    <div   className="">
      <motion.h5
        className="text-xl text-purple-300 "
        ref={ref2}
        initial={{ opacity: 0, x: -140, scale: 1.4 }}
        animate={controls}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
        }}
      >
        If you need to{" "}
        <span className="flex justify-between text-4xl  bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          get in touch with us,
        </span>{" "}
        don't hesitate to give us a{" "}
        <div className="flex gap-3">
          <FaMessage size={25} style={{ color: "violet" }} /> or a call.
        </div>
      </motion.h5>
      {/* <img src={contact} alt="contact"/> */}
      <div className="flex justify-center items-center w-full">
        <ImageComponent src={contact} alt="contact" height={"auto"} />
      </div>
    </div>
  );
};

export default ContactCard;
