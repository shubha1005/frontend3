import React, { useEffect, useState } from "react";
import { db, auth } from "../firebaseConfig"; // Firebase config
import { collection, query, where, onSnapshot } from "firebase/firestore"; // Firestore functions
import { onAuthStateChanged } from "firebase/auth"; // Firebase Authentication

const RecyclingProgressBar = () => {
  const [status, setStatus] = useState(null); // Track the status of the order
  const [userId, setUserId] = useState(null); // Track the logged-in user's ID
  const [hasBooking, setHasBooking] = useState(false); // Track if the user has a booking

  // Track user login state
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid); // Set the logged-in user's ID
      } else {
        setUserId(null);
        setStatus(null);
        setHasBooking(false);
      }
    });

    return () => unsubscribeAuth(); // Cleanup on unmount
  }, []);

  // Fetch order status from Firestore
  useEffect(() => {
    if (!userId) return;

    const q = query(collection(db, "pickupRequests"), where("userId", "==", userId));

    const unsubscribeFirestore = onSnapshot(q, (querySnapshot) => {
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        setStatus(doc.data().status);
        setHasBooking(true);
      } else {
        setStatus(null);
        setHasBooking(false);
      }
    });

    return () => unsubscribeFirestore(); // Cleanup on unmount
  }, [userId]);

  // Define progress stages
  const stages = [
    { id: 1, name: "Pending", statusKey: "pending" },
    { id: 2, name: "Scheduled", statusKey: "scheduled" },
    { id: 3, name: "Completed", statusKey: "completed" },
  ];

  // Find the active stage index
  const activeStageIndex = stages.findIndex((stage) => stage.statusKey === status);

  // Function to determine stage color based on status
  const getStageColor = (stageIndex) => {
    if (stageIndex <= activeStageIndex) {
      switch (stages[stageIndex].statusKey) {
        case "pending":
          return "#ff4d4d"; // Red
        case "scheduled":
          return "#ffcc00"; // Yellow
        case "completed":
          return "#4caf50"; // Green
        default:
          return "#e0e0e0"; // Grey
      }
    }
    return "#e0e0e0"; // Grey for inactive stages
  };

  // Define styles
  const styles = {
    container: {
      textAlign: "center",
      margin: "20px auto",
      maxWidth: "600px",
      paddingTop: "100px",
    },
    progressBarContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      position: "relative",
      margin: "20px 0",
    },
    stage: {
      flex: 1,
      height: "10px",
      borderRadius: "5px",
      margin: "0 2px",
      transition: "background-color 0.3s ease",
    },
    stageName: {
      display: "block",
      marginTop: "10px",
      fontSize: "0.9rem",
      color: "#333",
      textAlign: "center",
    },
  };

  // If the user is not logged in
  if (!userId) {
    return <div style={styles.container}>Please log in to view your delivery progress.</div>;
  }

  // If the user has no bookings
  if (!hasBooking) {
    return <div style={styles.container}>You have no bookings.</div>;
  }

  return (
    <div style={styles.container}>
      <h3>Delivery Progress</h3>
      <div style={styles.progressBarContainer}>
        {stages.map((stage, index) => (
          <div key={stage.id} style={{ ...styles.stage, backgroundColor: getStageColor(index) }}>
            <span style={styles.stageName}>{stage.name}</span>
          </div>
        ))}
      </div>
      <p>Current Status: {status ? status.toUpperCase() : "N/A"}</p>
    </div>
  );
};

export default RecyclingProgressBar;
