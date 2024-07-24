import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand'
import { DraftPatient, Patient } from './types'

type PatientState = {
    patients: Patient[],
    addPatient: (data: DraftPatient) => void,
    removePatient: (id: Patient['id']) => void
}

const createPatient = (data : DraftPatient) : Patient => {
    return {...data, id: uuidv4()}
}

export const usePatientStore = create<PatientState>((set) => ({
    patients: [],
    addPatient: (data) => {
        const patient = createPatient(data)

        set((state) => ({
            patients: [...state.patients, patient]
        }))
    },

    removePatient: (id) => {

        set((state) => ({
            patients: state.patients.filter( patient => patient.id !== id)
        }))
    }
}))