const express = require('express');
const router = express.Router();

require('dotenv').config()

const mongoose = require('mongoose')

main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
}

// Need to examine if placing in here is the appropriate pattern to use.
// It feels that the schema should be recorded elsewhere to make reuse in the solution simpler.
const patientModelSchema = new mongoose.Schema({
    id: "string",
    fullName: "string",
    dateOfBirth: "date",
    contact: {
        email: "string",
        phone: "string"
    },
    diagnosisStatus: "string",
    notes: "string"
});

const Patient = mongoose.model("Patient", patientModelSchema);

// Next steps are digging into ExpressJS functionality and finding out how much API documentation can be generated for consumers. 

router.get('/', async (_, res) => {
    var patients = await Patient.find({ id: { $exists: true } }).exec();
    res.send(patients);
})

router.get('/:id', async (req, res) => {
    let patient = await Patient.findOne({ id: req.params.id }).exec();
    res.send(patient)
})

router.post('/:id', async (req, res) => {
    let newPatient = new Patient(req.body);
    await newPatient.save();
    res.status(200).end();
})

router.put('/:id', async (req, res) => {
    const patient = new Patient(req.body);
    await Patient.findByIdAndUpdate(req.params._id, patient).exec();
    res.status(200).end();
})

router.delete('/:id', async (req, res) => {
    await Patient.deleteOne({ id: req.params.id }).exec();
    res.status(200).end();
})

module.exports = router;