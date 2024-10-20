import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import '../styles/CompanyTable.css';

const CompanyTable = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCompany, setEditingCompany] = useState(null); // For editing company
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const [companiesPerPage] = useState(10); // Number of companies per page

  // Fetch companies from the API
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('https://aastha-backend.onrender.com/api/jobs');
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

  // Handle Delete functionality
const handleDelete = async (id) => {
  try {
    await axios.delete(`https://aastha-backend.onrender.com/api/jobs/${id}`);
    // Remove deleted company from state
    setCompanies(companies.filter((company) => company._id !== id));
  } catch (error) {
    console.error('Error deleting company:', error);
  }
};


  // Handle Edit functionality
  const handleEdit = (company) => {
    setEditingCompany(company); // Set the company to be edited
  };

  // Handle Update functionality
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://aastha-backend.onrender.com/api/jobs/${editingCompany._id}`, editingCompany);
      setCompanies(companies.map((company) => company._id === editingCompany._id ? editingCompany : company));
      setEditingCompany(null); // Clear editing state after update
    } catch (error) {
      console.error('Error updating company:', error);
    }
  };

  // Handle form changes for editing
  const handleEditChange = (e) => {
    setEditingCompany({
      ...editingCompany,
      [e.target.name]: e.target.value
    });
  };

  // Pagination calculation
  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = companies.slice(indexOfFirstCompany, indexOfLastCompany);

  // Pagination navigation
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Numbering based on pagination
  const getRowNumber = (index) => indexOfFirstCompany + index + 1;

  return (
    <div className="company-table-container">
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {/* Edit form */}
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

      {/* Company Table */}
      <table>
        <thead>
          <tr>
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

      {/* Pagination controls */}
      <div className="pagination">
        {Array.from({ length: Math.ceil(companies.length / companiesPerPage) }, (_, index) => (
          <button key={index + 1} onClick={() => paginate(index + 1)} className={`page-btn ${currentPage === index + 1 ? 'active' : ''}`}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CompanyTable;
