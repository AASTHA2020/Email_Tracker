import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import '../styles/AddCompanyForm.css';

const AddCompanyForm = ({ onCompanyAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    address: ''
  });
  const [showForm, setShowForm] = useState(false);
  const [showMailDialog, setShowMailDialog] = useState(false); // For email dialog
  const [showLoader, setShowLoader] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowLoader(true);
    document.body.classList.add('blur'); // Add blur to the background
    try {
      await axios.post('https://aastha-backend.onrender.com/api/jobs', formData);
      setTimeout(() => {
        setShowLoader(false); // Hide loader
        setShowForm(false); // Hide form
        onCompanyAdded(); // Refresh the table
        document.body.classList.remove('blur'); // Remove blur after data is added
        setFormData({ name: '', email: '', contact: '', address: '' }); // Reset form
      }, 2000); // Simulate a 2-second loader delay
    } catch (error) {
      console.error('Error adding company:', error);
      setShowLoader(false);
      document.body.classList.remove('blur'); // Remove blur in case of error
    }
  };

  const handleMailClick = () => {
    setShowMailDialog(true); // Show email dialog
  };

  const handleMailClose = () => {
    setShowMailDialog(false); // Close email dialog
  };

  return (
    <div>
      {/* Add Company Button with Icon */}
      <button className="add-company-btn" onClick={() => setShowForm(!showForm)}>
        <FontAwesomeIcon icon={faPlus} /> {showForm ? 'Close Form' : 'Add Company'}
      </button>

      {/* Button to trigger email dialog */}
      <button className="send-mail-btn" onClick={handleMailClick}>
        <FontAwesomeIcon icon={faEnvelope} /> Apply for MERN Developer
      </button>

      {/* Show loader after form submission */}
      {showLoader && <div className="loader">Adding Company...</div>}

      {/* Show form when Add Company button is clicked */}
      {showForm && !showLoader && (
        <form onSubmit={handleSubmit} className="add-company-form">
          <h2>Add Company</h2>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Company Name"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Contact"
            required
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            required
          />
          <button type="submit" className="submit-btn">Add Company</button>
          <button onClick={() => setShowForm(false)} className="cancel-btn">Cancel</button>
        </form>
      )}

      {/* Mail Dialog Box */}
      {showMailDialog && (
        <div className="mail-dialog">
          <h2>Apply for MERN Stack Developer</h2>
          <p><strong>Subject:</strong> Application for MERN Stack Developer Role</p>
          <textarea defaultValue="Hi, I am interested in the MERN Stack Developer position. I have extensive experience in MongoDB, Express, React, and Node.js. Looking forward to your response." />
          <button className="submit-btn" onClick={handleMailClose}>Send Confirmation</button>
          <button className="cancel-btn" onClick={handleMailClose}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default AddCompanyForm;
