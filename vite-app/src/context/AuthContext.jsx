import { createContext, useState } from "react";

export const AuthContext = createContext();

const initialUsers = [
  { username: "admin", password: "admin123", role: "admin" },
  { username: "librarian", password: "lib123", role: "librarian" },
];

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(initialUsers);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState("");

  // LOGIN
  const login = (username, password) => {
    const validUser = users.find(
      (u) => u.username === username && u.password === password
    );

    if (validUser) {
      setIsLoggedIn(true);
      setCurrentUser(validUser);   // ✅ THIS IS IMPORTANT
      setError("");
      return true;
    } else {
      setError("Invalid credentials");
      return false;
    }
  };

  // LOGOUT
  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);          // ✅ CLEAR USER
  };

  // REGISTER
  const register = (username, password) => {
    const userExists = users.some((u) => u.username === username);

    if (userExists) {
      return false;
    }

    setUsers([...users, { username, password, role: "user" }]);
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        currentUser,   // ✅ exposed
        login,
        logout,
        register,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
