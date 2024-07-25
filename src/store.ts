import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid';
import { DraftPatient, Patient } from './types'

type PatientState = {
    patients: Patient[],
    activeId: string,
    addPatient: (data: DraftPatient) => void,
    removePatient: (id: Patient['id']) => void,
    getPatientById: (id: Patient['id']) => void,
    updatePatient: (data: DraftPatient) => void
}

const createPatient = (data : DraftPatient) : Patient => {
    return {...data, id: uuidv4()}
}

export const usePatientStore = create<PatientState>()(
    devtools((set) => ({
        patients: [],
        activeId: '',

        addPatient: (data) => {
            const patient = createPatient(data)

            set((state) => ({
                patients: [...state.patients, patient],
                activeId: ''
            }))
        },

        removePatient: (id) => {

            set((state) => ({
                patients: state.patients.filter( patient => patient.id !== id)
            }))
        },

        getPatientById: (id) => {
            set(() => ({
                activeId: id
                
            }))
        },

        updatePatient: (data) => {
            set((state) => ({
                patients: state.patients.map( patient => patient.id === state.activeId ? {id: state.activeId, ...data} : patient ),
                activeId: ''                
            }))
        }
    })
))