import React, { useState } from 'react'; 
import axios from 'axios'; 
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'; 
import '../styles/SendEmailDialog.css'; 

const SendEmailDialog = ({ selectedEmails, onClose }) => {
  const [sendingMail, setSendingMail] = useState(false);

  // Function triggered when clicking the Send Confirmation button
  const handleSendEmails = async () => {
    // Log the start of the function and the emails being processed
    console.log('Button clicked. Selected emails:', selectedEmails);

    // If no emails are selected, log an error and display a toast notification
    if (selectedEmails.length === 0) {
      console.log('No emails selected. Aborting email sending.');
      toast.error('Please select at least one company to send emails.');
      return; // Stop further execution
    }

    // Log that we are starting to send emails
    console.log('Sending email request to the backend...');

    // Show loader while emails are being sent
    setSendingMail(true);

    try {
      // Make the request to the backend to send emails
      const response = await axios.post('https://email-tracker-e20m.onrender.com/sendEmail', {
        emails: selectedEmails,
        subject: "Hii there",
        emailContent: "This is a test mail"
      });

      // Log the response status from the backend
      console.log('Backend response status:', response.status);

      // If emails are sent successfully, log and show a success message
      if (response.status === 200) {
        console.log('Emails sent successfully.');
        toast.success('Emails sent successfully!');
      } else {
        console.log('Failed to send emails. Status:', response.status);
        toast.error('Failed to send emails. Please try again.');
      }
    } catch (error) {
      // Log the error if there is a failure in sending emails
      console.error('Error while sending emails:', error.response ? error.response.status : error.message);
      toast.error(`Error while sending emails: ${error.response ? error.response.status : error.message}`);
    } finally {
      // Hide loader and log completion of the process
      setSendingMail(false);
      console.log('Email sending process finished.');
      onClose(); // Close the dialog after the process
    }
  };

  return (
    <div className="mail-dialog">
      <h2>Send Confirmation Emails</h2>
      <p>Are you sure you want to send emails to the selected companies?</p>

      {/* Display loader when emails are being sent */}
      {sendingMail && <div className="loader">Sending emails...</div>}

      {/* Send Confirmation button */}
      <button className="submit-btn" onClick={handleSendEmails}>
        <FontAwesomeIcon icon={faEnvelope} /> Send Confirmation
      </button>

      {/* Cancel button */}
      <button className="cancel-btn" onClick={onClose}>Cancel</button>

      {/* ToastContainer to display toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default SendEmailDialog;
