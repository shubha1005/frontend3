import { useEffect } from "react";

const Chatbot = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.botpress.cloud/webchat/v2.2/inject.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      console.log("Botpress script loaded.");
    };
  }, []);

  const initBot = () => {
    if (window.botpressWebChat) {
      console.log("Initializing Botpress...");
      window.botpressWebChat.init({
        botId: "20250216145308-AXE1MEN8",
        host: "https://cdn.botpress.cloud",
        messagingUrl: "https://messaging.botpress.cloud",
        clientId: "20250216145308-AXE1MEN8",
        lazyLoad: true,
        showPoweredBy: false,
        closeOnEscape: true,
        enableTranscriptDownload: true,
        stylesheet: "https://your-custom-styles.css"
      });
    } else {
      console.error("Botpress is not loaded yet.");
    }
  };

  return (
    <div>
      <button onClick={initBot}>Load Chatbot</button>
    </div>
  );
};

export default Chatbot;
