import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "aos/dist/aos.css";
import AOS from "aos";
import "./home.css"; // Import your custom CSS
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [isChatbotLoaded, setIsChatbotLoaded] = useState(false); // Track if chatbot is loaded
    const navigate = useNavigate(); 
    // Initialize AOS (Animate On Scroll)
    useEffect(() => {
        AOS.init();
    }, []);

    // Load Botpress Webchat script
    useEffect(() => {
        const script1 = document.createElement("script");
        script1.src = "https://cdn.botpress.cloud/webchat/v2.2/inject.js";
        script1.async = true;

        const script2 = document.createElement("script");
        script2.src = "https://files.bpcontent.cloud/2025/02/16/14/20250216145308-AXE1MEN8.js";
        script2.async = true;

        // Error handling for script1
        script1.onerror = () => {
            console.error("Failed to load Botpress Webchat script.");
        };

        // Error handling for script2
        script2.onerror = () => {
            console.error("Failed to load Botpress bot script.");
        };

        // Load script2 after script1 has loaded
        script1.onload = () => {
            document.body.appendChild(script2);

            script2.onload = () => {
                console.log("Botpress scripts loaded successfully.");
                try {
                    if (window.botpressWebChat) {
                        window.botpressWebChat.init({
                            botId: "your-bot-id", // Replace with your bot ID
                            hostUrl: "https://your-botpress-bot.com", // Replace with your bot's host URL
                            messagingUrl: "https://your-botpress-bot.com/api/v1", // Replace with your bot's messaging URL
                            clientId: "your-client-id", // Replace with your client ID
                            options: {
                                botName: "My Bot",
                                avatarUrl: "https://example.com/avatar.png", // Replace with your bot's avatar URL
                                showBotInfoPage: true,
                                enableReset: true,
                            },
                            stylesheet: `
                                @media (max-width: 768px) {
                                    #bp-web-widget-container {
                                        bottom: 70px !important;  /* Move up to avoid overlap */
                                        right: 20px !important;   /* Adjust position */
                                        width: 60px !important;   /* Reduce size */
                                        height: 60px !important;
                                    }
                                    #bp-web-widget-container iframe {
                                        width: 60px !important;
                                        height: 60px !important;
                                    }
                                }
                            `,
                        });
                        setIsChatbotLoaded(true); // Set chatbot as loaded
                    } else {
                        console.error("Botpress Webchat object not found.");
                    }
                } catch (error) {
                    console.error("Error initializing Botpress Webchat:", error);
                }
            };
        };

        // Append script1 to start the process
        document.body.appendChild(script1);

        // Cleanup scripts on component unmount
        return () => {
            if (document.body.contains(script1)) {
                document.body.removeChild(script1);
            }
            if (document.body.contains(script2)) {
                document.body.removeChild(script2);
            }
        };
    }, []);

    // Function to open the chatbot
    const openChatbot = () => {
        if (window.botpressWebChat) {
            window.botpressWebChat.sendEvent({ type: "show" }); // Use "toggle" if "show" doesn't work
        } else {
            console.error("Botpress Webchat is not initialized.");
        }
    };

    return (
        <div>
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
                                <a
                                    href="Leaderboard"
                                    className="btn primary-btn"
                                    // onClick={(e) => {
                                    //     e.preventDefault();
                                    //     if (isChatbotLoaded) {
                                    //         openChatbot();
                                    //     } else {
                                    //         console.error("Chatbot is not loaded yet.");
                                    //     }
                                    // }}
                                >
                                    Leader board
                                </a>
                                <a href="UserDashboard" className="btn secondary-btn">
                                    Arrange the Pickup
                                </a>
                            </div>
                        </div>

                        {/* Right Side (Image & Floating Card) */}
                        <div className="col-lg-6 hero-image" data-aos="fade-left">
                            {/* <img src="images/hero.webp" className="main-img" alt="Sustainable Materials" /> */}
                        </div>
                    </div>
                </div>
            </section>

            {/* Info Section */}
            <section className="info py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4" data-aos="fade-right" onClick={() => navigate("/scc")} >
                            <div className="card shadow">
                                <img src="images/1.jpg" className="card-img-top" alt="Recycling" />
                                <div className="card-body">
                                    <h3 className="card-title">For Schools and colleges</h3>
                                    <p>Support us by conducting E-Waste Drives in your school or college</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4" data-aos="fade-up" onClick={() => navigate("/Estimator")} >
                            <div className="card shadow">
                                <img src="images/2.jpg" className="card-img-top" alt="E-waste" />
                                <div className="card-body">
                                    <h3 className="card-title">Co2 Emission Estimator</h3>
                                    <p>Check how much your old Electronics is harmful to you.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4" data-aos="fade-left" onClick={() => navigate("/status")}>
                            <div className="card shadow">
                                <img src="images/3.jpg" className="card-img-top" alt="Get Involved" />
                                <div className="card-body">
                                    <h3 className="card-title">Check order status</h3>
                                    <p>Check if your order is accepted/rejected or completed</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="text-white text-center py-3">
                <p>&copy; 2025 E-Waste Recycling | All Rights Reserved</p>
            </footer>

            {/* Botpress Webchat Container */}
            <div id="botpress-webchat"></div>
        </div>
    );
};

export default Home;