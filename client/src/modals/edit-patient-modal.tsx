import { z } from 'zod';
import { BaseModal } from './base-modal';
import { PatientForm } from '@/forms/patient/patient-form';
import { MODALS, useModalStore } from '@/stores/modals.ts';
import { usePatientsStore } from '@/stores/patients.ts';
import { formSchema } from '@/forms/patient/schema.ts';

export const EditPatientModal = ({
  meta: { patient } = { patient: null },
  ...props
}: typeof MODALS['edit-patient']) => {
  const closeModal = useModalStore((store) => store.closeModal);
  const onCloseModal = () => closeModal('edit-patient');
  const updatePatient = usePatientsStore((state) => state.updatePatient);
  const handleSubmit = (id: string) => (data: z.infer<typeof formSchema>) => updatePatient(id, data);

  if (!patient) {
    return (
      <BaseModal title="Редактировать пациента" onOpenChange={ onCloseModal } { ...props }>
        <div>Loading...</div>
      </BaseModal>
    )
  }

  return (
    <BaseModal title='Редактировать пациента' onOpenChange={onCloseModal} {...props}>
      <PatientForm closeModal={ onCloseModal } initialValues={ patient } handleSubmit={handleSubmit(patient.id)} />
    </BaseModal>
  );
};
