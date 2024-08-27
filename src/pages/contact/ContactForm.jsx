import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FiSend } from "react-icons/fi";
import { BsFillSendArrowUpFill } from "react-icons/bs";
import toast from "react-hot-toast";
import ContactCard from "./ContactCard";
import CBG from "../../assets/CBG.png";
const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      // Replace with your actual API URL
      const response = await axios.post(`https://portfolio-backend-red.vercel.app/api/send-email`, data);
      toast.success(response.data.message || "Message sent successfully!");
      reset();
    } catch (error) {
      if (error.response) {
        toast.error(
          error.response.data.error ||
            "Sorry, Failed to send message. Try again later."
        );
      } else {
        toast.error(
          "Sorry, Failed to send message. Due to Technical Errors, Try after some time."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-[90%] mx-auto" id="contact">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat contact-bg  "
        style={{ backgroundImage: `url(${CBG})`, zIndex: -1 }}
      />
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-opacity-75">
        <div className="flex item-center justify-center">
          <ContactCard />
        </div>
        <div className="rounded-lg shadow-lg">
          <div>
            <h1 className="text-2xl text-purple-400">Contact Us</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="formInput">
                <label>Name</label>
                <input
                  {...register("name", { required: "Name is required!" })}
                  placeholder="Enter your name" className="contact-input"
                />
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
              </div>

              <div className="formInput">
                <label>Email</label>
                <input
                  {...register("email", {
                    required: "Email is required!",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Invalid email address!",
                    },
                  })}
                  placeholder="Enter your email"
                  className="contact-input"
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
              </div>

              <div className="formInput">
                <label>Mobile No</label>
                <input
                  {...register("mobileNo", {
                    required: "Mobile No is required!",
                  })}
                  placeholder="Enter your mobile number"
                  maxLength={10}
                  type="number"
                  className="contact-input"
                />
                {errors.mobileNo && <p className="text-red-500">{errors.mobileNo.message}</p>}
              </div>

              <div className="formInput">
                <label>Message</label>
                <textarea
                  rows={5}
                  {...register("message", { required: "Message is required!" })}
                  placeholder="Enter your message"
                  className="contact-input"
                />
                {errors.message && <p className="text-red-500">{errors.message.message}</p>}
              </div>

              <button className="work-button flex justify-between items-center pl-5 pr-5 pt-1 pb-1" type="submit">
                {loading ? (
                  <>
                    Sending...{" "}
                    <BsFillSendArrowUpFill className="m-2" color="white" size="25px" />
                  </>
                ) : (
                  <>
                    Send <FiSend className="m-2" color="white" size="25px" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
