import React, { useState, useEffect } from "react";
import { db, auth } from "../firebaseConfig";
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  doc, 
  updateDoc, 
  getDoc 
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const SchoolCollegeComponent = () => {
  const [collegeName, setCollegeName] = useState("");
  const [officialEmail, setOfficialEmail] = useState("");
  const [driveLocation, setDriveLocation] = useState("");
  const [driveDate, setDriveDate] = useState("");
  const [driveGoal, setDriveGoal] = useState("");
  const [drives, setDrives] = useState([]);
  const [ecoPoints, setEcoPoints] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const citiesInMaharashtra = [
    "Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Solapur", "Amravati", "Kolhapur", 
    "Sangli", "Jalgaon", "Akola", "Latur", "Dhule", "Ahmednagar", "Chandrapur", "Parbhani", 
    "Beed", "Gondia", "Yavatmal", "Wardha", "Buldhana", "Hingoli", "Washim", "Nanded", 
    "Satara", "Ratnagiri", "Sindhudurg", "Raigad", "Bhandara", "Gadchiroli", "Nandurbar", 
    "Osmanabad", "Thane"
  ];

  useEffect(() => {
    const fetchDrivesAndPoints = async () => {
      const user = auth.currentUser;
      if (user) {
        const q = query(collection(db, "schoolDrives"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        setDrives(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));

        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setEcoPoints(userSnap.data().points || 0);
        }
      }
      setLoading(false);
    };

    fetchDrivesAndPoints();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) {
      alert("Please log in to organize a drive.");
      navigate("/login");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "schoolDrives"), {
        userId: user.uid,
        collegeName,
        officialEmail,
        driveLocation,
        driveDate,
        driveGoal,
        status: "pending",
        createdAt: new Date(),
      });

      const pointsEarned = 10;
      await updateEcoPoints(user.uid, pointsEarned);

      alert(`Drive organized successfully! You earned ${pointsEarned} EcoPoints.`);

      setCollegeName("");
      setOfficialEmail("");
      setDriveLocation("");
      setDriveDate("");
      setDriveGoal("");

      setDrives((prev) => [
        ...prev,
        { id: docRef.id, collegeName, officialEmail, driveLocation, driveDate, driveGoal, status: "pending" },
      ]);
    } catch (error) {
      console.error("Error organizing drive:", error);
      alert("An error occurred while organizing the drive.");
    }
  };

  const updateEcoPoints = async (userId, pointsEarned) => {
    const userRef = doc(db, "users", userId);
    try {
      const userSnap = await getDoc(userRef);
      const newPoints = (userSnap.data().points || 0) + pointsEarned;
      await updateDoc(userRef, { points: newPoints });
      setEcoPoints(newPoints);
    } catch (error) {
      console.error("Error updating EcoPoints:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div style={styles.container}>
      <style>
        {`
          body {
            font-family: 'Arial', sans-serif;
            background-color: #f0fff0;
          }
          .form-input, .form-select {
            width: 100%;
            padding: 12px;
            border: 2px solid #2d6a4f;
            border-radius: 8px;
            font-size: 16px;
            background-color: #f0fff0;
            outline: none;
          }
          .form-input:focus, .form-select:focus {
            border-color: #1b4332;
          }
          .form-button {
            width: 100%;
            padding: 12px;
            background-color: #2d6a4f;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            transition: 0.3s;
          }
          .form-button:hover {
            background-color: #1b4332;
          }
          .card {
            padding: 20px;
            margin: 15px 0;
            border-radius: 10px;
            background: white;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            border-left: 5px solid #2d6a4f;
            transition: transform 0.2s ease-in-out;
          }
          .card:hover {
            transform: scale(1.02);
          }
          .section-title {
            font-size: 22px;
            font-weight: bold;
            color: #1b4332;
            text-align: center;
            margin-bottom: 15px;
          }
        `}
      </style>

      <h1 style={styles.title}>🌿 School & College E-Waste Drives</h1>

      <div style={styles.section}>
        <h2 className="section-title">Organize a Drive</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input type="text" placeholder="College Name" value={collegeName} onChange={(e) => setCollegeName(e.target.value)} required className="form-input" />
          <input type="email" placeholder="Official Email" value={officialEmail} onChange={(e) => setOfficialEmail(e.target.value)} required className="form-input" />
          <select value={driveLocation} onChange={(e) => setDriveLocation(e.target.value)} required className="form-select">
            <option value="">Select Location</option>
            {citiesInMaharashtra.map(city => <option key={city} value={city}>{city}</option>)}
          </select>
          <input type="date" value={driveDate} onChange={(e) => setDriveDate(e.target.value)} required className="form-input" />
          <input type="number" placeholder="Goal (in kg)" value={driveGoal} onChange={(e) => setDriveGoal(e.target.value)} required className="form-input" />
          <button type="submit" className="form-button">Organize Drive</button>
        </form>
      </div>

      <div style={styles.section}>
        <h2 className="section-title">Your Drives</h2>
        {drives.map((drive) => (
          <div key={drive.id} className="card">
            <p><strong>College Name:</strong> {drive.collegeName}</p>
            <p><strong>Location:</strong> {drive.driveLocation}</p>
            <p><strong>Date:</strong> {new Date(drive.driveDate).toLocaleDateString()}</p>
            <p><strong>Goal:</strong> {drive.driveGoal} kg</p>
            <p><strong>Status:</strong> {drive.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { padding: "20px", maxWidth: "600px", margin: "auto" },
  title: { fontSize: "28px", fontWeight: "bold", textAlign: "center", color: "#1b4332" },
  section: { marginTop: "20px" },
  form: { display: "flex", flexDirection: "column", gap: "12px" },
};

export default SchoolCollegeComponent;
