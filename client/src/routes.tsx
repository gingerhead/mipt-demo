import {
  createBrowserRouter,
} from 'react-router';
import { PatientList } from '@/pages/patient-list';
import { Dashboard } from '@/pages/dashboard.tsx';
import { PatientPage } from './pages/patient-page.tsx';
import { Layout } from '@/layouts/layout';
import { ErrorPage } from '@/pages/error-page.tsx';
import { usePatientsStore } from '@/stores/patients.ts';
import { client } from '../api/client';
import type { Patient, Visit } from '../api/__generated__/types';
import { VisitList } from '@/pages/visit-list.tsx';
import { useVisitStore } from '@/stores/visits.ts';
import { VisitPage } from '@/pages/visit-page';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Dashboard />
      },
      {
        path: '/patients',
        element: <PatientList />,
        loader: async () => {
          const response = await client.getPatients({page: 0})
          const patientsObject: Record<string, Patient> = {};
          for (const patient of response.data.data) {
            patientsObject[patient.id] = patient;
          }
          usePatientsStore.setState({ patients: patientsObject, meta: response.data.meta })
        },
      },
      {
        path: '/patients/:patientId',
        element: <PatientPage />,
        loader: async ({ params }) => {
          if (typeof params.patientId === 'undefined') { return; }
          const patientId = params.patientId;
          const patientResponse = await client.getPatientById(patientId);
          usePatientsStore.setState(({patients}) =>
            ({ patients: {...patients, [patientId]: patientResponse.data }}))
        },
      },
      {
        path: '/visits',
        element: <VisitList />,
        loader: async () => {
          const patientsResponse = await client.getAllPatients()
          const patientsObject: Record<string, Patient> = {};
          for (const patient of patientsResponse.data) {
            patientsObject[patient.id] = patient;
          }
          usePatientsStore.setState({ patients: patientsObject })
          const visitResponse = await client.getVisits()
          const visitsObject: Record<string, Visit> = {};
          for (const visit of visitResponse.data) {
            visitsObject[visit.id] = visit;
          }
          useVisitStore.setState({ visits: visitsObject })
        },
      },
      {
        path: '/visits/:visitId',
        element: <VisitPage />,
        loader: async ({ params }) => {
          if (typeof params.visitId === 'undefined') { return; }
          const visitId = params.visitId;
          const visitResponse = await client.getVisitById(visitId);
          useVisitStore.setState(({ visits }) => ({ visits: {...visits, [visitId]: visitResponse.data }}))
        },
      }
    ]
  }
]);
