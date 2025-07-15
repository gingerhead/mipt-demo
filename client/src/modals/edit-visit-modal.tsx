import { z } from 'zod';
import { BaseModal } from './base-modal';
import { MODALS, useModalStore } from '@/stores/modals.ts';
import { formSchema } from '@/forms/visit/schema.ts';
import { useVisitStore } from '@/stores/visits.ts';
import { VisitForm } from '@/forms/visit/visit-form.tsx';

export const EditVisitModal = ({
  meta: { visit } = { visit: null },
  ...props
}: typeof MODALS['edit-visit']) => {
  const closeModal = useModalStore((store) => store.closeModal);
  const onCloseModal = () => closeModal('edit-visit');
  const updateVisit = useVisitStore((state) => state.updateVisit);
  const handleSubmit = (id: string) => (data: z.infer<typeof formSchema>) => updateVisit(id, data);

  if (!visit) {
    return (
      <BaseModal title="Редактировать посещение" onOpenChange={ onCloseModal } { ...props }>
        <div>Loading...</div>
      </BaseModal>
    )
  }

  return (
    <BaseModal title='Редактировать пациента' onOpenChange={onCloseModal} {...props}>
      <VisitForm closeModal={ onCloseModal } initialValues={ visit } handleSubmit={handleSubmit(visit.id)} />
    </BaseModal>
  );
};
