import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const ApplyForm = () => {
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    fatherName: "",
    motherName: "",
    gender: "",
    email: "",
    mobile: "",
    tenthResult: "",
    twelfthResult: "",
    address: "",
    termsAccepted: false,
  });
  const [loading, setLoading] = useState(false);

  const handleDobChange = (e) => {
    const selectedDate = new Date(e.target.value);
    setDob(e.target.value);

    const today = new Date();
    let years = today.getFullYear() - selectedDate.getFullYear();
    let months = today.getMonth() - selectedDate.getMonth();
    let days = today.getDate() - selectedDate.getDate();

    if (days < 0) {
      months -= 1;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const formattedAge = `${String(years).padStart(2, "0")} Years ${String(
      months
    ).padStart(2, "0")} Months ${String(days).padStart(2, "0")} Days`;
    setAge(formattedAge);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
      setImageFile(file);
    } else {
      setImagePreview(null);
      setImageFile(null);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    // Form validation
    if (
      !dob ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.mobile ||
      !formData.termsAccepted
    ) {
      toast.error("Please fill all the required fields and accept the terms.");
      return;
    }

    if (!imageFile) {
      toast.error("Please upload an image.");
      return;
    }

    setLoading(true);

    try {
      // Upload image to Cloudinary
      const formDataImage = new FormData();
      formDataImage.append("file", imageFile);
      formDataImage.append("upload_preset", "anishayan");

      const cloudinaryRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dmoukvc5oe/image/upload",
        formDataImage
      );
      const imageUrl = cloudinaryRes.data.secure_url;
      console.log("imageUrl", imageUrl);
      // Send form data to backend
      const data = {
        ...formData,
        dob,
        age,
        imageUrl,
      };
      console.log("data", data);
      await axios.post("https://your-backend-endpoint/api/apply", data);

      toast.success("Form submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit the form.");
    } finally {
      setLoading(false);
      setFormData({
        firstName: "",
        lastName: "",
        fatherName: "",
        motherName: "",
        gender: "",
        email: "",
        mobile: "",
        tenthResult: "",
        twelfthResult: "",
        address: "",
        termsAccepted: false,
      })
    }
  };

  const maxDate = new Date().toISOString().split("T")[0];

  return (
    <>
      <Toaster />
      <h5 className="text-center text-2xl font-bold text-white pt-5">
        Apply Form
      </h5>
      <div className="w-[90%] md:w-[80%] flex justify-center mx-auto mt-5 shadow-lg rounded-xl bg-gray-800 p-5">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="order-2 md:order-1 flex flex-col-reverse justify-center m-auto items-center">
              {dob && (
                <div className="text-white my-2">
                  <p className="p-1 pb-2">Age: {age}</p>
                </div>
              )}
              <input type="file" onChange={handleImageChange} />
            </div>
            <div className="order-1 md:order-2 flex justify-center m-auto items-center">
              <div className="w-[150px] h-[150px] border border-gray-600 flex items-center justify-center bg-slate-700 rounded-md">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded"
                  />
                ) : (
                  <span className="text-gray-300">150 x 150</span>
                )}
              </div>
            </div>
          </div>

          {/* First Name and Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-white mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-white mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-2 rounded"
              />
            </div>
          </div>

          {/* Father's Name and Mother's Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-white mb-1">Father's Name</label>
              <input
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                className="w-full p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-white mb-1">Mother's Name</label>
              <input
                type="text"
                name="motherName"
                value={formData.motherName}
                onChange={handleChange}
                className="w-full p-2 rounded"
              />
            </div>
          </div>

          {/* DOB and Gender */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-white mb-1">DOB</label>
              <input
                type="date"
                value={dob}
                onChange={handleDobChange}
                max={maxDate}
                className="date-picker"
              />
            </div>
            <div>
              <label className="block text-white mb-1">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-2 rounded"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Email and Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-white mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-white mb-1">Mobile</label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full p-2 rounded"
              />
            </div>
          </div>

          {/* 10th & 12th Result */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-white mb-1">10th Result</label>
              <input
                type="text"
                name="tenthResult"
                value={formData.tenthResult}
                onChange={handleChange}
                className="w-full p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-white mb-1">12th Result</label>
              <input
                type="text"
                name="twelfthResult"
                value={formData.twelfthResult}
                onChange={handleChange}
                className="w-full p-2 rounded"
              />
            </div>
          </div>

          {/* Address */}
          <div className="mb-4">
            <label className="block text-white mb-1">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 rounded"
              rows="3"
            ></textarea>
          </div>

          {/* Checkbox for Terms and Conditions */}
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                className="form-checkbox"
              />
              <span className="ml-2 text-white">
                I accept the terms and conditions
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
};

export default ApplyForm;
