import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface CSVUploadProps {
  onFileUpload: (file: File) => void;
}

export function CSVUpload({ onFileUpload }: CSVUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".csv"
        className="hidden"
        aria-label="Upload CSV file"
      />
      <Button onClick={handleButtonClick} variant="outline">
        <Upload className="mr-2 h-4 w-4" />
        Upload CSV
      </Button>
    </div>
  );
}
