const API_URL = "http://localhost:5000/api/auth"; 

export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  return await response.json();
};

export const loginUser = async (credentials) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json(); 
    throw new Error(errorData.message || "Login failed");
  }

  // Log credentials safely (optional)
  console.log("Credentials sent:", credentials);

  return await response.json();
};
