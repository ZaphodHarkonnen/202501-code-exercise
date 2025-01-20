'use client'

import { useEffect, useState } from "react";
import dotenv from "dotenv"
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { IPatient } from "../interfaces/IPatient";
import Link from "next/link";

function editPatient(patient: IPatient, router: AppRouterInstance) {
    router.push("/patients/"+patient.id);
}

async function deletePatient(patient: IPatient, router: AppRouterInstance) {
    await fetch(process.env.NEXT_PUBLIC_API_URI + "/patients/" + patient.id, { method: "DELETE" })
        .then(() => router.refresh());
}

export default function Page() {
    const [patients, setPatients] = useState<Array<IPatient>>([]);
    dotenv.config()
    const router = useRouter();

    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_API_URI + "/patients")
            .then(res => res.json())
            .then(res => setPatients(res));
    }, []) // Not ideal but it does allow for one call on initial page render. Need to find a cleaner way of doing this.

    return (
        <div>
            {/* Formatting needs work as it currently all smooshes together. A side effect of the starter template style used. */}
            {/* This table would be an obvious candidate for pulling into a component. */}
            <table className="table table-striped p-10">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Contact Info</th>
                        <th>Diagnosis Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Would look at pulling this into a sub-component if going further. */}
                    {patients.map(patient => (<tr key={patient.fullName}>
                        <td>{patient.fullName}</td>
                        <td>{patient.contact.email}</td>
                        <td>{patient.diagnosisStatus}</td>
                        <td>
                            <button className="btn btn-sm btn-primary" onClick={() => editPatient(patient, router)}>Edit</button>
                            <button className={"btn btn-sm"} onClick={() => deletePatient(patient, router)}>Delete</button>
                        </td>
                    </tr>))}
                </tbody>
            </table>
            <Link className="p-4" href={"/patients/new/"}>New Patient</Link>
            <Link className="p-4" href={"/patients/"}>All Patients</Link>
        </div>
    )
}