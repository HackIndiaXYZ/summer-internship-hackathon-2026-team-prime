const express = require("express");
const router = express.Router();
const Record = require("../models/Record");
const Block = require("../blockchain/block");
const multer = require("multer");

// Multer memory storage
const upload = multer();

// GET add record page
router.get("/add/:id", (req, res) => {
  res.render("addRecord", { patientId: req.params.id });
});

// POST add record
router.post("/add/:id", upload.single("file"), async (req, res) => {
  const lastRecord = await Record.findOne().sort({ date: -1 });
  let previousHash = lastRecord ? lastRecord.hash : "0";

  const block = new Block(
    req.params.id,
    req.body.doctor,
    req.body.diagnosis,
    previousHash
  );

  let fileObj = null;
  if (req.file) {
    fileObj = {
      data: req.file.buffer,
      contentType: req.file.mimetype,
      name: req.file.originalname
    };
  }

  await Record.create({
    patientId: req.params.id,
    doctor: req.body.doctor,
    symptoms: req.body.symptoms,
    diagnosis: req.body.diagnosis,
    medicines: req.body.medicines,
    tests: req.body.tests,
    file: fileObj,
    hash: block.hash,
    previousHash: block.previousHash
  });

  res.redirect("/patient/history/" + req.params.id);
});

// Route to serve file
router.get("/file/:id", async (req, res) => {
  const record = await Record.findById(req.params.id);
  if (!record || !record.file) return res.send("File not found");

  res.set("Content-Type", record.file.contentType);

  if (req.query.download === "true") {
    // download file
    res.set("Content-Disposition", `attachment; filename="${record.file.name}"`);
  } else {
    // view in browser
    res.set("Content-Disposition", `inline; filename="${record.file.name}"`);
  }

  res.send(record.file.data);
});

module.exports = router;