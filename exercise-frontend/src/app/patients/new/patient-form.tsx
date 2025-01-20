'use client'

import React, {useState} from "react";
import {useRouter} from "next/navigation";

export default function PatientForm() {
    const router = useRouter();
    const [newPatient, setNewPatient] = useState({
        FullName: "",
        DateOfBirth: new Date(),
        Email: "",
        PhoneNumber: "",
        adhdDiagnosisSelection: "",
        notes: ""
    });
    const [adhdDiagnosisOptions] = useState(["Mild", "Moderate", "Severe"])

    function createNewPatient(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        fetch("/patient/create", {
            body: JSON.stringify(newPatient),
            method: "POST"
        }).then(res => router.push("/patient"))
    }

    return <div>
        <form onSubmit={(e) => createNewPatient(e)} className={"flex flex-col"}>
            <label>Full Name
                <input type="text" placeholder="Full name" value={newPatient.FullName}
                       onChange={(e) => setNewPatient({...newPatient, FullName: e.target.value})}/>
            </label>
            {/*<input type="date" value={newPatient.DateOfBirth}/>*/}
            <label>Email
                <input type={"text"} placeholder={"Email"} value={newPatient.Email}
                       onChange={(e) => setNewPatient({...newPatient, Email: e.target.value})}/>
            </label>
            <label>Phone Number
                <input type={"text"} placeholder={"Phone Number"} value={newPatient.PhoneNumber}
                       onChange={(e) => setNewPatient({
                           ...newPatient,
                           PhoneNumber: e.target.value
                       })}/></label>
            <label>ADHD Diagnosis
                <select value={newPatient.adhdDiagnosisSelection}
                        onChange={(e) => setNewPatient({
                            ...newPatient,
                            adhdDiagnosisSelection: e.target.value
                        })}>
                    {
                        adhdDiagnosisOptions.map((adhdOption) => {
                            return <option key={adhdOption} value={adhdOption}>{adhdOption}</option>
                        })
                    }
                </select></label>
            <button type="submit">Create New Patient</button>
        </form>
    </div>
}