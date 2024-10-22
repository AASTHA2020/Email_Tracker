import React, { useState } from 'react';
import AddCompanyForm from './components/AddCompanyForm';
import CompanyTable from './components/CompanyTable';
import Header from './components/Header';

function App() {
  const [refreshTable, setRefreshTable] = useState(false);

  const handleCompanyAdded = () => {
    setRefreshTable(!refreshTable); // Trigger table refresh
  };

  return (
    <div className="App">
      <Header />
      <AddCompanyForm onCompanyAdded={handleCompanyAdded} />
      <CompanyTable refreshTable={refreshTable} />
    </div>
  );
}

export default App;
