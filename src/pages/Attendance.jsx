import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';

const Attendance = () => {
  const [attendance, setAttendance] = useState(0); // Default 0
  const [image, setImage] = useState(null);
  const [currentTime, setCurrentTime] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const webcamRef = useRef(null);

  useEffect(() => {
    const storedImage = localStorage.getItem('capturedImage');
    const storedTime = localStorage.getItem('captureTime');
    const expiryTime = localStorage.getItem('expiryTime');

    const now = new Date().getTime();

    if (storedImage && storedTime && expiryTime && now < expiryTime) {
      setImage(storedImage);
      setCurrentTime(storedTime);
      setAttendance(1);
    } else {
      localStorage.removeItem('capturedImage');
      localStorage.removeItem('captureTime');
      localStorage.removeItem('expiryTime');
    }
  }, []);

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const time = new Date().toLocaleTimeString();

    setImage(imageSrc);
    setCurrentTime(time);
    setAttendance(1);
    setIsModalOpen(true);

    const now = new Date();
    const expiryTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59).getTime();

    localStorage.setItem('capturedImage', imageSrc);
    localStorage.setItem('captureTime', time);
    localStorage.setItem('expiryTime', expiryTime);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-[90vh] bg-[transparent] text-white flex items-center justify-center ">
      <div className="bg-gray-800 shadow-lg rounded-lg p-8 max-w-md m-2 w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Attendance Capture</h1>
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
            <img src={image} alt="Captured" className="mx-auto border rounded-lg mt-4 shadow-lg" />
            <h2 className="mt-4 text-lg font-semibold">Time: {currentTime}</h2>
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white text-gray-900 rounded-lg shadow-lg p-8 max-w-sm w-full">
              <h2 className="text-xl font-bold mb-4">Attendance Successfully Captured</h2>
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
