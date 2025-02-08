import React, { createContext, useState, useEffect } from 'react';

// Create a context for user management
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]); // Stores all users
  const [loggedInUser, setLoggedInUser] = useState(null); // Stores the currently logged-in user
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Tracks if a user is logged in.

  // Fetch users from local storage or any other source
  useEffect(() => {
    // Initially, you can load users from some initial source if needed
    // For now, we'll keep this empty or untill we have some localstorage or cloud based storage like MongoDb.
  }, []);

  // Login function (uses email and password.)
  const login = (email, password) => {
    const user = users.find((user) => user.email === email && user.password === password);
    if (user) {
      setLoggedInUser(user);
      setIsLoggedIn(true); // Mark user as logged in
    } else {
      alert("Invalid email or password!");
    }
  };

  // Signup function (stores new user with email and password)
  const signup = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
    setLoggedInUser(newUser);  // Log in the user immediately after signup
    setIsLoggedIn(true); // Mark user as logged in
  };

  // Logout function (clears logged-in user)
  const logout = () => {
    setLoggedInUser(null);   // Clear the current logged-in user
    setIsLoggedIn(false);    // Mark the user as logged out
  };

  return (
    <UserContext.Provider value={{ users, loggedInUser, isLoggedIn, login, signup, logout }}>
      {children}
    </UserContext.Provider>
  );
};
