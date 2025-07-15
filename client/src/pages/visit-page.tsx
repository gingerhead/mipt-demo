import { Link, useNavigate, useParams } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { useVisitStore } from '@/stores/visits.ts';
import { Button } from '@/components/ui/button.tsx';
import { useModalStore } from '@/stores/modals.ts';

export const VisitPage = () => {
  const { visitId } = useParams<{ visitId: string }>();
  const visits = useVisitStore(state => state.visits);
  const navigate = useNavigate();
  const openModal = useModalStore((store) => store.openModal);
  if (typeof visitId === 'undefined' || typeof visits[visitId] === 'undefined' ) { return null; }
  const visit = visits[visitId];

  const goBack = () => navigate(-1);
  const onEditClick = () => {
    openModal('edit-visit', { visit });
  };
  const onDeleteClick = () => {
    openModal('delete-visit', {
      firstName: visit.patient?.firstName,
      lastName: visit.patient?.lastName,
      visitDate: visit.visitDate,
      visitId: visit.id
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
          <Button className='cursor-pointer' onClick={ onEditClick }>Редактировать</Button>
          <Button variant='destructive' className='cursor-pointer' onClick={ onDeleteClick }>Удалить</Button>
        </div>
      </div>
      <div className='text-3xl font-bold mt-8'>{ new Date(visit.visitDate).toLocaleDateString() }</div>
      <div className="flex flex-col gap-4 mt-6">
        { typeof visit.patient !== 'undefined' &&
          <div className='flex gap-2'>
            <div className='min-w-[150px] font-[500]'>Пациент:</div>
            <Link to={ `/patients/${ visit.patient.id }` }
                  className='text-blue-500 underline hover:no-underline'>{ visit.patient.firstName } { visit.patient.lastName }</Link>
          </div>
        }
        <div className="flex gap-2">
          <div className="min-w-[150px] font-[500]">Статус:</div>
          <div>{ visit.status }</div>
        </div>
        <div className="flex gap-2">
          <div className="min-w-[150px] font-[500]">Диагноз:</div>
          <div>{ visit.diagnosis }</div>
        </div>
        <div className="flex gap-2">
          <div className="min-w-[150px] font-[500]">Назначение:</div>
          <div>{ visit.treatment }</div>
        </div>
        { visit.notes && <div className="flex gap-2">
          <div className="min-w-[150px] font-[500]">Комментарий:</div>
          <div>{ visit.notes }</div>
        </div> }
      </div>
    </div>
  )
}
