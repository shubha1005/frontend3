import React, { useState } from "react";
// import "./Eelection.css";

const EWasteSelection = () => {
  // E-Waste Categories Data
  const categories = [
    { 
      name: "Fully Reusable", 
      description: "Laptops, Phones, Tablets, Peripherals", 
      reuse: [
        "Donate to schools or NGOs.",
        "Sell on second-hand marketplaces.",
        "Use for educational purposes."
      ], 
      recycle: [
" 1️⃣ Backup & Reset Your Device",  
" Backup important files to an external drive or cloud storage.",  
" Sign out of all accounts (Google, Apple ID, etc.).",  
" Factory reset the device to erase personal data.",  
"",  
" 2️⃣ Remove Hazardous Components",  
" Remove batteries (especially lithium-ion) and dispose of them separately at battery collection points.",  
" Take out storage devices (HDDs, SSDs, SD cards) if sensitive data is involved.",  
"",  
" 3️⃣ Separate Components for Recycling",   
" Cables & Chargers → Wrap and bundle them properly.",  
" Plastic Parts → Separate non-electronic parts like casing if possible.",  
" Metal & Circuit Boards → Keep in a separate bag to be handled by professionals.",  
"",  
" 4️⃣ Find an Authorized E-Waste Recycler",   
" Locate a certified e-waste collection center near you using government websites or recycling programs.",  
" Check for manufacturer take-back programs (Apple, Dell, HP, etc.).",  
" Drop off your e-waste at collection bins or scheduled pickup services.",  
"",
" 5️⃣ Transport to the Recycling Center",   
" Pack e-waste safely to prevent damage during transport.",  
" Follow safety guidelines if transporting hazardous materials.",  
" Use e-waste pickup services if available in your city.",  
"",  
" 6️⃣ Recycling & Material Recovery Process",    
" Sorting: The recycler separates plastics, metals, and glass.",  
" Shredding: Devices are shredded into small parts.",  
" Material Recovery: Extracts valuable materials (gold, copper, aluminum).",  
" Safe Disposal: Hazardous materials (lead, mercury) are handled professionally.",  
"",  
" 7️⃣ Spread Awareness!",    
" Encourage others to recycle responsibly.",  
" Share info about drop-off locations & programs in your community.",  
" Buy eco-friendly electronics with better recyclability.",  
      ],
    },
    { 
      name: "Refurbishable", 
      description: "TVs, Printers, Monitors, Scanners", 
      reuse: [
        "Repair faulty components.",
        "Repurpose as a second display.",
        "Donate to schools or non-profits."
      ], 
      recycle: [
"1️⃣ Unplug and Inspect",  
"Disconnect the device from power sources.",  
"Remove external cables, ink cartridges (for printers), and detachable parts.", 
"",   
"2️⃣ Check for Manufacturer Take-Back Programs",  
"Many brands offer trade-in or recycling services.",  
"Visit the manufacturer’s website to find drop-off locations.", 
"",   
"3️⃣ Separate Components for Recycling",  
"Glass Screens (for monitors & TVs) – Should be handled separately as they contain lead.",  
"Plastic Parts – Can be shredded and repurposed.",  
"Metal Components (frames, wiring, motors) – Can be smelted and reused.", 
"",   
"4️⃣ Dispose of Hazardous Materials Safely",  
"CRT Monitors/Old TVs contain lead and should be handled by certified recyclers.",  
"Printer Toners & Ink Cartridges should be refilled, returned to the manufacturer, or sent to specialized recycling centers.",  
"",  
"5️⃣ Drop Off at an E-Waste Facility",  
"Find a government-approved e-waste recycling center near you.",  
"Ensure they follow environmentally safe disposal practices.",  
"",  
"6️⃣ Obtain a Recycling Certificate (Optional)",  
"Some centers issue a certificate of recycling to verify responsible disposal."  
      ],
    },
    { 
      name: "Hard-to-Recycle", 
      description: "Batteries, ACs, Refrigerators", 
      reuse: [
        "Use rechargeable alternatives.",
        "Check manufacturer take-back programs."
      ], 
      recycle: [
"1️⃣ Identify Hazardous Components,",  
"Check if the device contains hazardous materials like mercury, lead, or refrigerants,",  
"Look for recycling symbols or manufacturer disposal instructions,",  
"2️⃣ Remove Batteries and Fluids",
"",  
"Detach lithium-ion or lead-acid batteries and take them to specialized battery recyclers,",  
"Drain refrigerants from ACs and refrigerators at an authorized disposal facility,",  
"3️⃣ Contact Certified E-Waste Recyclers",
"",  
"Find government-approved or manufacturer-recommended e-waste recycling centers,",  
"Ensure they handle hazardous materials safely and follow environmental regulations,",  
"4️⃣ Separate Recyclable Materials",
"",  
"Extract reusable metals like copper, aluminum, and steel for refining,",  
"Sort plastic and glass components for appropriate recycling streams,",  
"5️⃣ Follow Safe Transportation Guidelines",
"",  
"Use protective packaging for hazardous electronics to prevent leaks or breakage,",  
"Label and transport items carefully to an approved facility",
"",  
"6️⃣ Obtain Proof of Safe Disposal,",  
"Request a recycling certificate or verification from the facility,",  
"Ensure compliance with local environmental laws for proper waste handling,"  

      ],
      
    },
    { 
      name: "Hazardous", 
      description: "Medical & Industrial Electronics", 
      reuse: [
        "Check for specialized refurbishing programs."
      ], 
      recycle: [
       "1️⃣ Identify Hazardous Components,",  
"Check if the device contains biohazardous materials, radioactive elements, or toxic substances,",  
"Review manufacturer guidelines for safe disposal,",  
"",  
"2️⃣ Isolate and Secure the Waste,",  
"Store hazardous e-waste in sealed, labeled containers to prevent leaks,",  
"Use protective gear when handling toxic or contaminated electronics,",  
"",  
"3️⃣ Contact Authorized Disposal Centers,",  
"Locate certified e-waste facilities that specialize in hazardous material processing,",  
"Ensure they comply with environmental and health safety regulations,",  
"",  
"4️⃣ Arrange for Special Handling,",  
"Some hazardous electronics require decontamination before recycling,",  
"Follow guidelines for safe dismantling and separation of dangerous components,",  
"",  
"5️⃣ Follow Legal Compliance,",  
"Adhere to local laws regarding hazardous waste transportation and disposal,",  
"Request documentation or certification for regulatory compliance,",  
"",  
"6️⃣ Opt for Manufacturer Take-Back Programs,",  
"Many industrial electronics manufacturers offer special hazardous waste disposal services,",  
"Check for government or industry-led recycling programs for safe handling,",  
"",  
"7️⃣ Monitor the Recycling Process,",  
"Ensure hazardous components are neutralized or processed without harming the environment,",  
"Advocate for proper recycling practices to prevent soil and water contamination,"  

      ],
      
    },
    { 
      name: "Small Electronics", 
      description: "Earphones, USB drives, Smartwatches", 
      reuse: [
        "Trade in for discounts.",
        "Repurpose as DIY projects."
      ], 
      recycle: [
        "1️⃣ Gather and Sort Small Electronics,",  
"Collect all small electronic devices such as earphones, USB drives, smartwatches, and calculators,",  
"Separate functional and non-functional items for reuse or recycling,",  
"",  
"2️⃣ Check for Trade-In or Buyback Programs,",  
"Many manufacturers and retailers offer trade-in programs for old small electronics,",  
"Check if your device qualifies for a discount on a new purchase,",  
"",  
"3️⃣ Remove and Reuse Functional Parts,",  
"Salvage working components like batteries, circuit boards, and sensors for DIY projects,",  
"Repurpose USB drives, adapters, and cables for other electronic setups,",  
"",  
"4️⃣ Wipe Data Before Disposal,",  
"Perform a factory reset on smart devices and USB drives to remove personal information,",  
"Use data-wiping software for extra security,",  
"",  
"5️⃣ Drop Off at an E-Waste Recycling Facility,",  
"Find a local e-waste collection center that accepts small electronics,",  
"Ensure they follow proper disposal methods for extracting metals and plastic,",  
"",  
"6️⃣ Repurpose for Creative DIY Projects,",  
"Convert old smartwatches into fitness trackers for kids or pets,",  
"Use earphones as spare parts for audio repair projects,",  
"",  
"7️⃣ Follow Safe Disposal Practices,",  
"Avoid throwing small electronics in regular trash to prevent environmental damage,",  
"Ensure lithium-ion batteries are disposed of at battery recycling stations,",  
"",  
"8️⃣ Spread Awareness About Small E-Waste Recycling,",  
"Encourage friends and family to recycle small gadgets responsibly,",  
"Support initiatives that promote sustainable electronic waste management,"  

      ],
      
    },
    { 
      name: "Gaming Consoles", 
      description: "Old PlayStations, Xbox, Controllers", 
      reuse: [
        "Use as an emulator device.",
        "Sell to collectors.",
        "Donate to youth programs."
      ], 
      recycle: [
        "1️⃣ Assess the Condition of the Console,",  
"Check if the console is still functional or repairable,",  
"Determine if it can be sold, donated, or repurposed before recycling,",  
"",  
"2️⃣ Trade-In or Resell for Extended Use,",  
"Many brands offer trade-in programs for old gaming consoles,",  
"Sell functional consoles to second-hand electronics stores or online marketplaces,",  
"",  
"3️⃣ Salvage Usable Components,",  
"Extract working parts like controllers, hard drives, or power adapters for reuse,",  
"Repurpose the console for retro gaming or as a media streaming device,",  
"",  
"4️⃣ Factory Reset and Data Wipe,",  
"Erase all personal data from the console before disposing or selling,",  
"Unlink connected accounts to ensure privacy and security,",  
"",  
"5️⃣ Donate to Schools or Gaming Communities,",  
"Give old gaming consoles to schools, libraries, or non-profit gaming organizations,",  
"Support programs that provide entertainment and learning opportunities for children,",  
"",  
"6️⃣ Recycle at an Authorized E-Waste Facility,",  
"Locate an e-waste center that accepts gaming consoles for responsible disposal,",  
"Ensure that hazardous materials like lithium-ion batteries are processed correctly,",  
"",  
"7️⃣ Repurpose Console for DIY Tech Projects,",  
"Convert an old gaming console into an emulator for classic games,",  
"Use the motherboard and chips for tech learning or creative projects,",  
"",  
"8️⃣ Dispose of Accessories Responsibly,",  
"Recycle controllers, headsets, and cables at electronic waste collection centers,",  
"Repurpose broken accessories for spare parts or repair projects,",  
"",  
"9️⃣ Spread Awareness About E-Waste Recycling,",  
"Educate other gamers about responsible console recycling practices,",  
"Encourage sustainable gaming habits to reduce electronic waste,"  

      ],
      
    },
    { 
      name: "Networking Devices", 
      description: "Routers, Modems, Switches", 
      reuse: [
        "Reset and reuse for better coverage.",
        "Convert into a guest network device."
      ], 
      recycle: [
        "1️⃣ Assess the Device’s Condition,",  
"Check if the router, modem, or switch is still functional,",  
"Determine if it can be sold, donated, or reused before recycling,",  
"",  
"2️⃣ Factory Reset and Data Wipe,",  
"Reset the device to remove stored configurations and credentials,",  
"Erase personal data and disconnect from registered accounts,",  
"",  
"3️⃣ Trade-In or Resell,",  
"Many ISPs and manufacturers offer trade-in programs for old networking devices,",  
"Sell working devices to electronics stores or online marketplaces,",  
"",  
"4️⃣ Repurpose for Extended Use,",  
"Use an old router as a Wi-Fi extender to boost network coverage,",  
"Convert it into a guest network device or a smart home hub,",  
"",  
"5️⃣ Separate Components for Recycling,",  
"Extract reusable metals like copper and aluminum from circuit boards,",  
"Sort plastic and electronic components for proper recycling streams,",  
"",  
"6️⃣ Dispose of Lithium Batteries Properly,",  
"Remove built-in batteries from portable modems and take them to specialized battery recyclers,",  
"Ensure batteries are not thrown in regular trash due to fire hazards,",  
"",  
"7️⃣ Drop Off at an E-Waste Facility,",  
"Find a certified e-waste center that accepts networking devices,",  
"Ensure environmentally safe disposal of hazardous electronic components,",  
"",  
"8️⃣ Recycle Cables and Adapters,",  
"Repurpose old Ethernet cables for DIY projects or networking needs,",  
"Recycle power adapters and damaged cables at an electronic waste collection center,",  
"",  
"9️⃣ Spread Awareness About E-Waste Recycling,",  
"Encourage responsible disposal of networking devices,",  
"Educate others on repurposing and recycling old tech,"  

      ],
      
    },
    { 
      name: "Kitchen Appliances", 
      description: "Microwaves, Coffee Makers, Toasters", 
      reuse: [
        "Repair and use for longer life.",
        "Repurpose for DIY projects."
      ], 
      recycle: [
        "1️⃣ Check for Repair or Donation,",  
"Test if the appliance is still functional or can be repaired,",  
"Donate working appliances to charities, shelters, or community centers,",  
"",  
"2️⃣ Remove Hazardous Components,",  
"Extract lithium-ion or lead-acid batteries (if any) and recycle them separately,",  
"Ensure proper disposal of capacitors and electronic components in microwaves,",  
"",  
"3️⃣ Separate Recyclable Materials,",  
"Disassemble the appliance to sort out metal, plastic, and electronic parts,",  
"Collect copper wiring, aluminum, and steel for metal recycling centers,",  
"",  
"4️⃣ Find Manufacturer Take-Back Programs,",  
"Check if the manufacturer offers recycling or trade-in programs,",  
"Return old appliances to retailers that accept e-waste for proper disposal,",  
"",  
"5️⃣ Recycle Electronic Parts Safely,",  
"Remove circuit boards from appliances like microwaves and coffee makers,",  
"Send electronic components to an e-waste facility that processes hazardous materials,",  
"",  
"6️⃣ Dispose of Plastic and Glass Components,",  
"Sort plastic parts for municipal or specialized plastic recycling programs,",  
"Recycle glass components separately, especially from microwave doors and blender jars,",  
"",  
"7️⃣ Reuse or Repurpose for DIY Projects,",  
"Convert an old toaster into a unique art piece or functional storage box,",  
"Use blender motors for small DIY engineering projects,",  
"",  
"8️⃣ Drop Off at an E-Waste Facility,",  
"Find a certified recycling center that accepts kitchen appliances,",  
"Ensure proper disposal to prevent landfill waste and environmental harm,",  
"",  
"9️⃣ Spread Awareness About Sustainable Disposal,",  
"Encourage responsible recycling and upcycling of old kitchen appliances,",  
"Educate others on finding safe e-waste disposal options,"  

      ],
      
    }
  ];

  // State for managing selected category
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Function to set the selected category
  const handleSelect = () => {
    const item = categories.find((cat) => cat.name === selectedCategory);
    setSelectedItem(item);
  };

  return (
    <div className="container">
      <style>
        {`
        /* General Styles */
body {
    font-family: 'Arial', sans-serif;
    background-color: #f5f5f5; /* Light grey background */
    color: #333; /* Dark grey text */
    margin: 0;
    padding: 0;
  }
  
  .container {
    max-width: 800px;
    margin: 50px auto;
    padding: 20px;
    background: #ffffff; /* White background */
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    animation: fadeIn 1s ease-in-out;
  }
  
  h2 {
    text-align: center;
    color: #2e7d32; /* Dark green for headings */
    margin-bottom: 20px;
    font-size: 2rem;
  }
  
  /* Dropdown Styles */
  select {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 2px solid #4caf50; /* Green border */
    border-radius: 5px;
    font-size: 1rem;
    color: #333; /* Dark grey text */
    background-color: #e8f5e9; /* Light green background */
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
    appearance: none; /* Remove default arrow */
    -webkit-appearance: none; /* Remove default arrow for Safari */
    -moz-appearance: none; /* Remove default arrow for Firefox */
    background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%234caf50%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E"); /* Custom green arrow */
    background-repeat: no-repeat;
    background-position: right 10px center;
    background-size: 12px;
  }
  
  select:hover {
    border-color: #388e3c; /* Darker green on hover */
    background-color: #c8e6c9; /* Slightly darker green background on hover */
  }
  
  select:focus {
    border-color: #2e7d32; /* Dark green on focus */
    box-shadow: 0 0 8px rgba(76, 175, 80, 0.6); /* Green shadow */
    outline: none;
  }
  
  /* Button Styles */
  button {
    display: block;
    width: 100%;
    padding: 10px;
    background-color: #4caf50; /* Green background */
    color: #fff; /* White text */
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }
  
  button:hover {
    background-color: #388e3c; /* Darker green on hover */
    transform: translateY(-2px);
  }
  
  button:active {
    transform: translateY(0);
  }
  
  /* Details Section Styles */
  .details {
    margin-top: 30px;
    padding: 20px;
    background-color: #f5f5f5; /* Light grey background */
    border-radius: 5px;
    animation: slideIn 0.5s ease-in-out;
  }
  
  .details h3 {
    color: #2e7d32; /* Dark green for category heading */
    margin-bottom: 15px;
    font-size: 1.5rem;
    font-weight: bold; /* Bold heading */
    text-align: center; /* Centered heading */
  }
  
  .details p {
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 10px;
    color: #333; /* Dark grey text */
  }
  
  .details strong {
    color: #4caf50; /* Green for strong text */
  }
  
  .details ul {
    list-style-type: disc;
    padding-left: 20px;
    margin-bottom: 15px;
  }
  
  .details li {
    margin-bottom: 8px;
    font-size: 0.95rem;
    color: #555; /* Medium grey text */
  }
  
  /* Animations */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }`}
      </style>
      <h2>Select E-Waste Category</h2>
      
      {/* Dropdown for Selecting Category */}
      <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="">-- Select Category --</option>
        {categories.map((cat, index) => (
          <option key={index} value={cat.name}>{cat.name}</option>
        ))}
      </select>

      {/* Button to Show Details */}
      <button onClick={handleSelect}>Show Details</button>

      {/* Display Selected Category Details */}
      {selectedItem && (
        <div className="details">
          <h3>{selectedItem.name}</h3>
          <p><strong>Description:</strong> {selectedItem.description}</p>

          <p><strong>Reuse Options:</strong></p>
          <ul>
            {selectedItem.reuse.map((option, i) => (
              <li key={i}>{option}</li>
            ))}
          </ul>

          <p><strong>Recycle Steps:</strong></p>
          <ul>
            {selectedItem.recycle.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EWasteSelection;
