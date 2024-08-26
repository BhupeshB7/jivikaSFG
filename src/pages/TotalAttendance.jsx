import React from 'react';
import 'tailwindcss/tailwind.css'; // Ensure Tailwind CSS is imported

// Utility function to get the last 7 days
const getLastSevenDays = () => {
  const today = new Date();
  const dates = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    dates.push(date.toISOString().split('T')[0]); // Format as YYYY-MM-DD
  }

  return dates;
};

// Sample attendance data
const sampleAttendanceData = (date) => {
  // Randomly return true or false for attendance
  return Math.random() > 0.5;
};

const TotalAttendance = () => {
  const dates = getLastSevenDays();
  const attendance = dates.map(date => ({
    date,
    present: sampleAttendanceData(date) // Randomly generating attendance status
  }));

  return (
    <div className="min-h-screen bg-[transparent] text-white p-6 md:w-[60%] md:mx-auto">
      <div className="container mx-auto bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Last 7 Days Attendance</h2>
        <table className="min-w-full bg-gray-700 border border-gray-600 rounded-lg">
          <thead className="bg-gray-600 border-b border-gray-500">
            <tr>
              <th className="py-2 px-4 text-center">Date</th>
              <th className="py-2 px-4 text-center">Attendance</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((entry, index) => (
              <tr key={index} className="hover:bg-gray-600">
                <td className="py-2 px-4 text-center">{entry.date}</td>
                <td className="py-2 px-4 text-center">
                  {entry.present ? (
                    <span className="text-green-400">✔️</span>
                  ) : (
                    <span className="text-red-400">❌</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TotalAttendance;
