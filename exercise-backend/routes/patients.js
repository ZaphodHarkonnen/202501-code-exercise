const express = require('express');
const router = express.Router();

function getPatients() {
    // Call into mongo and get all current patients
    return [];
}

router.get('/', (req, res) => {
    res.send(getPatients());
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
    };
}

router.get('/:id', (req, res) => {
    res.send(getPatient(req.params.id))
})

function updatePatient(id, body) {
    return body;
}

router.post('/:id', (req, res) => {
    updatePatient(req.params.id, req.body)
})

function deletePatient(id) {

    return true;
}

router.delete('/:id', (req, res) => {
    deletePatient(req.params.id);
    res.status(204).end();
})