import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const sampleCapsules = [
  {
    id: 1,
    title: "My 2023 Memories",
    createdAt: "2023-12-31",
    status: "Locked",
  },
  {
    id: 2,
    title: "Graduation Capsule",
    createdAt: "2024-05-15",
    status: "Unlocked",
  },
  {
    id: 3,
    title: "Future Letter",
    createdAt: "2025-01-01",
    status: "Locked",
  },
];

export default function Dashboard() {
  const [capsules, setCapsules] = useState(sampleCapsules);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // <-- initialize navigate here

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      navigate("/login"); // redirect to login if not logged in
    }
  }, [navigate]);

  // Filter capsules by search term
  const filteredCapsules = capsules.filter((capsule) =>
    capsule.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Welcome back, Aman!</h1>
        <p className="text-gray-600 mt-1">Here's your Digital Time Capsules</p>
      </header>

      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search capsules..."
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
          onClick={() => alert("Create New Capsule functionality coming soon!")}
        >
          + Create New Capsule
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredCapsules.length > 0 ? (
          filteredCapsules.map((capsule) => (
            <div
              key={capsule.id}
              className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold mb-2">{capsule.title}</h2>
              <p className="text-gray-500 mb-1">Created on: {capsule.createdAt}</p>
              <p
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  capsule.status === "Locked"
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {capsule.status}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No capsules found.</p>
        )}
      </div>
    </div>
  );
}
