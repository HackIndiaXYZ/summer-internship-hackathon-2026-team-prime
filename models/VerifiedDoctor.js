const mongoose = require("mongoose")

const verifiedDoctorSchema = new mongoose.Schema({

name:String,
licenseNumber:String,
state:String,
hospital:String

})

module.exports = mongoose.model("VerifiedDoctor",verifiedDoctorSchema)