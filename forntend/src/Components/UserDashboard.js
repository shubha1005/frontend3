import React, { useState, useEffect } from "react";
import { db, auth } from "../firebaseConfig";
import { collection, addDoc, query, where, getDocs, doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [wasteType, setWasteType] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [quantity, setQuantity] = useState("");
  const [requests, setRequests] = useState([]);
  const [ecoPoints, setEcoPoints] = useState(0);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequestsAndPoints = async () => {
      const user = auth.currentUser;
      if (user) {
        setUser(user);

        const q = query(collection(db, "pickupRequests"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        setRequests(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));

        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setEcoPoints(userSnap.data().points || 0);
        } else {
          await setDoc(userRef, { email: user.email, points: 0 });
        }
      }
      setLoading(false);
    };

    fetchRequestsAndPoints();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) {
      alert("Please log in to submit a request.");
      navigate("/login");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "pickupRequests"), {
        userId: user.uid,
        pickupLocation,
        wasteType,
        brand,
        model,
        quantity,
        status: "pending",
        createdAt: new Date(),
      });

      let pointsEarned = wasteType === "fridge" ? 50 : wasteType === "mobile" ? 20 : wasteType === "tv" ? 30 : 10;
      await updateEcoPoints(user.uid, pointsEarned);

      alert(`Pickup request submitted! You earned ${pointsEarned} EcoPoints.`);

      setPickupLocation("");
      setWasteType("");
      setBrand("");
      setModel("");
      setQuantity("");
      setRequests([...requests, { id: docRef.id, pickupLocation, wasteType, brand, model, quantity, status: "pending" }]);
    } catch (error) {
      console.error("Error submitting request:", error);
      alert("An error occurred while submitting the request.");
    }
  };

  const updateEcoPoints = async (userId, pointsEarned) => {
    const userRef = doc(db, "users", userId);
    try {
      const userSnap = await getDoc(userRef);
      
      let userData = userSnap.exists() ? userSnap.data() : {};
      let newPoints = (userData.points || 0) + pointsEarned;

      await setDoc(userRef, { email: auth.currentUser.email, points: newPoints }, { merge: true });

      setEcoPoints(newPoints);
    } catch (error) {
      console.error("Error updating EcoPoints:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🌿 User Dashboard</h1>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Submit Pickup Request</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input type="text" placeholder="Location" value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)} required style={styles.input} />
          <select value={wasteType} onChange={(e) => setWasteType(e.target.value)} required style={styles.input}>
            <option value="">Select Waste Type</option>
            <option value="fridge">Fridge</option>
            <option value="mobile">Mobile</option>
            <option value="tv">TV</option>
            <option value="laptop">Laptop</option>
            <option value="batteries">Batteries</option>
          </select>
          <input type="text" placeholder="Brand" value={brand} onChange={(e) => setBrand(e.target.value)} required style={styles.input} />
          <input type="text" placeholder="Model" value={model} onChange={(e) => setModel(e.target.value)} required style={styles.input} />
          <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} required style={styles.input} />
          <button type="submit" style={styles.button}>Submit Request</button>
        </form>
      </div>

      <div style={styles.ecoPointsContainer}>
        <h2 style={styles.ecoPoints}>Your EcoPoints: {ecoPoints} 🌱</h2>
      </div>
    </div>
  );
};

// Internal CSS Styles
const styles = {
 
  container: {
    padding: "20px",
    maxWidth: "600px",
    margin: "auto",
    background: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    marginTop : 100 ,
  },
  heading: {
    fontSize: "28px",
    fontWeight: "bold",
    textAlign: "center",
    color: "#1b4332",
  },
  section: {
    marginTop: "20px",
  },
  sectionTitle: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#2d6a4f",
    borderBottom: "2px solid #95d5b2",
    paddingBottom: "5px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    background: "#d8f3dc",
    padding: "15px",
    borderRadius: "10px",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #95d5b2",
    borderRadius: "6px",
    fontSize: "16px",
    background: "#ffffff",
    color: "#1b4332",
  },
  button: {
    padding: "12px",
    fontSize: "18px",
    fontWeight: "bold",
    color: "white",
    backgroundColor: "#40916c",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  buttonHover: {
    backgroundColor: "#1b4332",
  },
  ecoPointsContainer: {
    marginTop: "20px",
    textAlign: "center",
  },
  ecoPoints: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#2d6a4f",
    background: "#b7e4c7",
    padding: "10px",
    borderRadius: "8px",
  },
};

export default UserDashboard;
