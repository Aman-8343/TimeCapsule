import { useState } from "react";
import { loginUser } from "./services/authService";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await loginUser(credentials);
    if (res.token) {
      localStorage.setItem("token", res.token);
      navigate("/dashboard");
    } else {
      alert(res.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input type="email" name="email" onChange={handleChange} placeholder="Email" className="mb-2 w-full p-2 border" required />
        <input type="password" name="password" onChange={handleChange} placeholder="Password" className="mb-2 w-full p-2 border" required />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 w-full">Login</button>
      </form>
    </div>
  );
}
