import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import '../styles/AddCompanyForm.css';
import SendEmailDialog from './SendEmailDialog';

const AddCompanyForm = ({ onCompanyAdded, selectedEmails, setSelectedEmails }) => {

    // State to store the form data (for new company fields like name, email, etc.)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contact: '',
        address: ''
    });

    const [showForm, setShowForm] = useState(false);
    const [showMailDialog, setShowMailDialog] = useState(false);
    const [showLoader, setShowLoader] = useState(false);

    // This function is triggered when the user types in any of the form fields
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // This function is called when the user submits the form (to add a company)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowLoader(true);
        document.body.classList.add('blur');

        try {

            await axios.post('https://email-tracker-e20m.onrender.com/jobs/addMail', formData);

            setTimeout(() => {
                setShowLoader(false);
                setShowForm(false);
                onCompanyAdded();
                document.body.classList.remove('blur');
                setFormData({ name: '', email: '', contact: '', address: '' });
            }, 2000);

        } catch (error) {
            console.error('Error adding company:', error);
            setShowLoader(false);
            document.body.classList.remove('blur');
        }
    };

    // Function to handle clicking the "Apply for MERN Developer" button to show the email dialog
    const handleMailClick = () => {
        setShowMailDialog(true);
    };

    // Function to handle closing the email dialog
    const handleMailClose = () => {
        setShowMailDialog(false);
    };

    return (
        <div>
            {/* Button to toggle between showing and hiding the "Add Company" form */}
            <button className="add-company-btn" onClick={() => setShowForm(!showForm)}>
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

            {/* Mail Dialog Box for applying for MERN Developer role */}
            {showMailDialog && <SendEmailDialog onClose={handleMailClose} selectedEmails={selectedEmails} />}
        </div>
    );
};

export default AddCompanyForm;
