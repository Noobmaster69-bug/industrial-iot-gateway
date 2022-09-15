import { createContext } from "react";
import { useState, useEffect, useContext } from "react";
const User = createContext();
export const useUser = () => useContext(User);
export function UserProvider({ children }) {
  const [user, setUser] = useState({ token: undefined });
  return <User.Provider value={{ performance }} children={children} />;
}
