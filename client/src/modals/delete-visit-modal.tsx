import { BaseModal } from './base-modal';
import { useModalStore, MODALS } from '@/stores/modals.ts';
import { Button } from '@/components/ui/button.tsx';
import { useNavigate } from 'react-router';
import { useVisitStore } from '@/stores/visits.ts';
import { toast } from 'sonner';
import { getErrorMessage } from '@/lib/get-error-message.ts';

export const DeleteVisitModal = ({
  meta: { firstName, lastName, visitDate, visitId } = { firstName: '', lastName: '', visitDate: '', visitId: null },
  ...props}: typeof MODALS['delete-visit']
) => {
  const closeModal = useModalStore((store) => store.closeModal);
  const onCloseModal = () => closeModal('delete-visit');
  const deleteVisit = useVisitStore((state) => state.deleteVisit);
  const navigate = useNavigate();

  const onDelete = () => {
    if (!visitId) { return; }
    deleteVisit(visitId)
      .then(() => {
        closeModal('delete-visit');
        navigate('/visits');
      })
      .catch((err) => {
        toast(getErrorMessage(err))
      })
  }

  return (
    <BaseModal { ...props } onOpenChange={onCloseModal}>
      <div className='mt-6 mb-4'>Вы уверены, что хотите удалить посещение { new Date(visitDate).toLocaleDateString() } у пациента { firstName } { lastName }?
      </div>
      <div className='flex gap-4 justify-end'>
        <Button className='cursor-pointer' onClick={onDelete}>Удалить</Button>
        <Button className='cursor-pointer' onClick={onCloseModal} variant='outline'>Отмена</Button>
      </div>
    </BaseModal>
  );
};
