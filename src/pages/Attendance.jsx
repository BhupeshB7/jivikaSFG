import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import Webcam from "react-webcam";
import { db, storage } from "../config/firebase";
import { ref as storageRef, uploadString, getDownloadURL } from "firebase/storage";
import { ref as databaseRef, set } from "firebase/database";

const Attendance = () => {
  const [attendance, setAttendance] = useState(0);
  const [image, setImage] = useState(null);
  const [currentTime, setCurrentTime] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const webcamRef = useRef(null);
  const user = useSelector((state) => state.user?.user);

  useEffect(() => {
    const storedImage = localStorage.getItem("capturedImage");
    const storedTime = localStorage.getItem("captureTime");
    const expiryTime = localStorage.getItem("expiryTime");

    const now = new Date().getTime();

    if (storedImage && storedTime && expiryTime && now < expiryTime) {
      setImage(storedImage);
      setCurrentTime(storedTime);
      setAttendance(1);
    } else {
      localStorage.removeItem("capturedImage");
      localStorage.removeItem("captureTime");
      localStorage.removeItem("expiryTime");
    }
  }, []);

  const captureImage = async () => {
    try {
      const imageSrc = webcamRef.current.getScreenshot();
      const time = new Date().toLocaleTimeString();
      const now = new Date();
      const expiryTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59).getTime();

      setImage(imageSrc);
      setCurrentTime(time);
      setAttendance(1);
      setIsModalOpen(true);

      localStorage.setItem("capturedImage", imageSrc);
      localStorage.setItem("captureTime", time);
      localStorage.setItem("expiryTime", expiryTime);

      const storageReference = storageRef(
        storage,
        `attendance_images/${user.name}_${now.getTime()}.jpg`
      );
      await uploadString(storageReference, imageSrc, "data_url");

      const downloadURL = await getDownloadURL(storageReference);

      const docData = {
        name: user.name,
        email: user.email,
        time: now.toLocaleString(),
        imageUrl: downloadURL,
        attendance: 1,
      };

      // Store data in Firebase Realtime Database
      const attendanceRef = databaseRef(
        db,
        `attendances/${user.email.replace('.', '_')}_${now.getTime()}`
      );
      await set(attendanceRef, docData);

      console.log("Data stored in Firebase Realtime Database");
    } catch (error) {
      console.error("Error capturing image and storing data:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-[90vh] bg-[transparent] text-white flex items-center justify-center">
      <div className="bg-gray-800 shadow-lg rounded-lg p-8 max-w-md m-2 w-full">
        <h1 className="text-xl font-bold mb-6 text-center text-gray-400">
          Attendance Capture for <strong className="text-gray-200">{user.name}</strong> 
        </h1> 
        {attendance === 0 ? (
          <div className="flex justify-center mb-4">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="border rounded-lg shadow-md"
              width={320}
              height={240}
            />
          </div>
        ) : (
          <div className="text-center text-lg font-semibold text-green-500">
            Attendance Done
          </div>
        )}
        <div className="flex justify-center mt-4">
          {attendance === 0 && (
            <button
              onClick={captureImage}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-300"
            >
              Capture Image
            </button>
          )}
        </div>

        {image && (
          <div className="mt-6 text-center">
            <h2 className="text-xl font-semibold">Captured Image:</h2>
            <img
              src={image}
              alt="Captured"
              className="mx-auto border rounded-lg mt-4 shadow-lg"
            />
            <h2 className="mt-4 text-lg font-semibold">Time: {currentTime}</h2>
          </div>
        )}

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white text-gray-900 rounded-lg shadow-lg p-8 max-w-sm w-full">
              <h2 className="text-xl font-bold mb-4">
                Attendance Successfully Captured
              </h2>
              <button
                onClick={closeModal}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-300"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Attendance;
