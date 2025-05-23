import React from "react";
import { useNavigate } from "react-router-dom";

export default function ViewCapsule({ capsule }) {
  const navigate = useNavigate();

  if (!capsule) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">No capsule selected.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-lg w-full">
        <h1 className="text-3xl font-bold mb-4">{capsule.title}</h1>
        <p className="text-gray-600 mb-2">
          Created on:{" "}
          <span className="font-medium">{capsule.createdAt}</span>
        </p>
        <p
          className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${
            capsule.status === "Locked"
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {capsule.status}
        </p>

        {/* Placeholder for capsule content/details */}
        <p className="text-gray-700">
          This is where your capsule contents or message will be displayed.
        </p>

        <button
          onClick={() => navigate(-1)}
          className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Back
        </button>
      </div>
    </div>
  );
}
