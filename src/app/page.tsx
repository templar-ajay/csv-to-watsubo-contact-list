"use client";
import { useState } from "react";
import FileInput from "@/components/FileInput";
import CopyButton from "@/components/Button";

export default function Home() {
  const [csvData, setCSVdata] = useState(null);
  const [error, setError] = useState(null);
  async function handleInput(data) {
    try {
      const modifiedData = data?.map((entry) => {
        const sanitizedNumber = entry.Phone.replace(/[\+\-\s]/g, "");
        const prefixedNumber = sanitizedNumber.startsWith("34")
          ? sanitizedNumber
          : `34${sanitizedNumber}`;

        if (prefixedNumber.length === 11) {
          const modifiedName = entry["First Name"]
            ? entry["First Name"].charAt(0).toUpperCase() +
              entry["First Name"].slice(1).toLowerCase()
            : "";

          return `${prefixedNumber},${modifiedName}`;
        }
        return null;
      });

      // Filter out null values (discarded numbers)
      const filteredData = modifiedData?.filter((data) => data !== null);
      const uniqueData = [...new Set(filteredData)];

      setCSVdata(uniqueData);
      setError(null); // Reset error state
    } catch (error) {
      console.error("Error processing input:", error);
      setError("Error processing: Corrupt CSV file");
    }
  }

  return (
    <main className="m-5 sm:m-20">
      <div className="">
        <FileInput handleInput={handleInput} />
      </div>
      <div className="my-5">
        <CopyButton csvData={csvData} />
      </div>
      <div>
        {error && <div className="text-red-600">{error}</div>}
        {csvData && (
          <pre>
            {csvData.map((item, index) => (
              <div key={index}>{item}</div>
            ))}
          </pre>
        )}
      </div>
    </main>
  );
}
