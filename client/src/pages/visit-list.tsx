import { Link, useNavigate } from 'react-router';
import { useModalStore } from '@/stores/modals.ts';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button';
import { useVisitStore } from '@/stores/visits.ts';
import { Pen, X } from 'lucide-react';
import type { Visit } from '../../api/__generated__/types';
import type { SyntheticEvent } from 'react';

export const VisitList = () => {
  // Возможно, использовать useShallow
  const visitsObject = useVisitStore((state) => state.visits);
  const visits = Object.values(visitsObject);
  const openModal = useModalStore((store) => store.openModal);
  const navigate = useNavigate();

  const onAddVisit = () => {
    openModal('add-visit');
  };

  const onEditClick = (visit: Visit) => (e: SyntheticEvent) => {
    e.stopPropagation();
    openModal('edit-visit', { visit });
  };

  const onDeleteClick = (visit: Visit) => (e: SyntheticEvent) => {
    e.stopPropagation();
    openModal('delete-visit', {
      firstName: visit.patient?.firstName,
      lastName: visit.patient?.lastName,
      visitId: visit.id,
      visitDate: visit.visitDate
    });
  };

  return (
    <div className='mt-4'>
      <div className="flex justify-end my-6">
        <div className="w-[1px] h-auto bg-(--color-border) mx-10"></div>
        <Button onClick={ onAddVisit } className="cursor-pointer">
          Добавить
        </Button>
      </div>
      <Table>
        <TableCaption>Список посещений</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Дата</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead>Пациент</TableHead>
            <TableHead className="w-[100px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          { visits.map((visit) =>
            <TableRow key={ visit.id } onClick={ () => navigate(`/visits/${ visit.id }`) }
                      className='group cursor-pointer'>
              <TableCell className="font-medium">{ new Date(visit.visitDate).toLocaleDateString() }</TableCell>
              <TableCell>{ visit.status }</TableCell>
              { typeof visit.patient !== 'undefined' && <TableCell>
                <Link onClick={ (e) => e.stopPropagation() } to={ `/patients/${ visit.patient.id }` }
                      className='text-blue-500 underline hover:no-underline'
                >
                  { visit.patient.firstName } { visit.patient.lastName }
                </Link>
              </TableCell> }
              <TableCell>
                <button onClick={ onEditClick(visit) }
                        className="group-hover:visible invisible cursor-pointer align-middle mx-2">
                  <Pen size={ 16 } />
                </button>
                <button onClick={ onDeleteClick(visit) }
                        className="group-hover:visible invisible cursor-pointer align-middle mx-2">
                  <X size={ 16 } />
                </button>
              </TableCell>
            </TableRow>
          ) }
        </TableBody>
      </Table>
    </div>
  );
};
