import React, { useState } from "react";

const ApplyForm = () => {
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

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
    } else {
      setImagePreview(null);
    }
  };

  const maxDate = new Date().toISOString().split("T")[0];

  return (
    <>
      <h5 className="text-center text-2xl font-bold text-white pt-5">
        Apply Form
      </h5>
      <div className="w-[90%] md:w-[80%] flex justify-center mx-auto mt-5 shadow-lg rounded-xl bg-gray-800 p-5">
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
           
            <div className="order-2 md:order-1 flex flex-col-reverse justify-center m-auto items-center">
              {/* Display Age */}
              {dob && (
                <div className="text-white my-2">
                  <p className="p-1 pb-2">Age: {age}</p>
                </div>
              )}
              <input type="file" onChange={handleImageChange} />
            </div>
            <div className="order-1 md:order-2 flex justify-center m-auto items-center">
              {/* Image Preview or Placeholder Box */}
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
              <input type="text" className="w-full p-2 rounded" />
            </div>
            <div>
              <label className="block text-white mb-1">Last Name</label>
              <input type="text" className="w-full p-2 rounded" />
            </div>
          </div>

          {/* Father's Name and Mother's Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-white mb-1">Father's Name</label>
              <input type="text" className="w-full p-2 rounded" />
            </div>
            <div>
              <label className="block text-white mb-1">Mother's Name</label>
              <input type="text" className="w-full p-2 rounded" />
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
              <select className="w-full p-2 rounded">
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
              <input type="email" className="w-full p-2 rounded" />
            </div>
            <div>
              <label className="block text-white mb-1">Mobile</label>
              <input type="tel" className="w-full p-2 rounded" />
            </div>
          </div>
          {/* 10th &12th result */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-white mb-1">10th Result</label>
              <input type="text" className="w-full p-2 rounded" />
            </div>
            <div>
              <label className="block text-white mb-1">12th Result</label>
              <input type="text" className="w-full p-2 rounded" />
            </div>
          </div>

          {/* Address */}
          <div className="mb-4">
            <label className="block text-white mb-1">Address</label>
            <textarea rows="3" className="w-full p-2 rounded"></textarea>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplyForm;
