import API_URL from "./config"; // Import Flask backend URL

// Function to fetch data from Flask
export async function getData() {
  try {
    const response = await fetch(`${API_URL}/your-endpoint`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
