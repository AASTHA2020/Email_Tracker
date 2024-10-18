import React, { useState } from 'react';
import axios from 'axios';

const AddCompanyForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    address: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/jobs', formData);
      console.log('Company added successfully:', response.data);
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Company Name" required />
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      <input type="text" name="contact" value={formData.contact} onChange={handleChange} placeholder="Contact" required />
      <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" required />
      <button type="submit">Add Company</button>
    </form>
  );
};

export default AddCompanyForm;
