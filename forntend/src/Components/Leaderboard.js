import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        // Fetch top 10 users by EcoPoints
        const usersQuery = query(collection(db, "users"), orderBy("points", "desc"), limit(10));
        const usersSnapshot = await getDocs(usersQuery);
        const usersData = usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setUsers(usersData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return <p>Loading leaderboard...</p>;
  }

  return (
    <div className="p-5"  >
      <h1 className="text-2xl font-bold text-center" style={{ paddingTop: 50 }}>Leaderboard</h1>

      <div className="mt-5">
        <h2 className="text-xl font-semibold">🏆 Top Users</h2>
        <ul className="space-y-3">
          {users.map((user, index) => (
            <li key={user.id} className="p-3 border rounded bg-white shadow-sm">
              <p><strong>Rank {index + 1}:</strong> {user.email || "No Email Found"}</p>
              <p><strong>EcoPoints:</strong> {user.points}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Leaderboard;
