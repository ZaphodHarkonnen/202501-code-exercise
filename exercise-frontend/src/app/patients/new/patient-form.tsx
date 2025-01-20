'use client'

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function PatientForm() {
    const router = useRouter();
    const [newPatient, setNewPatient] = useState({
        id: "",
        fullName: "",
        dateOfBirth: new Date(),
        contact: {
            email: "",
            phoneNumber: ""
        },
        diagnosisStatus: "",
        notes: ""
    });
    const [diagnosisOptions] = useState(["Mild", "Moderate", "Severe"])

    function createNewPatient(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        fetch("/patient/create", {
            body: JSON.stringify(newPatient),
            method: "POST"
        }).then(() => router.push("/patient"))
    }

    return <div>
        <form onSubmit={(e) => createNewPatient(e)} className={"flex flex-col"}>
            <label>Full Name
                <input type="text" placeholder="Full name" value={newPatient.fullName}
                    onChange={(e) => setNewPatient({ ...newPatient, fullName: e.target.value })} />
            </label>
            {/*<input type="date" value={newPatient.dateOfBirth}/>*/}
            <label>Email
                <input type={"text"} placeholder={"Email"} value={newPatient.contact.email}
                    onChange={(e) => setNewPatient({ ...newPatient, contact: { ...newPatient.contact, email: e.target.value } })} />
            </label>
            <label>Phone Number
                <input type={"text"} placeholder={"Phone Number"} value={newPatient.contact.phoneNumber}
                    onChange={(e) => setNewPatient({
                        ...newPatient, contact:
                            { ...newPatient.contact, phoneNumber: e.target.value }
                    })} /></label>
            <label>ADHD Diagnosis
                <select value={newPatient.diagnosisStatus}
                    onChange={(e) => setNewPatient({
                        ...newPatient,
                        diagnosisStatus: e.target.value
                    })}>
                    {
                        diagnosisOptions.map((diagnosisOption) => {
                            return <option key={diagnosisOption} value={diagnosisOption}>{diagnosisOption}</option>
                        })
                    }
                </select></label>
            <button type="submit">Create New Patient</button>
        </form>
    </div>
}