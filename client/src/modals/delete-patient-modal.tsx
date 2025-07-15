import { BaseModal } from './base-modal';
import { useModalStore, MODALS } from '@/stores/modals.ts';
import { Button } from '@/components/ui/button.tsx';
import { usePatientsStore } from '@/stores/patients.ts';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { getErrorMessage } from '@/lib/get-error-message.ts';

export const DeletePatientModal = ({
  meta: { firstName, lastName, patientId } = { firstName: '', lastName: '', patientId: null },
  ...props}: typeof MODALS['delete-patient']
) => {
  const closeModal = useModalStore((store) => store.closeModal);
  const onCloseModal = () => closeModal('delete-patient');
  const deletePatient = usePatientsStore((state) => state.deletePatient);
  const navigate = useNavigate();

  const onDelete = () => {
    if (!patientId) { return; }
    deletePatient(patientId)
      .then(() => {
        closeModal('delete-patient');
        navigate('/patients');
      })
      .catch((err) => {
        toast(getErrorMessage(err))
      })
  }

  return (
    <BaseModal { ...props } onOpenChange={onCloseModal}>
      <div className='mt-6 mb-4'>Вы уверены, что хотите удалить пациента { firstName } { lastName }?
      </div>
      <div className='flex gap-4 justify-end'>
        <Button className='cursor-pointer' onClick={onDelete}>Удалить</Button>
        <Button className='cursor-pointer' onClick={onCloseModal} variant='outline'>Отмена</Button>
      </div>
    </BaseModal>
  );
};
