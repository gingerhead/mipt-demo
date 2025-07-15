import { usePatientsStore } from '@/stores/patients.ts';
import { useNavigate } from 'react-router';
import { useModalStore } from '@/stores/modals.ts';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Pen, X } from 'lucide-react';
import { type SyntheticEvent } from 'react';
import type { Patient } from '../../api/__generated__/types';
import { PatientSearchForm } from '@/forms/patient/patient-search-form.tsx';
import { Skeleton } from '@/components/ui/skeleton.tsx';

export const PatientList = () => {
  // Возможно, использовать useShallow
  const { patients: patientsObject, meta, getPatients, loading } = usePatientsStore();
  const patients = Object.values(patientsObject);
  const openModal = useModalStore((store) => store.openModal);
  const navigate = useNavigate();

  const onAddPatient = () => {
    openModal('add-patient');
  };

  const onEditClick = (patient: Patient) => (e: SyntheticEvent) => {
    e.stopPropagation();
    openModal('edit-patient', { patient });
  };

  const onDeleteClick = (patient: Patient) => (e: SyntheticEvent) => {
    e.stopPropagation();
    openModal('delete-patient', {
      firstName: patient.firstName,
      lastName: patient.lastName,
      patientId: patient.id
    });
  };

  const loadMore = () => {
    if (meta.next) {
      getPatients(meta.next)
    }
  }

  return (
    <div className="mt-4">
      <div className="flex my-6">
        <PatientSearchForm className='w-full' />
        <div className='w-[1px] h-auto bg-(--color-border) mx-10'></div>
        <Button onClick={ onAddPatient } className="cursor-pointer">
          Добавить
        </Button>
      </div>
      { patients.length === 0 && <div className='text-center text-sm text-gray-400 mt-8'>Пациентов не найдено</div>}
      { patients.length > 0 && <Table>
        <TableCaption>Список пациентов</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Фамилия</TableHead>
            <TableHead className="w-[100px]">Имя</TableHead>
            <TableHead className="text-center">Номер телефона</TableHead>
            <TableHead className="w-[100px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          { patients.map((patient) =>
            <TableRow key={ patient.id } onClick={ () => navigate(`/patients/${ patient.id }`) }
                      className="group cursor-pointer">
              <TableCell className="font-medium">{ patient.lastName }</TableCell>
              <TableCell>{ patient.firstName }</TableCell>
              <TableCell className="text-center">{ patient.phoneNumber }</TableCell>
              <TableCell>
                <button onClick={ onEditClick(patient) }
                        className="group-hover:visible invisible cursor-pointer align-middle mx-2">
                  <Pen size={ 16 } />
                </button>
                <button onClick={ onDeleteClick(patient) }
                        className="group-hover:visible invisible cursor-pointer align-middle mx-2">
                  <X size={ 16 } />
                </button>
              </TableCell>
            </TableRow>,
          ) }
          { loading && Array.from({length: 3}).map((_v, i) => (
              <TableRow key={i}><TableCell colSpan={ 4 }><Skeleton className="h-[28px] w-full rounded-xl" /></TableCell></TableRow>
          )) }
        </TableBody>
      </Table> }
      { meta.next &&
        <Button onClick={ loadMore } className="mt-8 cursor-pointer align-right">Загрузить ещё</Button>
      }
    </div>
  );
};
