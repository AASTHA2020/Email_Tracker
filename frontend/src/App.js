import React, { useState } from 'react';
import AddCompanyForm from './components/AddCompanyForm';
import CompanyTable from './components/CompanyTable';
import Header from './components/Header';

function App() {
  const [refreshTable, setRefreshTable] = useState(false);

  // Lifing the selectedEmails state from Company table to use it in AddCompanyForm Component.
  const [selectedEmails, setSelectedEmails] = useState([]);

  const handleCompanyAdded = () => {
    setRefreshTable(!refreshTable); // Trigger table refresh
  };

  return (
    <div className="App">
      <Header />
      <AddCompanyForm selectedEmails={selectedEmails} setSelectedEmails={setSelectedEmails} onCompanyAdded={handleCompanyAdded} />
      <CompanyTable selectedEmails={selectedEmails} setSelectedEmails={setSelectedEmails} refreshTable={refreshTable} />
    </div>
  );
}

export default App;
