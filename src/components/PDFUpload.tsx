import React, { useState, useRef } from 'react';


const PDFUpload: React.FC = () => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPdfUrl(url);
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
