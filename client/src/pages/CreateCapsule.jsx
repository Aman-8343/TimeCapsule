import React, { useState } from "react";
import axios from "axios";






export default function CreateCapsule({ onCreate }) {
  const [title, setTitle] = useState("");
  const [createdAt, setCreatedAt] = useState(() =>
    new Date().toISOString().split("T")[0]
  ); // default today’s date

const token = localStorage.getItem("token");

axios.post(
  "/api/capsules",
  {
    title,
    createdAt: new Date().toISOString(),
    status: "Locked",
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
)
.then((res) => {
  console.log("Capsule created:", res.data);
  // Optionally navigate to dashboard or refresh list
})
.catch((err) => {
  console.error("Failed to create capsule", err);
});




  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter a title");
      return;
    }

    const newCapsule = {
      id: Date.now(), // simple unique id for demo
      title: title.trim(),
      createdAt,
      status: "Locked",
    };

    onCreate(newCapsule);

    // Clear form
    setTitle("");
    setCreatedAt(new Date().toISOString().split("T")[0]);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md max-w-md mx-auto"
    >
      <h2 className="text-xl font-bold mb-4">Create New Capsule</h2>

      <label className="block mb-2 font-medium" htmlFor="title">
        Capsule Title
      </label>
      <input
        id="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter capsule title"
        className="w-full px-4 py-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <label className="block mb-2 font-medium" htmlFor="createdAt">
        Created At
      </label>
      <input
        id="createdAt"
        type="date"
        value={createdAt}
        onChange={(e) => setCreatedAt(e.target.value)}
        className="w-full px-4 py-2 border rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Create Capsule
      </button>
    </form>
  );
}
