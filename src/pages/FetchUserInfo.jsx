import React, { useState } from "react";
import { db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";

const FetchUserInfo = () => {
  const [email, setEmail] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUserInfo = async () => {
    setLoading(true);
    setError("");
    try {
      const docRef = doc(db, "attendances", `${email}`);
      console.log("Fetching document:", docRef);
      const docSnap = await getDoc(docRef);
      console.log("Document snapshot:", docSnap);
  
      if (docSnap.exists()) {
        setUserInfo(docSnap.data());
      } else {
        setError("No such document!");
      }
    } catch (err) {
      console.error("Error fetching document:", err);
      setError("Error fetching document: " + err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-[90vh] bg-[transparent] text-white flex items-center justify-center">
      <div className="bg-gray-800 shadow-lg rounded-lg p-8 max-w-md m-2 w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Fetch User Info</h1>
        <input
          type="email"
          placeholder="Enter user email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          onClick={fetchUserInfo}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-300"
        >
          Fetch Info
        </button>

        {loading && <p className="text-center mt-4">Loading...</p>}
        {error && <p className="text-center mt-4 text-red-500">{error}</p>}

        {userInfo && (
          <div className="mt-6 text-center">
            <h2 className="text-xl font-semibold">User Information:</h2>
            <p>Name: {userInfo.name}</p>
            <p>Email: {userInfo.email}</p>
            <p>Time: {userInfo.time}</p>
            {userInfo.imageUrl && (
              <img
                src={userInfo.imageUrl}
                alt="User"
                className="mx-auto border rounded-lg mt-4 shadow-lg"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FetchUserInfo;
