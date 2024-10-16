const mongoose = require('mongoose');

// Define the Company schema
const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  }
});

// Create and export the model
module.exports = mongoose.model('Company', companySchema);
