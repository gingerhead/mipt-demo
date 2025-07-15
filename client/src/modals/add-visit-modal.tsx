import { BaseModal } from './base-modal';
import { MODALS, useModalStore } from '@/stores/modals.ts';
import { useVisitStore } from '@/stores/visits.ts';
import { VisitForm } from '@/forms/visit/visit-form.tsx';

export const AddVisitModal = (props: typeof MODALS['add-visit']) => {
  const closeModal = useModalStore((store) => store.closeModal);
  const onCloseModal = () => closeModal('add-visit');
  const createVisit = useVisitStore((state) => state.createVisit);

  return (
    <BaseModal title='Добавить посещение' {...props} onOpenChange={onCloseModal}>
      <VisitForm closeModal={onCloseModal} handleSubmit={createVisit}/>
    </BaseModal>
  );
};
