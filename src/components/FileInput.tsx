"use client";

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Papa from "papaparse";

const FileInput = ({ handleInput }: any) => {
  const onDrop = useCallback((acceptedFiles: any) => {
    const theCSV = acceptedFiles[0];
    console.log("filename", theCSV.path);

    Papa.parse(theCSV, {
      complete: (result: any) => {
        // The parsed data is available in result.data
        // console.log("Parsed CSV data:", result.data);
        handleInput(result.data);
        // You can now handle the parsed data as needed
      },
      header: true, // Assumes the first row is the header row
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "text/csv": [".csv"] },
  });

  return (
    <div
      className="flex items-center justify-center w-full"
      {...getRootProps()}
    >
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            {isDragActive ? (
              <span>
                <span className="font-semibold">Drop here</span>
              </span>
            ) : (
              <span>
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </span>
            )}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            only a CSV file is supported{" "}
          </p>
        </div>
        <input {...getInputProps()} />
      </label>
    </div>
  );
};

export default FileInput;
