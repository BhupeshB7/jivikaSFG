import React, { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css'; // Ensure Tailwind CSS is imported
import BackButton from '../components/BackButton';
import { useSelector } from 'react-redux';
import { db } from '../config/firebase';
import { ref, onValue } from 'firebase/database';

const ITEMS_PER_PAGE = 10;

const TotalAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const user = useSelector((state) => state.user?.user);

  useEffect(() => {
    if (user?.email) {
      const attendanceRef = ref(db, 'attendances'); // Update path as needed

      const unsubscribe = onValue(attendanceRef, (snapshot) => {
        setLoading(false); // Stop loading spinner when data is fetched

        const data = snapshot.val();
        if (data) {
          const userAttendance = Object.values(data).filter(
            (item) => item.email === user.email
          );

          const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
          const paginatedAttendance = userAttendance.slice(startIndex, startIndex + ITEMS_PER_PAGE);

          setAttendance(paginatedAttendance);
          setTotalPages(Math.ceil(userAttendance.length / ITEMS_PER_PAGE));
        } else {
          setAttendance([]);
        }
      }, (error) => {
        setLoading(false); // Stop loading spinner on error
        setError('Failed to load attendance records.');
      });

      // Cleanup subscription on unmount
      return () => unsubscribe();
    } else {
      setLoading(false);
    }
  }, [user?.email, currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
       <h1 className="text-2xl text-white"> Loading...</h1>
      </div>
    );
  }

  return (
    <div className='mt-24'>
      <BackButton />
      <div className="min-h-screen bg-[transparent] text-white p-6 md:w-[60%] md:mx-auto">
        <div className="container mx-auto bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Attendance Records</h2>
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : attendance.length === 0 ? (
            <p className="text-gray-400">No records found.</p>
          ) : (
            <>
              <table className="min-w-full bg-gray-700 border border-gray-600 rounded-lg">
                <thead className="bg-gray-600 border-b border-gray-500">
                  <tr>
                    <th className="py-2 px-4 text-center">Name</th>
                    <th className="py-2 px-4 text-center">Date</th>
                    <th className="py-2 px-4 text-center">Image</th>
                  </tr>
                </thead>
                <tbody>
                  {attendance.map((entry, index) => (
                    <tr key={index} className="hover:bg-gray-600">
                      <td className="py-2 px-4 text-center">{user.name}</td>
                      <td className="py-2 px-4 text-center">{entry.time}</td>
                      <td className="py-2 px-4 text-center">
                        <img
                          src={entry.imageUrl}
                          alt="Attendance"
                          className="border rounded-lg shadow-md"
                          width={100}
                          height={75}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                  Previous
                </button>
                <span className="self-center">{`Page ${currentPage} of ${totalPages}`}</span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TotalAttendance;
