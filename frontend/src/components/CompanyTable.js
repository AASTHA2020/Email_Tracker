import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CompanyTable = () => {
  const [companies, setCompanies] = useState([]);  
  const [loading, setLoading] = useState(true);    
  const [error, setError] = useState(null);       

  // Fetch companies from the backend when the component loads
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/jobs'); 
        setCompanies(response.data); 
      } catch (error) {
        console.error('Error fetching companies:', error);
        setError('Error fetching companies');
      } finally {
        setLoading(false); 
      }
    };

    fetchCompanies(); 
  }, []);

  return (
    <div className="company-table">
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Sr No.</th>
            <th>Company</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {companies.length > 0 ? (
            companies.map((company, index) => (
              <tr key={company._id}>
                <td>{index + 1}</td>
                <td>{company.name}</td>
                <td>{company.email}</td>
                <td>{company.contact}</td>
                <td>{company.address}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No companies found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyTable;
