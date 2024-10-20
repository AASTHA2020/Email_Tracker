import React from 'react';
import Header from './components/Header'; // Import Header
import CompanyTable from './components/CompanyTable'; // Import CompanyTable
import './App.css'; // Import your main styles
import AddCompanyForm from './components/AddCompanyForm';

const App = () => {
  return (
    <div className="App">
      <Header /> {/* Display the header */}
      <CompanyTable /> 
      <AddCompanyForm/>
      {/* Display the company table */}
    </div>
  );
};

export default App;