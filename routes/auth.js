const express = require("express")
const router = express.Router()

const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const Doctor = require("../models/Doctor")
const VerifiedDoctor = require("../models/VerifiedDoctor")

/* =========================
   Doctor Register Page
========================= */

router.get("/register",(req,res)=>{
res.render("register")
})


/* =========================
   Doctor Register Logic
========================= */

router.post("/register",async(req,res)=>{

const verified = await VerifiedDoctor.findOne({
licenseNumber:req.body.license
})

if(!verified){
return res.send("Invalid medical license")
}

const hashedPassword = await bcrypt.hash(req.body.password,10)

const doctor = await Doctor.create({
name:req.body.name,
clinic:req.body.clinic,
license:req.body.license,
password:hashedPassword
})

res.redirect("/auth/login")

})


/* =========================
   Doctor Login Page
========================= */

router.get("/login",(req,res)=>{
res.render("login")
})


/* =========================
   Doctor Login Logic
========================= */

router.post("/login",async(req,res)=>{

const doctor = await Doctor.findOne({
name:req.body.name
})

if(!doctor){
return res.send("Doctor not found")
}

const validPassword = await bcrypt.compare(
req.body.password,
doctor.password
)

if(!validPassword){
return res.send("Invalid password")
}

const token = jwt.sign(
{doctorId:doctor._id},
process.env.JWT_SECRET
)

/* token generated but we redirect */

res.redirect("/dashboard")

})

module.exports = router