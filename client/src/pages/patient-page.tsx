import { usePatientsStore } from '@/stores/patients.ts';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.tsx';
import { Button } from '@/components/ui/button.tsx';
import { useModalStore } from '@/stores/modals.ts';

export const PatientPage = () => {
  const { patientId } = useParams<{ patientId: string } >();
  const patients = usePatientsStore(state => state.patients);
  const openModal = useModalStore((store) => store.openModal);
  const navigate = useNavigate();
  if (typeof patientId === 'undefined' || typeof patients[patientId] === 'undefined') { return null; }
  const patient = patients[patientId];

  const goBack = () => navigate(-1);
  const onEditClick = () => {
    openModal('edit-patient', { patient });
  };
  const onDeleteClick = () => {
    openModal('delete-patient', {
      firstName: patient.firstName,
      lastName: patient.lastName,
      patientId: patient.id
    });
  };

  return (
    <div>
      <div className='flex justify-between mt-8'>
        <button onClick={ goBack } className="flex gap-2 cursor-pointer opacity-75 items-center">
          <ArrowLeft size="20" />
          <div className="text-sm">Назад</div>
        </button>
        <div className='flex gap-4 '>
          <Button className='cursor-pointer' onClick={onEditClick}>Редактировать</Button>
          <Button variant='destructive' className='cursor-pointer' onClick={onDeleteClick}>Удалить</Button>
        </div>
      </div>
      <div className="text-5xl font-bold mt-8">{ patient.firstName } { patient.lastName }</div>
      <div className="mt-6">
        <div className="flex gap-2">
          <div className='min-w-[150px] font-[500]'>Дата рождения:</div>
          <div>{ new Date(patient.dateOfBirth).toLocaleDateString() }</div>
        </div>
      </div>
      <div className='w-[300px] h-[1px] bg-(--color-border) my-6'></div>
      <div className='text-xl font-[500]'>Контактная информация</div>
      <div className='mt-6 flex flex-col gap-2'>
        <div className='flex gap-2'>
          <div className='min-w-[150px] font-[500]'>Номер телефона:</div>
          <div>{ patient.phoneNumber }</div>
        </div>
        { patient.email && <div className='flex gap-2'>
          <div className='min-w-[150px] font-[500]'>E-mail:</div>
          <div>{ patient.email }</div>
        </div> }
      </div>
      { typeof patient.visits !== 'undefined' && patient.visits.length > 0 && <>
        <div className='w-[300px] h-[1px] bg-(--color-border) my-6'></div>
        <div className='text-xl font-[500]'>История посещений</div>
        <div className='mt-4'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Дата</TableHead>
                <TableHead>Статус</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              { patient.visits.map((visit) =>
                <TableRow key={visit.id} onClick={() => navigate(`/visits/${ visit.id }`)} className='cursor-pointer'>
                  <TableCell className="font-medium">{new Date(visit.visitDate).toLocaleDateString()}</TableCell>
                  <TableCell>{visit.status}</TableCell>
                </TableRow>
              ) }
            </TableBody>
          </Table>
        </div>
      </> }
    </div>
  )
}
