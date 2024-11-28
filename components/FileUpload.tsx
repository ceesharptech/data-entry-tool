"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { read, utils } from "xlsx";
import { UploadCloud } from "lucide-react";

interface FileUploadProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFileUpload: (file: File, data: any[]) => void;
}

export default function FileUpload({ onFileUpload }: FileUploadProps) {
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      setFileName(file.name);
      setError(null);

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = e.target?.result;
          const workbook = read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = utils.sheet_to_json(worksheet);

          if (jsonData.length === 0) {
            throw new Error("The file is empty or contains no valid data.");
          }

          if (
            !Object.keys(jsonData[0] as object).some((key) =>
              key.toLowerCase().includes("matric")
            )
          ) {
            throw new Error(
              'The file must contain a column with "matric" in its name for the Matriculation Number.'
            );
          }

          onFileUpload(file, jsonData);
        } catch (err) {
          setError(
            err instanceof Error
              ? err.message
              : "An error occurred while processing the file."
          );
          setFileName(null);
        }
      };
      reader.readAsArrayBuffer(file);
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "text/csv": [".csv"],
    },
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-blue-500"
        }`}
      >
        <input {...getInputProps()} />
        <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          Drag and drop your file here or click to upload
        </p>
        <p className="mt-1 text-xs text-gray-500">
          (Only .xlsx and .csv files are accepted)
        </p>
      </div>
      {fileName && (
        <div className="text-sm text-gray-600">
          Uploaded file: <span className="font-semibold">{fileName}</span>
        </div>
      )}
      {error && <div className="text-sm text-red-600">Error: {error}</div>}
    </div>
  );
}
