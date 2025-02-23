import React, { useState } from "react";
import * as XLSX from "xlsx";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyALwDQAaEdgET3dCecBi2dTfWS1AkWLy2g",
    authDomain: "fir-738bb.firebaseapp.com",
    databaseURL: "https://fir-738bb-default-rtdb.firebaseio.com",
    projectId: "fir-738bb",
    storageBucket: "fir-738bb.firebasestorage.app",
    messagingSenderId: "267566724926",
    appId: "1:267566724926:web:df173889472fd432e29e6f",
    measurementId: "G-TESHEZ4GZS"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const ExcelUploader = () => {
  const [file, setFile] = useState(null);

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImport = async () => {
    if (!file) {
      alert("Please select an Excel file.");
      return;
    }

    const reader = new FileReader();
    reader.readAsBinaryString(file);

    reader.onload = async (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0]; // Get first sheet
      const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

      try {
        const colRef = collection(db, "excelData"); // Firestore Collection
        for (const row of sheetData) {
          await addDoc(colRef, row);
        }
        alert("Data uploaded successfully!");
      } catch (error) {
        console.error("Error uploading data:", error);
        alert("Error uploading data.");
      }
    };
  };

  return (
    <div className="p-4 bg-gray-100 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-2">Upload Excel File</h2>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} className="mb-2" />
      <button onClick={handleImport} className="bg-blue-500 text-white px-4 py-2 rounded">
        Import to Firebase
      </button>
    </div>
  );
};

export default ExcelUploader;
