import React, { useState, useRef } from 'react';
import axios from 'axios';

interface PDFUploadProps {
  onUploadStart: () => void;
  onUploadEnd: () => void;
}

const PDFUpload: React.FC<PDFUploadProps> = ({ onUploadStart, onUploadEnd }) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onUploadStart(); // Notify parent component that upload has started
      const url = URL.createObjectURL(file);
      setPdfUrl(url);

      // Create a FormData object to send the file
      const formData = new FormData();
      formData.append('file', file);

      // Send the file to the backend
      axios.post('http://127.0.0.1:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        console.log('File uploaded successfully:', response.data);
        onUploadEnd();
      })
      .catch(error => {
        console.error('Error uploading file:', error);
        onUploadEnd(); 
      });
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="pane pdf-pane">
      <input
        type="file"
        accept="application/pdf"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <button className="custom-button" onClick={handleButtonClick}>
        Upload doc
      </button>
      {pdfUrl && <iframe src={pdfUrl} width="100%" height="600px"></iframe>}
    </div>
  );
};

export default PDFUpload;
