import React, { useState } from 'react'; // Importing React and useState for managing state.
import axios from 'axios'; // Importing axios to make HTTP requests to the backend.
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importing FontAwesomeIcon for displaying icons.
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'; // Importing the envelope icon to use for sending emails.
import '../styles/SendEmailDialog.css'; // Importing the CSS for styling the email dialog.

const SendEmailDialog = ({ selectedEmails, onClose }) => {
  // State to track whether the emails are currently being sent
  const [sendingMail, setSendingMail] = useState(false);
  
  // State to store the status of sending emails (e.g., success or error)
  const [mailStatus, setMailStatus] = useState('');

  // Function to send emails to the selected companies when the user clicks the "Send Confirmation" button
  const handleSendEmails = async () => {
    console.log('Sending emails to:', selectedEmails); // Log the emails being sent for debugging.

    // Check if at least one email has been selected, if not, alert the user
    if (selectedEmails.length === 0) {
      alert('Please select at least one company to send emails.'); // Alert message for no selected emails.
      return; // Stop the function if no emails are selected.
    }

    setSendingMail(true); // Show a loader while emails are being sent.

    try {
      // Sending the selected emails to the backend using POST request
      const response = await axios.post('https://aastha-backend.onrender.com/api/jobs/send-mails', {
        emails: selectedEmails // Send the list of selected emails in the request body.
      });

      // Check if the response from the backend is successful (status 200)
      if (response.status === 200) {
        setMailStatus('Emails sent successfully!'); // Update the state with success message.
        console.log('Emails sent successfully!'); // Log success message for debugging.
      } else {
        setMailStatus('Failed to send emails. Please try again.'); // Show failure message if something went wrong.
        console.error('Failed to send emails.'); // Log failure for debugging.
      }
    } catch (error) {
      // Handle any errors that occur while sending the emails
      setMailStatus('Error while sending emails. Please check the logs.'); // Show error message to the user.
      console.error('Error while sending emails:', error); // Log the error details for debugging.
    } finally {
      // Once the sending process is done (successful or not):
      setSendingMail(false); // Stop showing the loader.
      setTimeout(() => {
        setMailStatus(''); // Clear the status message after 3 seconds.
      }, 3000); // 3-second delay before clearing the message.
      onClose(); // Close the email dialog after sending.
    }
  };

  return (
    <div className="mail-dialog">
      <h2>Send Confirmation Emails</h2> {/* Heading of the dialog box */}
      <p>Are you sure you want to send emails to the selected companies?</p> {/* Message prompting user for confirmation */}

      {/* Loader to show that the emails are being sent */}
      {sendingMail && <div className="loader">Sending emails...</div>}

      {/* Display success or error message */}
      {mailStatus && <div className="mail-status">{mailStatus}</div>}

      {/* Button to trigger sending emails */}
      <button className="submit-btn" onClick={handleSendEmails}>
        <FontAwesomeIcon icon={faEnvelope} /> Send Confirmation
      </button>

      {/* Button to close the dialog without sending emails */}
      <button className="cancel-btn" onClick={onClose}>Cancel</button>
    </div>
  );
};

export default SendEmailDialog; // Export the component so it can be used in other parts of the app.
