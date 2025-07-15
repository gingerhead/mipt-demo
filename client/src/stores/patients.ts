import { create } from 'zustand';
import { type Meta, type Patient } from '../../api/__generated__/types';
import { z } from 'zod';
import { formSchema } from '@/forms/patient/schema.ts';
import { client } from '../../api/client.ts';

export interface PatientsStore {
  loading: boolean;
  patients: Record<string, Patient>;
  meta: Meta,
  createPatient: (data: z.infer<typeof formSchema>) => Promise<void>;
  updatePatient: (id: string, data: z.infer<typeof formSchema>) => Promise<void>;
  deletePatient: (id: string) => Promise<void>;
  search: (searchString: string, page?: number) => Promise<void>;
  getPatients: (page?: number) => Promise<void>;
}

export const usePatientsStore = create<PatientsStore>((set) => ({
  loading: false,
  patients: {},
  meta: {
    total: 0,
    lastPage: 0,
    currentPage: 0,
    perPage: 0,
    prev: null,
    next: null
  },
  createPatient: async (data) => {
    const response = await client.createPatient(data);
    if (response.statusText === 'Created') {
      const patient = response.data;
      set(({ patients }) => ({ patients: { [patient.id]: patient, ...patients } }));
    }
  },
  deletePatient: async (id) => {
    const response = await client.deletePatient(id);
    if (response.status === 200) {
      set(({ patients }) => ({
          patients: Object.fromEntries(
            Object.entries(patients).filter(([key]) => key !== id),
          ),
        }),
      );
    }
  },
  updatePatient: async (id, data) => {
    const response = await client.updatePatient(id, data);
    if (response.status === 200) {
      const patient = response.data;
      set(({ patients }) => {
        patients[patient.id] = patient;
        return {
          patients: { ...patients }
        }
      });
    }
  },
  search: async (searchString: string) => {
    const response = await client.getFilteredPatients(searchString);
    if (response.status === 200) {
      const patientsObject: Record<string, Patient> = {};
      for (const patient of response.data.data) {
        patientsObject[patient.id] = patient;
      }
      set(() => ({
        patients: patientsObject,
        meta: response.data.meta
      }));
    }
  },
  getPatients: async (page: number = 0) => {
    set(() => ({loading: true}));
    const response = await client.getPatients({ page });
    if (response.status === 200) {
      const patientsObject: Record<string, Patient> = {};
      for (const patient of response.data.data) {
        patientsObject[patient.id] = patient;
      }
      set(({ patients }) => ({
        patients: { ...patients, ...patientsObject },
        meta: response.data.meta,
        loading: false
      }));
    }
  },
}));
