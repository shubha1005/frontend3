import React, { useState } from "react";
import axios from "axios";
import EnergyTips from "./EnergyTips";
import Refurbished from "./Refurbished";

// Predefined device categories
const DEVICE_CATEGORIES = {
  "Big Electronics": ["Refrigerator", "Air Conditioner", "Washing Machine", "TV", "Oven"],
  "Small Electronics": ["Laptop", "Smartphone", "Tablet", "PC", "Monitor"],
  "Micro Electronics": ["Pendrive", "Hard Drive", "Earphones", "Smartwatch", "Bluetooth Speaker"]
};

const Estimator = () => {
  const [category, setCategory] = useState("");
  const [device, setDevice] = useState("");
  const [age, setAge] = useState(1);
  const [emissions, setEmissions] = useState(null);

  const handleCalculate = async () => {
    if (!device) {
      alert("Please select a device.");
      return;
    }
    try {
      const response = await axios.post("http://127.0.0.1:5000/calculate", { device, age });
      setEmissions(response.data);
    } catch (error) {
      alert("Error calculating emissions!");
    }
  };

  return (
    <div className="top-p">
      <h2>📊 E-Waste Carbon Footprint Estimator</h2>

      <label>📂 Select Device Category:</label>
      <select onChange={(e) => setCategory(e.target.value)}>
        <option value="">-- Select Category --</option>
        {Object.keys(DEVICE_CATEGORIES).map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <label>📱 Select Device:</label>
      <select onChange={(e) => setDevice(e.target.value)} disabled={!category}>
        <option value="">-- Select Device --</option>
        {category &&
          DEVICE_CATEGORIES[category].map((dev) => (
            <option key={dev} value={dev}>{dev}</option>
          ))}
      </select>

      <label>⏳ Enter Device Age (Years):</label>
      <input type="number" min="1" value={age} onChange={(e) => setAge(e.target.value)} />

      <button onClick={handleCalculate}>Calculate CO₂ Emission</button>

      {emissions && (
        <div>
          <p>🌍 Total CO₂ Emission: {emissions.total_emissions} kg</p>

          <EnergyTips device={device} emissions={emissions.total_emissions} />
          <Refurbished device={device} />
        </div>
      )}
    </div>
  );
};

export default Estimator;