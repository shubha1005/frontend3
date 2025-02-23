import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";
import Navbar from "./Components/Navbar";  
import Login from "./Components/Login";
// import EcoPoints from "./Components/EcoPoints";
// import Demo from "./Components/Demo";
import Dashboard from "./Components/Dashboard";
import Education from "./Components/Education";
import ProtectedRoute from "./Components/ProtectedRoute";
import Home from "./Components/Home";
import Chatbot from "./Components/Chatbot";
import Estimator from "./Components/Estimator";
import UserDashboard from "./Components/UserDashboard";
import AdminDashboard from "./Components/AdminDashboard";
import SchoolCollegeComponent from "./Components/SchoolCollegeComponent";
import RecyclingProgressBar from "./Components/RecyclingProgressBar";
import Eelection from "./Components/Eelection";
import Leaderboard from "./Components/Leaderboard";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("🔹 Auth State Changed: ", currentUser);  // Debugging user state
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        {user && <Navbar user={user} handleLogout={handleLogout} />}  {/* ✅ Ensure Navbar renders when user exists */}
        
        <Routes>
          <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
          {/* <Route path="/demo" element={<Demo />} /> */}
          <Route path="/education" element={<Education />} />
          <Route path="/home" element={<Home />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/estimator" element={<Estimator />} />
          <Route path="/UserDashboard" element={<UserDashboard />} />
          <Route path="/Admin" element={<AdminDashboard />} />
          <Route path="/scc" element={<SchoolCollegeComponent />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/status" element={<RecyclingProgressBar />} />
          <Route path="/Eselection" element={<Eelection />} />
          <Route path="/Leaderboard" element={<Leaderboard />} />
          
          
          {/* <Route path="/estimator" element={<Estimator />} /> */}
          
          <Route path="/dashboard" element={
            <ProtectedRoute user={user}>
              <Home />
            </ProtectedRoute>
          }/>
        </Routes>

      </div>
    </Router>
  );
}

export default App;
