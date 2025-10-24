import { useEffect, useState } from "react";

export function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Invalid JSON in localStorage. Clearing it...");
        localStorage.removeItem("user"); // 👈 clears the bad value
      }
    }
  }, []);

  return user;
}
