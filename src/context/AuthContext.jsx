import { createContext, useState } from "react";
import bcrypt from "bcryptjs";

// Buat context
export const AuthContext = createContext();

// Buat provider context
export default function AuthProvider({ children }) {
  //   State untuk prop drilling
  const [users, setUsers] = useState(() => {
    return JSON.parse(localStorage.getItem("users")) || [];
  });
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("currentUser");
    return saved ? JSON.parse(saved) : null;
  });

  // Register
  const register = (name, username, password) => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    const nameExists = storedUsers.some((user) => user.name === name);
    const userNameExists = storedUsers.some(
      (user) => user.username === username,
    );

    if (nameExists) throw new Error("Name already in taken!");
    if (userNameExists) throw new Error("Username already in taken!");

    // Hash password dengan bcryptjs
    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = {
      id: Date.now(),
      name,
      username,
      password: hashedPassword,
    };

    //   Update ke array
    const updatedUsers = [...storedUsers, newUser];

    // Masukkan ke localstorage
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };

  const login = (username, password) => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const findUser = storedUsers.find((user) => user.username === username);
    if (!findUser) throw new Error("Username not found!");

    const isMatch = bcrypt.compareSync(password, findUser.password);
    if (!isMatch) throw new Error("Wrong password!");

    localStorage.setItem("currentUser", JSON.stringify(findUser));
    setCurrentUser(findUser);
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ users, currentUser, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
