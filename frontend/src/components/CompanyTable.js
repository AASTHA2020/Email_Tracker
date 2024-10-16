import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/CompanyTable.css';
import AddCompanyForm from './AddCompanyForm';

const CompanyTable = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false); // Control the visibility of the form

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/jobs');
        setCompanies(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const addCompany = async (newCompany) => {
    try {
      const response = await axios.post('http://localhost:5000/api/jobs', newCompany);
      setCompanies([...companies, response.data]);
    } catch (error) {
      console.error('Error adding company:', error);
    }
  };

  return (
    <div className={`company-table ${loading ? 'blur-background' : ''}`}>
      <button className="add-btn" onClick={() => setShowForm(true)}>
        Add Company
      </button>

      {/* Conditional rendering for the AddCompanyForm */}
      {showForm && (
        <AddCompanyForm addCompany={addCompany} setLoading={setLoading} closeForm={() => setShowForm(false)} />
      )}

      <table>
        <thead>
          <tr>
            <th>Sr No.</th>
            <th>Company</th>
            <th>Email</th>
            <th>Address</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{company.name}</td>
              <td>{company.email}</td>
              <td>{company.address}</td>
              <td>{company.contact}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyTable;
