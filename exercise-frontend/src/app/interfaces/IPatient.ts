// Need to explore Typescript further and see how best to share these static types in the solution

export interface IPatient {
    id: string,
    fullName: string,
    dateOfBirth: Date,
    contact: {
        email: string,
        phone: string
    },
    diagnosisStatus: string,
    notes?: string
}