import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

const STORAGE_KEY = "ai_resume_user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Keep localStorage in sync if user changes
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (err) {
      console.error("Failed to update localStorage:", err);
    }
  }, [user]);

  // Login handler
  const login = async (email, password) => {
    setLoading(true);
    try {
      // Simulate API network latency for realistic UX
      await new Promise((resolve) => setTimeout(resolve, 600));

      if (!email || !password) {
        throw new Error("Please enter both email and password.");
      }

      // Format user details
      const userData = {
        email,
        name: email.split("@")[0],
        token: "mock-jwt-" + Date.now(),
      };

      setUser(userData);
      return { success: true, user: userData };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Signup handler
  const signup = async (name, email, password) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));

      if (!name || !email || !password) {
        throw new Error("Please fill in all required fields.");
      }

      const userData = {
        name,
        email,
        token: "mock-jwt-" + Date.now(),
      };

      // Store in users list in localStorage if useful
      const registeredUsers = JSON.parse(localStorage.getItem("ai_resume_registered_users") || "[]");
      registeredUsers.push({ name, email });
      localStorage.setItem("ai_resume_registered_users", JSON.stringify(registeredUsers));

      return { success: true, user: userData };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Logout handler
  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const value = {
    user,
    isAuthenticated: Boolean(user),
    loading,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
