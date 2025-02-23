
// import React from "react";

// const EnergyTips = ({ device, emissions }) => {
//   const tip =
//     emissions > 500
//       ? "⚠️ High emissions detected! Consider upgrading to an energy-efficient model."
//       : "✅ Moderate emissions. Enable eco-mode & reduce usage.";
    
//   return (
//     <div>
//       <h3>💡 Energy-Saving Tips</h3>
//       <p>{tip}</p>
//     </div>
//   );
// };

// export default EnergyTips;


// import React from "react";

// const EnergyTips = ({ device, emissions }) => {
//   let tip = "";

//   if (emissions < 1000) {
//     tip = "✅ Low emissions! Keep using energy-saving features to maintain efficiency.";
//   } else if (emissions < 20000) {
//     tip =
//       "⚠️ Moderate emissions. ";
//   } else if (emissions < 30000) {
//     tip =
//       "⚠️ High emissions detected! Consider reducing usage and upgrading to an energy-efficient model.";
//   } else {
//     tip =
//       "🚨 Extremely high emissions! This device contributes significantly to carbon footprints. Consider recycling or replacing it with an eco-friendly alternative.";
//   }

//   return (
//     <div style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "10px", backgroundColor: "#f8f8f8" }}>
//       <h3>💡 Energy-Saving Tips</h3>
//       <p><strong>Device:</strong> {device}</p>
//       <p><strong>CO₂ Emissions:</strong> {emissions} kg</p>
//       <p>{tip}</p>
//     </div>
//   );
// };

// export default EnergyTips;


import React, { useEffect, useState } from "react";
import axios from "axios";

const EnergyTips = ({ device, emissions }) => {
  const [tip, setTip] = useState("");

  useEffect(() => {
    if (device) {
      fetchEnergyTips();
    }
  }, [device]);

  const fetchEnergyTips = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/energy-tips?device=${device}`);
      setTip(response.data.tip);
    } catch (error) {
      setTip("No energy-saving tip available.");
    }
  };

  let emissionMessage = "";

  if (emissions < 1000) {
    emissionMessage = "✅ Low emissions! Keep using energy-saving features to maintain efficiency.";
  } else if (emissions < 20000) {
    emissionMessage = "⚠️ Moderate emissions. Try optimizing power usage to reduce your carbon footprint.";
  } else if (emissions < 30000) {
    emissionMessage = "⚠️ High emissions detected! Consider reducing usage and upgrading to an energy-efficient model.";
  } else {
    emissionMessage = "🚨 Extremely high emissions! This device contributes significantly to carbon footprints. Consider recycling or replacing it with an eco-friendly alternative.";
  }

  return (
    <div style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "10px", backgroundColor: "#f8f8f8" }}>
      <h3>💡 Energy-Saving Tips</h3>
      <p><strong>Device:</strong> {device}</p>
      <p><strong>CO₂ Emissions:</strong> {emissions} kg</p>
      <p>{emissionMessage}</p>
      <p><strong>Tip:</strong> {tip}</p>
    </div>
  );
};

export default EnergyTips;
