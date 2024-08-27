import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

export const ImageComponent = ({ src, alt, width, height,widthImg,className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({ opacity: 1, y: 0, scale: 1});
    } else {
      controls.start({ opacity: 0, y: -30, scale: 1 });
    }
  }, [isInView, controls]);

  return (
    <div className={`flex justify-center items-center w-full md:w-${widthImg} mb-4 md:mb-0`}>
      <motion.img
        ref={ref}
        initial={{ opacity: 0, y: -30, scale: 0.8 }}
        animate={controls}
        transition={{
          duration: 0.5,
          ease: "easeOut",
          times: [0, 0.2, 0.5, 0.8, 1],
        }}
        whileHover={{ scale: 1.1 }}
        src={src}
        alt={alt}
        className={`w-[${width}] h-[${height}] ${className || ''}`}
      />
    </div>
  );
};
