import { IPatient } from "@/app/interfaces/IPatient";
import PatientForm from "@/app/patients/components/patient-form";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {

    // This feels odd and is something I want to dig into further. Mostly to see if it's the appropriate pattern to use.
    const response = await fetch(process.env.NEXT_PUBLIC_API_URI + "/patients/" + (await params).slug)
    const patient: IPatient = await response.json();

    return (
        <div>
            <PatientForm patient={patient} method="PUT" />
        </div>
    )
}