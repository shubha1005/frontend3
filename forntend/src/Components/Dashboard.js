import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { signOut, onAuthStateChanged } from "firebase/auth";
import "./dashborad.css"; // Make sure the CSS file name matches

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Default profile picture
  const defaultProfilePic =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

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
    setUser(null);
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="dashboard-container">
       <style>
        {`

        `}
        </style>
      {/* Hero Section */}
      <section className="hero">
        {/* Background Video */}
        <video autoPlay muted loop id="hero-video">
          <source src="images/hero2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark Overlay */}
        <div className="overlay"></div>

        <div className="container">
          <div className="row align-items-center">
            {/* Left Side (Text & Buttons) */}
            <div className="col-lg-6 hero-text">
              <h5 data-aos="fade-down">Sculpting the Future with Green Materials</h5>
              <h1 data-aos="fade-up">
                Leading the Way in <span className="highlight">Sustainable</span> Materials
              </h1>
              <div className="hero-buttons mt-4" data-aos="fade-up">
                <a href="#" className="btn primary-btn">
                  Selected Projects
                </a>
                <a href="#" className="btn secondary-btn">
                  Work with Us
                </a>
              </div>
            </div>

            {/* Right Side (Image & Floating Card) */}
            <div className="col-lg-6 hero-image" data-aos="fade-left">
              {/* <img src="images/hero.webp" className="main-img" alt="Sustainable Materials" /> */}
              {/* <div className="floating-card">
                <p>Pro Team</p>
                <small>Who’s behind the innovation?</small>
                <div className="team-avatars">
                  <img src="images/1.jpg" alt="Team Member" />
                  <img src="images/2.jpg" alt="Team Member" />
                  <img src="images/3.jpg" alt="Team Member" />
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="info py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4" data-aos="fade-right">
              <div className="card shadow">
                <img src="images/1.jpg" className="card-img-top" alt="Recycling" />
                <div className="card-body">
                  <h3 className="card-title">Why Recycle?</h3>
                  <p>Electronic waste contains toxic materials. Proper recycling prevents pollution.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4" data-aos="fade-up">
              <div className="card shadow">
                <img src="images/2.jpg" className="card-img-top" alt="E-waste" />
                <div className="card-body">
                  <h3 className="card-title">How It Works</h3>
                  <p>Drop off old electronics, and we’ll handle safe disposal and recycling.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4" data-aos="fade-left">
              <div className="card shadow">
                <img src="images/3.jpg" className="card-img-top" alt="Get Involved" />
                <div className="card-body">
                  <h3 className="card-title">Get Involved</h3>
                  <p>Partner with us or volunteer to promote responsible e-waste management.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logout Button */}
      <div className="logout-container">
        <button className="btn logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
