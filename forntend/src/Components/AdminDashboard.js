import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import emailjs from "emailjs-com";

const AdminDashboard = () => {
  const [pickupRequests, setPickupRequests] = useState([]);
  const [schoolDrives, setSchoolDrives] = useState([]);

  // Fetch all pickup requests and school drives
  useEffect(() => {
    const fetchData = async () => {
      const pickupSnapshot = await getDocs(collection(db, "pickupRequests"));
      const schoolSnapshot = await getDocs(collection(db, "schoolDrives"));

      setPickupRequests(pickupSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setSchoolDrives(schoolSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchData();
  }, []);

  // Update request status and send email
  const handleRequestAction = async (id, action, email, type) => {
    try {
      const collectionName = type === "pickup" ? "pickupRequests" : "schoolDrives";
      const docRef = doc(db, collectionName, id);
      let updatedStatus = "";

      if (action === "accept") {
        const schedule = prompt("Enter pickup schedule (e.g., 10 AM, 15th Oct):");
        if (schedule) {
          updatedStatus = "scheduled";
          await updateDoc(docRef, { status: updatedStatus, schedule });
          sendEmail(email, `Your request has been scheduled: ${schedule}`);
          alert("Pickup scheduled successfully!");
        }
      } else if (action === "reject") {
        updatedStatus = "rejected";
        await updateDoc(docRef, { status: updatedStatus });
        alert("Request rejected.");
      } else if (action === "completed") {
        updatedStatus = "completed";
        await updateDoc(docRef, { status: updatedStatus });
        sendEmail(email, "Your request has been completed. Thank you!");
        alert("Request marked as completed.");
      }

      // Update UI
      if (type === "pickup") {
        setPickupRequests((prev) =>
          prev.map((request) => (request.id === id ? { ...request, status: updatedStatus } : request))
        );
      } else {
        setSchoolDrives((prev) =>
          prev.map((drive) => (drive.id === id ? { ...drive, status: updatedStatus } : drive))
        );
      }
    } catch (error) {
      console.error("Error updating status: ", error);
    }
  };

  // Send email using EmailJS
  const sendEmail = (email, message) => {
    const templateParams = {
      to_email: email,
      message,
    };

    emailjs
      .send("service_qidaoub", "template_bxsb8ii", templateParams, "VRqo0Y-Y1chv1IDHc")
      .then((response) => console.log("Email sent:", response))
      .catch((error) => console.error("Email error:", error));
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          .card {
            padding: 15px;
            margin: 15px 0;
            border-radius: 8px;
            background: white;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            border-left: 5px solid #2d6a4f;
            transition: transform 0.2s ease-in-out;
          }
          .card:hover {
            transform: scale(1.02);
          }
          .button {
            margin: 5px;
            padding: 8px 12px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
          }
          .accept-btn { background-color: #28a745; color: white; }
          .reject-btn { background-color: #dc3545; color: white; }
          .complete-btn { background-color: #007bff; color: white; }
        `}
      </style>

      <h1 style={styles.title}>🛠️ Admin Dashboard</h1>

      {/* Pickup Requests */}
      <div style={styles.section}>
        <h2>🚛 Pickup Requests</h2>
        {pickupRequests.map((request) => (
          <div key={request.id} className="card">
            <p><strong>User ID:</strong> {request.userId}</p>
            <p><strong>Location:</strong> {request.pickupLocation}</p>
            <p><strong>Waste Type:</strong> {request.wasteType}</p>
            <p><strong>Quantity:</strong> {request.quantity}</p>
            <p><strong>Status:</strong> {request.status}</p>

            {request.status === "pending" && (
              <>
                <button className="button accept-btn" onClick={() => handleRequestAction(request.id, "accept", request.userId, "pickup")}>
                  Accept
                </button>
                <button className="button reject-btn" onClick={() => handleRequestAction(request.id, "reject", request.userId, "pickup")}>
                  Reject
                </button>
              </>
            )}
            {request.status === "scheduled" && (
              <>
                <p><strong>Scheduled:</strong> {request.schedule}</p>
                <button className="button complete-btn" onClick={() => handleRequestAction(request.id, "completed", request.userId, "pickup")}>
                  Mark as Completed
                </button>
              </>
            )}
          </div>
        ))}
      </div>

      {/* School/College Drives */}
      <div style={styles.section}>
        <h2>🏫 School/College Drives</h2>
        {schoolDrives.map((drive) => (
          <div key={drive.id} className="card">
            <p><strong>College Name:</strong> {drive.collegeName}</p>
            <p><strong>Official Email:</strong> {drive.officialEmail}</p>
            <p><strong>Location:</strong> {drive.driveLocation}</p>
            <p><strong>Goal:</strong> {drive.driveGoal} kg</p>
            <p><strong>Status:</strong> {drive.status}</p>

            {drive.status === "pending" && (
              <>
                <button className="button accept-btn" onClick={() => handleRequestAction(drive.id, "accept", drive.officialEmail, "school")}>
                  Accept
                </button>
                <button className="button reject-btn" onClick={() => handleRequestAction(drive.id, "reject", drive.officialEmail, "school")}>
                  Reject
                </button>
              </>
            )}
            {drive.status === "scheduled" && (
              <>
                <p><strong>Scheduled:</strong> {drive.schedule}</p>
                <button className="button complete-btn" onClick={() => handleRequestAction(drive.id, "completed", drive.officialEmail, "school")}>
                  Mark as Completed
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { padding: "20px", maxWidth: "800px", margin: "auto" },
  title: { fontSize: "28px", fontWeight: "bold", textAlign: "center", color: "#1b4332" },
  section: { marginTop: "20px" },
};

export default AdminDashboard;
