import React from 'react';
import Banner from './components/Banner';
import PDFUpload from './components/PDFUpload';
import SearchPane from './components/SearchPane';
import './index.css';

const App: React.FC = () => {
  return (
    <div className="container">
      <Banner />
      <div className="content">
        <PDFUpload />
        <SearchPane />
      </div>
    </div>
  );
};

export default App;
