import { type PropsWithChildren } from 'react';
import { AddPatientModal } from '@/modals/add-patient-modal.tsx';
import { useModalStore } from '@/stores/modals.ts';
import { DeletePatientModal } from '@/modals/delete-patient-modal.tsx';
import { EditPatientModal } from '@/modals/edit-patient-modal.tsx';
import { AddVisitModal } from '@/modals/add-visit-modal.tsx';
import { EditVisitModal } from '@/modals/edit-visit-modal.tsx';
import { DeleteVisitModal } from '@/modals/delete-visit-modal.tsx';

export function ModalProvider({ children }: PropsWithChildren) {
  const modals = useModalStore((store) => store.modal);

  return (
    <>
      <AddPatientModal {...modals['add-patient']} />
      <EditPatientModal {...modals['edit-patient']} />
      <DeletePatientModal {...modals['delete-patient']} />
      <AddVisitModal {...modals['add-visit']} />
      <EditVisitModal {...modals['edit-visit']} />
      <DeleteVisitModal {...modals['delete-visit']} />
      {children}
    </>
  );
}
