'use client'

import {useEffect, useState} from "react";

export default function Page() {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/api/patients").then(res => res.json()).then(res => setPatients(res));
    })
    return (
        <div>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Contact Info</th>
                    <th>Diagnosis Status</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {patients.map(patient => (<tr key={patient.name}>
                    <td>{patient.name}</td>
                    <td>{patient.contactInfo}</td>
                    <td>{patient.diagnosisStatus}</td>
                    <td>
                        <button className="btn btn-sm btn-primary" onClick={() => editPatient(patient)}>Edit</button>
                        <button className={"btn btn-sm"} onClick={() => deletePatient(patient)}>Delete</button>
                    </td>
                </tr>))}
                </tbody>
            </table>
        </div>
    )
}