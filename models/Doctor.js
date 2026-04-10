const mongoose = require("mongoose")

const doctorSchema = new mongoose.Schema({

name:String,
clinic:String,
license:String,
password:String

})

module.exports = mongoose.model("Doctor",doctorSchema)