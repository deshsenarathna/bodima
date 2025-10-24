const API_URL = 'http://localhost:8080/api/auth';

// Register
export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  return response.json();
};

// Login
export const loginUser = async (loginData) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loginData),
  });
  return response; // since backend returns plain string
};
