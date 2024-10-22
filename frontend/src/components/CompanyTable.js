import React, { useEffect, useState } from 'react'; // Importing React hooks (useEffect, useState) to manage component state and side effects.
import axios from 'axios'; // Importing axios for making HTTP requests to the backend.
import SendEmailDialog from './SendEmailDialog'; // Importing the email dialog component for sending confirmation emails.
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importing FontAwesomeIcon for displaying icons.
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'; // Importing icons for edit and delete actions.
import '../styles/CompanyTable.css'; // Importing the CSS for styling this component.

const CompanyTable = ({ refreshTable }) => { 
  // Component starts here, `refreshTable` is a prop to refresh company data.
  const [companies, setCompanies] = useState([]); // This stores the list of companies fetched from the backend.
  const [loading, setLoading] = useState(true); // This keeps track of whether the data is still being fetched.
  const [error, setError] = useState(null); // This stores any errors that occur while fetching data.
  const [editingCompany, setEditingCompany] = useState(null); // This keeps track of the company that is currently being edited.
  const [currentPage, setCurrentPage] = useState(1); // This keeps track of the current page number for pagination.
  const [companiesPerPage] = useState(10); // This sets the number of companies displayed per page (fixed at 10).
  const [selectedEmails, setSelectedEmails] = useState([]); // This holds the emails of companies selected via checkboxes.
  const [showMailDialog, setShowMailDialog] = useState(false); // This controls whether the "send email" dialog box is shown.

  // This function runs when the component loads or `refreshTable` changes.
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        console.log('Fetching companies from backend...'); // Logging for debugging purposes.
        const response = await axios.get('https://aastha-backend.onrender.com/api/jobs'); // Making a GET request to fetch company data from backend API.
        setCompanies(response.data); // Storing the fetched companies in the state.
        console.log('Fetched companies:', response.data); // Logging the fetched companies for debugging.
      } catch (error) {
        console.error('Error fetching companies:', error); // Logging errors if fetching fails.
        setError('Error fetching companies'); // Storing the error message in state to display to the user.
      } finally {
        setLoading(false); // Whether successful or failed, stop the loading spinner after the fetch attempt.
      }
    };

    fetchCompanies(); // Call the function to fetch companies when the component loads.
  }, [refreshTable]); // Re-run the fetch function whenever `refreshTable` changes.

  // This function is called when the user clicks a checkbox to select/unselect a company email.
  const handleCheckboxChange = (companyEmail) => {
    console.log('Toggling selection for email:', companyEmail); // Logging the email being selected or unselected.

    setSelectedEmails((prevSelectedEmails) => {
      // Expanding the current list of selected emails.
      if (prevSelectedEmails.includes(companyEmail)) {
        // If the email is already in the list, we remove it.
        console.log('Removing email:', companyEmail); // Logging the removal of the email.
        return prevSelectedEmails.filter((email) => email !== companyEmail); // Filtering out the email to remove it from the array.
      } else {
        // If the email isn't in the list, we add it.
        console.log('Adding email:', companyEmail); // Logging the addition of the email.
        return [...prevSelectedEmails, companyEmail]; // Adding the email to the selectedEmails array.
      }
    });
  };

  // When the "edit" button is clicked, this function is triggered.
  const handleEdit = (company) => {
    console.log('Editing company:', company); // Logging the company being edited.
    setEditingCompany(company); // Storing the company details in `editingCompany` so they can be edited.
  };

  // When the form to edit the company is submitted, this function is triggered.
  const handleUpdate = async (e) => {
    e.preventDefault(); // Prevents the form from refreshing the page when submitted.
    console.log('Updating company:', editingCompany); // Logging the company being updated.

    try {
      // Sending the updated company details to the backend via PUT request.
      await axios.put(`https://aastha-backend.onrender.com/api/jobs/${editingCompany._id}`, editingCompany);
      // Updating the companies state with the edited company data.
      setCompanies(companies.map((company) => company._id === editingCompany._id ? editingCompany : company));
      setEditingCompany(null); // Clearing the editing state after the update is done.
    } catch (error) {
      console.error('Error updating company:', error); // Logging any errors during the update.
    }
  };

  // This function is called every time the user changes something in the edit form (like typing in a field).
  const handleEditChange = (e) => {
    // Expanding `editingCompany` object to update the specific field being edited.
    setEditingCompany({
      ...editingCompany, // Copying the existing values of the company being edited.
      [e.target.name]: e.target.value // Updating only the specific field (e.g., name, email) based on what the user is typing.
    });
  };

  // When the user clicks the "delete" button, this function is triggered to delete the company.
  const handleDelete = async (id) => {
    console.log('Deleting company with id:', id); // Logging which company is being deleted.
    try {
      // Sending a DELETE request to the backend to delete the company by its ID.
      await axios.delete(`https://aastha-backend.onrender.com/api/jobs/${id}`);
      // Removing the deleted company from the state, so it's no longer shown on the page.
      setCompanies(companies.filter((company) => company._id !== id));
    } catch (error) {
      console.error('Error deleting company:', error); // Logging any errors during deletion.
    }
  };

  // Logic for pagination: calculates which companies should be displayed based on the current page.
  const indexOfLastCompany = currentPage * companiesPerPage; // Calculates the last company index on the current page.
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage; // Calculates the first company index on the current page.
  const currentCompanies = companies.slice(indexOfFirstCompany, indexOfLastCompany); // Slices the companies array to get only the companies on the current page.

  // Function to handle page changes in pagination.
  const paginate = (pageNumber) => setCurrentPage(pageNumber); // Updates the current page number.

  // Function to display the row number for each company in the table (based on pagination).
  const getRowNumber = (index) => indexOfFirstCompany + index + 1; // Calculates the company’s number (e.g., 1, 2, 3) based on pagination.

  return (
    <div className="company-table-container">
      {/* Display loading message while the data is being fetched */}
      {loading && <p>Loading...</p>}
      {/* Display error message if there was an issue fetching the data */}
      {error && <p>{error}</p>}

      {/* Display form to edit a company when editing is active */}
      {editingCompany && (
        <form onSubmit={handleUpdate} className="edit-company-form">
          <h2>Edit Company</h2>
          {/* Input fields to update company name, email, contact, and address */}
          <input type="text" name="name" value={editingCompany.name} onChange={handleEditChange} required />
          <input type="email" name="email" value={editingCompany.email} onChange={handleEditChange} required />
          <input type="text" name="contact" value={editingCompany.contact} onChange={handleEditChange} required />
          <input type="text" name="address" value={editingCompany.address} onChange={handleEditChange} required />
          <button type="submit" className="submit-btn">Update</button>
          <button onClick={() => setEditingCompany(null)} className="cancel-btn">Cancel</button>
        </form>
      )}

      {/* Display the list of companies in a table */}
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
                {/* Checkbox to select company emails for sending confirmation */}
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange(company.email)} // Call `handleCheckboxChange` when user clicks checkbox
                  checked={selectedEmails.includes(company.email)} // Checkbox is checked if the email is selected
                />
              </td>
              <td>{getRowNumber(index)}</td> {/* Show row number based on pagination */}
              <td>{company.name}</td> {/* Display company name */}
              <td>{company.email}</td> {/* Display company email */}
              <td>{company.contact}</td> {/* Display company contact */}
              <td>{company.address}</td> {/* Display company address */}
              <td>
                {/* Edit button */}
                <button className="icon-btn edit-btn" onClick={() => handleEdit(company)}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                {/* Delete button */}
                <button className="icon-btn delete-btn" onClick={() => handleDelete(company._id)}>
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls to navigate between pages */}
      <div className="pagination">
        {Array.from({ length: Math.ceil(companies.length / companiesPerPage) }, (_, index) => (
          <button key={index + 1} onClick={() => paginate(index + 1)} className={`page-btn ${currentPage === index + 1 ? 'active' : ''}`}>
            {index + 1}
          </button>
        ))}
      </div>

      {/* Display the SendEmailDialog component when the email dialog is open */}
      {showMailDialog && (
        <SendEmailDialog selectedEmails={selectedEmails} onClose={() => setShowMailDialog(false)} />
      )}
    </div>
  );
};

export default CompanyTable; // Export the component for use in other parts of the app.
