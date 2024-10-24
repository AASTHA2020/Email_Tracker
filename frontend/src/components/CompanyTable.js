import React, { useEffect, useState } from 'react'; 
import axios from 'axios'; 
import SendEmailDialog from './SendEmailDialog'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'; 
import '../styles/CompanyTable.css'; 

const CompanyTable = ({ refreshTable }) => { 
  const [companies, setCompanies] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [editingCompany, setEditingCompany] = useState(null); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [companiesPerPage] = useState(10); 
  const [selectedEmails, setSelectedEmails] = useState([]); 
  const [showMailDialog, setShowMailDialog] = useState(false); 

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        console.log('Fetching companies from backend...');
        const response = await axios.get('https://aastha-backend.onrender.com/api/jobs');
        setCompanies(response.data); 
        console.log('Fetched companies:', response.data); 
      } catch (error) {
        console.error('Error fetching companies:', error);
        setError('Error fetching companies'); 
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies(); 
  }, [refreshTable]); 

  const handleCheckboxChange = (companyEmail) => {
    console.log('Toggling selection for email:', companyEmail); 

    setSelectedEmails((prevSelectedEmails) => {
      if (prevSelectedEmails.includes(companyEmail)) {
        console.log('Removing email:', companyEmail);
        return prevSelectedEmails.filter((email) => email !== companyEmail); 
      } else {
        console.log('Adding email:', companyEmail); 
        return [...prevSelectedEmails, companyEmail]; 
      }
    });
  };

  const handleEdit = (company) => {
    console.log('Editing company:', company); 
    setEditingCompany(company); 
  };

  const handleUpdate = async (e) => {
    e.preventDefault(); 
    console.log('Updating company:', editingCompany); 

    try {
      await axios.put(`https://aastha-backend.onrender.com/api/jobs/${editingCompany._id}`, editingCompany);
      setCompanies(companies.map((company) => company._id === editingCompany._id ? editingCompany : company));
      setEditingCompany(null); 
    } catch (error) {
      console.error('Error updating company:', error); 
    }
  };

  const handleEditChange = (e) => {
    setEditingCompany({
      ...editingCompany,
      [e.target.name]: e.target.value 
    });
  };

  const handleDelete = async (id) => {
    console.log('Deleting company with id:', id);
    try {
      await axios.delete(`https://aastha-backend.onrender.com/api/jobs/${id}`);
      setCompanies(companies.filter((company) => company._id !== id));
    } catch (error) {
      console.error('Error deleting company:', error);
    }
  };

  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = companies.slice(indexOfFirstCompany, indexOfLastCompany);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getRowNumber = (index) => indexOfFirstCompany + index + 1;

  return (
    <div className="company-table-container">
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {editingCompany && (
        <form onSubmit={handleUpdate} className="edit-company-form">
          <h2>Edit Company</h2>
          <input type="text" name="name" value={editingCompany.name} onChange={handleEditChange} required />
          <input type="email" name="email" value={editingCompany.email} onChange={handleEditChange} required />
          <input type="text" name="contact" value={editingCompany.contact} onChange={handleEditChange} required />
          <input type="text" name="address" value={editingCompany.address} onChange={handleEditChange} required />
          <button type="submit" className="submit-btn">Update</button>
          <button onClick={() => setEditingCompany(null)} className="cancel-btn">Cancel</button>
        </form>
      )}

      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>Sr No.</th>
            <th>Company</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentCompanies.map((company, index) => (
            <tr key={company._id}>
              <td>
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange(company.email)} 
                  checked={selectedEmails.includes(company.email)} 
                />
              </td>
              <td>{getRowNumber(index)}</td>
              <td>{company.name}</td>
              <td>{company.email}</td>
              <td>{company.contact}</td>
              <td>{company.address}</td>
              <td>
                <button className="icon-btn edit-btn" onClick={() => handleEdit(company)}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button className="icon-btn delete-btn" onClick={() => handleDelete(company._id)}>
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {Array.from({ length: Math.ceil(companies.length / companiesPerPage) }, (_, index) => (
          <button key={index + 1} onClick={() => paginate(index + 1)} className={`page-btn ${currentPage === index + 1 ? 'active' : ''}`}>
            {index + 1}
          </button>
        ))}
      </div>

      {showMailDialog && (
        <SendEmailDialog selectedEmails={selectedEmails} onClose={() => setShowMailDialog(false)} />
      )}
    </div>
  );
};

export default CompanyTable;
