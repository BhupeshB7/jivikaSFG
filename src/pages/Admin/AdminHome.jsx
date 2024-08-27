import React, { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../../../server";

const AdminHome = () => {
  const [users, setUsers] = useState([]);
  const [forms, setForms] = useState([]);
  const [userPage, setUserPage] = useState(1);
  const [formPage, setFormPage] = useState(1);
  const [userTotalPages, setUserTotalPages] = useState(1);
  const [formTotalPages, setFormTotalPages] = useState(1);

  // Fetch users from backend
  const fetchUsers = async (page) => {
    try {
      const response = await axios.get(
        `${URL}/api/users?page=${page}&limit=10`
      );
      setUsers(response.data.users);
      setUserTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Fetch forms from backend
  const fetchForms = async (page) => {
    try {
      const response = await axios.get(
        `${URL}/api/forms?page=${page}&limit=10`
      );
      setForms(response.data.forms);
      setFormTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching forms:", error);
    }
  };

  useEffect(() => {
    fetchUsers(userPage);
    fetchForms(formPage);
  }, [userPage, formPage]);

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      {/* Left Side: Payment History */}
      <div className="w-full md:w-1/4 bg-gray-800 text-white p-4">
        <h2 className="text-lg font-semibold">Payment History</h2>
        <p className="mt-2">
          This section is for tracking payments made to the organization.
        </p>
      </div>

      {/* Right Side: Users and Forms */}
      <div className="w-full md:w-3/4 bg-gray-900 p-4">
        {/* Users Section */}
        <div className="mb-8 bg-gray-800 text-white p-3 rounded-md">
          <h2 className="text-lg font-semibold text-gray-200">All Employees</h2>
          <div className="mt-4">
            {users.length === 0 ? (
              <p className="text-gray-400">No Employees found.</p>
            ) : (
              <>
                <ul>
                  {users.map((user) => (
                    <li
                      key={user._id}
                      className="py-4 border-b border-gray-300"
                    >
                      <div className="flex items-center gap-4">
                        {user.profile ? (
                          <img
                            src={user.profile}
                            alt={`${user.name}'s profile`}
                            className="w-16 h-16 object-cover rounded-full"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-white">
                            No Image
                          </div>
                        )}
                        <div>
                          <div className="font-semibold">{user.name}</div>
                          <div>Email: {user.email}</div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                {userTotalPages > 0 && (
                  <div className="mt-4 flex justify-between">
                    <button
                      onClick={() =>
                        setUserPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={userPage === 1}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Previous
                    </button>
                    <span>
                      Page {userPage} of {userTotalPages}
                    </span>
                    <button
                      onClick={() =>
                        setUserPage((prev) =>
                          Math.min(prev + 1, userTotalPages)
                        )
                      }
                      disabled={userPage === userTotalPages}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Forms Section */}
        <div className="mt-4 bg-gray-800 text-white p-3 rounded-md">
          <h2 className="text-lg font-semibold text-gray-200">
            Application Forms
          </h2>
          <div className="mt-4">
            {forms.length === 0 ? (
              <p className="text-gray-400">No application forms found.</p>
            ) : (
              <>
                <ul>
                  {forms.map((form) => (
                    <li
                      key={form._id}
                      className="py-4 border-b border-gray-300"
                    >
                      <div className="font-semibold">
                        Name: {form.firstName} {form.lastName}
                      </div>
                      <div>Email: {form.email}</div>
                      <div>Mobile: {form.mobile}</div>
                      <div>Father's Name: {form.fatherName}</div>
                      <div>Mother's Name: {form.motherName}</div>
                      <div>Gender: {form.gender}</div>
                      <div>
                        Date of Birth: {new Date(form.dob).toLocaleDateString()}
                      </div>
                      <div>Age: {form.age}</div>
                      <div>Address: {form.address}</div>
                      <div>Tenth Result: {form.tenthResult}</div>
                      <div>Twelfth Result: {form.twelfthResult}</div>
                      <div>
                        Image:{" "}
                        {form.imageUrl ? (
                          <img
                            src={form.imageUrl}
                            alt="Form Image"
                            className="w-32 h-32 object-cover"
                          />
                        ) : (
                          "No Image"
                        )}
                      </div>
                      <div>
                        Terms Accepted: {form.termsAccepted ? "Yes" : "No"}
                      </div>
                    </li>
                  ))}
                </ul>
                {formTotalPages > 1 && (
                  <div className="mt-4 flex justify-between">
                    <button
                      onClick={() =>
                        setFormPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={formPage === 1}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Previous
                    </button>
                    <span>
                      Page {formPage} of {formTotalPages}
                    </span>
                    <button
                      onClick={() =>
                        setFormPage((prev) =>
                          Math.min(prev + 1, formTotalPages)
                        )
                      }
                      disabled={formPage === formTotalPages}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
