const express = require('express');
const router = express.Router();

require('dotenv').config()

const mongoose = require('mongoose')

main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
}

const patientModelSchema = new mongoose.Schema({
    id: "string",
    dateOfBirth: "date",
    contact: {
        email: "string",
        phone: "string"
    },
    diagnosisStatus: "string",
    notes: "string"
});

const patientModel = mongoose.model("PatientModel", patientModelSchema);

function getPatients() {
    // Call into mongo and get all current patients
    return [];
}

router.get('/', (req, res) => {
    res.send(getPatients({
        id: "",
        fullName: "",
        dateOfBirth: new Date(),
        contact: {
            email: "",
            phoneNumber: ""
        },
        diagnosisStatus: "",
        notes: ""
    }));
})

function getPatient(id) {
    return {
        id: "",
        fullName: "",
        dateOfBirth: new Date(),
        contact: {
            email: "",
            phoneNumber: ""
        },
        diagnosisStatus: "",
        notes: ""
    }
}

router.get('/:id', (req, res) => {
    res.send(getPatient(req.params.id))
})


router.post('/:id', async (req, res) => {
    // updatePatient(req.params.id, req.body)
    let newPatient = new patientModel(req.body);
    await newPatient.save();
    res.send(req.body)
})

router.delete('/:id', (req, res) => {
    // deletePatient(req.params.id);
    res.status(204).end();
})

module.exports = router;