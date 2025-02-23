import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { signOut, onAuthStateChanged } from "firebase/auth";
import "./styles1.css";


const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Default profile picture
  const defaultProfilePic = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"; // Replace with your own default image URL

  // Check authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate("/login"); // Redirect to login if not authenticated
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // Logout function
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="dashboard-container">
  
      <h1>Welcome to the Dashboard!</h1>
      
      {user ? (
        <div className="user-info">
          <img 
            src={user.photoURL || defaultProfilePic} 
            alt="Profile" 
            width="100" 
            style={{ borderRadius: "50%" }} 
          />
          <h2>{user.displayName || "No Name Provided"}</h2>
          <p>Email: {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
};

export default Dashboard;
