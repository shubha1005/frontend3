// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Refurbished = ({ device }) => {
//   const [options, setOptions] = useState([]);
//   const [error, setError] = useState("");

//   const fetchRefurbishedOptions = async () => {
//     try {
//       const response = await axios.get(`http://127.0.0.1:5000/refurbished?device=${device}`);
//       setOptions(response.data);
//       setError("");  // Clear any previous errors
//     } catch (err) {
//       setError("⚠️ Failed to load refurbished options. Please try again later.");
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     if (device) {
//       fetchRefurbishedOptions();
//     }
//   }, [device,]);

//   return (
//     <div>
//       <h3>♻️ Refurbished Device Suggestions</h3>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {options.length > 0 ? (
//         <ul>
//           {options.map((item, index) => (
//             <li key={index}>{item}</li>
//           ))}
//         </ul>
//       ) : (
//         <p>No refurbished options found.</p>
//       )}
//     </div>
//   );
// };

// export default Refurbished;


import React, { useState, useEffect } from "react";
import axios from "axios";

const Refurbished = ({ device }) => {
  const [options, setOptions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRefurbishedOptions = async () => {
      if (!device) return; // Prevent API call if device is not set

      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/refurbished?device=${encodeURIComponent(device)}`
        );

        // Ensure response data is an array before setting state
        if (Array.isArray(response.data)) {
          setOptions(response.data);
          setError(""); // Clear any previous errors
        } else {
          setOptions([]);
          setError("⚠️ Unexpected response format.");
        }
      } catch (err) {
        setError("⚠️ Failed to load refurbished options. Please try again later.");
        console.error("API Error:", err);
      }
    };

    fetchRefurbishedOptions();
  }, [device]); // Run effect when device changes

  return (
    <div>
      <h3>♻️ Refurbished Device Suggestions</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {options.length > 0 ? (
        <ul>
          {options.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        <p>No refurbished options found.</p>
      )}
    </div>
  );
};

export default Refurbished;
