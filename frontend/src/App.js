import React from 'react';
import Header from './components/Header'; // Import Header
import CompanyTable from './components/CompanyTable'; // Import CompanyTable
import './App.css'; // Import your main styles

const App = () => {
  return (
    <div className="App">
      <Header /> {/* Display the header */}
      <CompanyTable /> {/* Display the company table */}
    </div>
  );
};

export default App;
