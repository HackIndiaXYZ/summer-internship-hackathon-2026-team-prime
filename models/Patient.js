const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String },
  patientId: { type: String, required: true, unique: true },
  aadhar: { type: String, required: true, unique: true },  // UNIQUE to prevent duplicates
  dob: { type: Date, required: true },
  email: { type: String },
  address: { type: String },

});

module.exports = mongoose.model("Patient", PatientSchema);