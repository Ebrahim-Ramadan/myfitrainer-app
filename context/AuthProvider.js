"use client";
import { useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Default to false initially
  const [isClient, setIsClient] = useState(false); // To track client-side rendering

  useEffect(() => {
    setIsClient(true); // Mounted, now client-side
    const loggedInStatus = localStorage.getItem("isLoggedIn") === "false";
    setIsLoggedIn(loggedInStatus);
  }, []);

  useEffect(() => {
    if (isClient) { // Only execute this on the client side
      localStorage.setItem("isLoggedIn", isLoggedIn);
    }
  }, [isLoggedIn]);

  const loginFn = () => setIsLoggedIn(true);
  const logoutFn = () => setIsLoggedIn(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, loginFn, logoutFn }}>
      {children}
    </AuthContext.Provider>
  );
}