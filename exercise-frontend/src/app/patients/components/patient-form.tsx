'use client'

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IPatient } from "../../interfaces/IPatient";

type PatientFormProps = {
    patient?: IPatient,
    method: string // Not entirely happy putting the method here. Really should be handled by using a callback or other first class function instead.
}

export default function PatientForm({ patient: patientProp, method }: PatientFormProps) {
    const router = useRouter();
    // I'd like to look into typescript a bit more and see if there's a nicer way of doing this
    const [patient, setPatient] = useState<IPatient>(patientProp || {
        id: self.crypto.randomUUID(),
        fullName: "",
        dateOfBirth: new Date(),
        contact: {
            email: "",
            phone: ""
        },
        diagnosisStatus: "",
        notes: ""
    });
    // Flattened this out of the patient object to simplify input binding later on. 
    // Otherwise you run into annoyance trying to maintain nested state.
    const [contact, setContact] = useState(patient.contact) 
    // In a more full featured implementation this would be pulled from a database at some point. Simple enough right now to just have it static.
    const [diagnosisOptions] = useState(["", "Mild", "Moderate", "Severe"]) 

    // This is a bit hacky to use the built in date input type.
    // It only takes values in the ISO8601 string format so we need to do some massaging when the selected date bound value changes.
    const [dateOfBirth, setDateOfBirth] = useState("")

    useEffect(() => {
        setDateOfBirth((new Date(patient.dateOfBirth)).toISOString().split("T")[0]);
    }, [patient.dateOfBirth])

    async function createNewPatient(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const patientToSend = { ...patient, contact: contact };
        const headers = new Headers();
        headers.append("Content-Type", "application/json")
        await fetch(process.env.NEXT_PUBLIC_API_URI + "/patients/" + patient.id, {
            method: method,
            headers: headers,
            body: JSON.stringify(patientToSend)
        }).then(() => router.push("/patients"))
    }

    return (
        <div>
            <form onSubmit={(e) => createNewPatient(e)} className={"flex flex-col"}>
                <label>Full Name
                    <input type="text" placeholder="Full name" value={patient.fullName} required={true}
                        onChange={(e) => setPatient({ ...patient, fullName: e.target.value })} />
                </label>

                <label>Date of Birth
                    <input type="date" value={dateOfBirth}
                        onChange={(e) => setPatient({ ...patient, dateOfBirth: new Date(e.target.value) })}
                        min="1900-01-01"
                        max="2025-01-01"
                        required={true} />
                    {/* The min/max above would be calculated a bit more resiliently in a production system. Largely no future dates allowed. */}
                </label>

                <label>Email
                    <input type={"email"} placeholder={"Email"} value={contact.email} required={true}
                        onChange={(e) => setContact({ ...contact, email: e.target.value })} />
                </label>

                <label>Phone Number
                    <input type={"text"} placeholder={"Phone Number"} required={true} value={contact.phone}
                        onChange={(e) => setContact({ ...contact, phone: e.target.value })} />
                </label>

                <label>Diagnosis Status
                    <select value={patient.diagnosisStatus} required={true}
                        onChange={(e) => setPatient({
                            ...patient,
                            diagnosisStatus: e.target.value
                        })}>
                        {
                            diagnosisOptions.map((diagnosisOption) => {
                                return <option key={diagnosisOption} value={diagnosisOption}>{diagnosisOption}</option>
                            })
                        }
                    </select>
                </label>

                <label>Notes
                    <textarea value={patient.notes}
                        onChange={(e) => setPatient({ ...patient, notes: e.target.value })} />
                </label>

                <button type="submit">{patientProp ? "Update" : "Create New"} Patient</button>
            </form>
        </div>
    )
}