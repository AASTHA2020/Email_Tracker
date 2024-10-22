import React, { useState } from 'react'; // Importing React and useState to manage component state.
import axios from 'axios'; // Importing axios for making HTTP requests to the backend.
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importing FontAwesomeIcon to use icons.
import { faPlus, faEnvelope } from '@fortawesome/free-solid-svg-icons'; // Importing specific icons (plus for add, envelope for email).
import '../styles/AddCompanyForm.css'; // Importing CSS for styling this form.

const AddCompanyForm = ({ onCompanyAdded }) => {
  // State to store the form data (for new company fields like name, email, etc.)
  const [formData, setFormData] = useState({
    name: '', // Company name field
    email: '', // Company email field
    contact: '', // Company contact field
    address: '' // Company address field
  });

  // State to toggle between showing and hiding the form
  const [showForm, setShowForm] = useState(false);
  
  // State to control whether the "mail" dialog box is shown
  const [showMailDialog, setShowMailDialog] = useState(false);

  // State to show the loader when form is being submitted
  const [showLoader, setShowLoader] = useState(false);

  // This function is triggered when the user types in any of the form fields
  const handleChange = (e) => {
    setFormData({
      ...formData, // Expanding formData to retain other fields while updating only the field that changed
      [e.target.name]: e.target.value // Updating the specific field that was changed (e.g., name, email)
    });
  };

  // This function is called when the user submits the form (to add a company)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the form from refreshing the page when submitted.
    setShowLoader(true); // Show the loader while the form is submitting.
    document.body.classList.add('blur'); // Apply a blur effect to the background while submitting.

    try {
      // Sending a POST request to the backend to add a new company.
      await axios.post('https://aastha-backend.onrender.com/api/jobs', formData);

      // After successfully adding the company:
      setTimeout(() => {
        setShowLoader(false); // Hide the loader after submission is complete.
        setShowForm(false); // Close the form after adding the company.
        onCompanyAdded(); // Call the callback function to refresh the company list.
        document.body.classList.remove('blur'); // Remove the blur effect from the background.
        // Reset the form fields to blank
        setFormData({ name: '', email: '', contact: '', address: '' });
      }, 2000); // Simulate a 2-second delay for the loader (to show a "processing" effect).
    } catch (error) {
      // If there's an error during the form submission:
      console.error('Error adding company:', error); // Log the error to the console.
      setShowLoader(false); // Stop the loader if submission fails.
      document.body.classList.remove('blur'); // Remove the blur effect even if there's an error.
    }
  };

  // Function to handle clicking the "Apply for MERN Developer" button to show the email dialog
  const handleMailClick = () => {
    setShowMailDialog(true); // Open the email dialog
  };

  // Function to handle closing the email dialog
  const handleMailClose = () => {
    setShowMailDialog(false); // Close the email dialog
  };

  return (
    <div>
      {/* Button to toggle between showing and hiding the "Add Company" form */}
      <button className="add-company-btn" onClick={() => setShowForm(!showForm)}>
        {/* FontAwesome icon and button label */}
        <FontAwesomeIcon icon={faPlus} /> {showForm ? 'Close Form' : 'Add Company'}
      </button>

      {/* Button to open the email dialog box */}
      <button className="send-mail-btn" onClick={handleMailClick}>
        <FontAwesomeIcon icon={faEnvelope} /> Apply for MERN Developer
      </button>

      {/* Show the loader after form submission */}
      {showLoader && <div className="loader">Adding Company...</div>}

      {/* Show the form if the user clicked on "Add Company" */}
      {showForm && !showLoader && (
        <form onSubmit={handleSubmit} className="add-company-form">
          <h2>Add Company</h2>
          {/* Input fields for company name, email, contact, and address */}
          <input
            type="text"
            name="name"
            value={formData.name} // Form data for name
            onChange={handleChange} // Update form data on change
            placeholder="Company Name" // Placeholder text for input
            required // Field is required
          />
          <input
            type="email"
            name="email"
            value={formData.email} // Form data for email
            onChange={handleChange} // Update form data on change
            placeholder="Email" // Placeholder text for input
            required // Field is required
          />
          <input
            type="text"
            name="contact"
            value={formData.contact} // Form data for contact
            onChange={handleChange} // Update form data on change
            placeholder="Contact" // Placeholder text for input
            required // Field is required
          />
          <input
            type="text"
            name="address"
            value={formData.address} // Form data for address
            onChange={handleChange} // Update form data on change
            placeholder="Address" // Placeholder text for input
            required // Field is required
          />
          <button type="submit" className="submit-btn">Add Company</button> {/* Button to submit the form */}
          <button onClick={() => setShowForm(false)} className="cancel-btn">Cancel</button> {/* Button to close the form */}
        </form>
      )}

      {/* Mail Dialog Box for applying for MERN Developer role */}
      {showMailDialog && (
        <div className="mail-dialog">
          <h2>Apply for MERN Stack Developer</h2>
          {/* Email content for applying for the developer role */}
          <p><strong>Subject:</strong> Application for MERN Stack Developer Role</p>
          <textarea defaultValue="Hi, I am interested in the MERN Stack Developer position. I have extensive experience in MongoDB, Express, React, and Node.js. Looking forward to your response." />
          <button className="submit-btn" onClick={handleMailClose}>Send Confirmation</button> {/* Button to "send" the email */}
          <button className="cancel-btn" onClick={handleMailClose}>Cancel</button> {/* Button to close the email dialog */}
        </div>
      )}
    </div>
  );
};

export default AddCompanyForm; // Export the component so it can be used elsewhere.
