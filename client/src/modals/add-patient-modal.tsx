import { BaseModal } from './base-modal';
import { PatientForm } from '@/forms/patient/patient-form';
import { MODALS, useModalStore } from '@/stores/modals.ts';
import { usePatientsStore } from '@/stores/patients.ts';

export const AddPatientModal = (props: typeof MODALS['add-patient']) => {
  const closeModal = useModalStore((store) => store.closeModal);
  const onCloseModal = () => closeModal('add-patient');
  const createPatient = usePatientsStore((state) => state.createPatient);

  return (
    <BaseModal title='Добавить пациента' {...props} onOpenChange={onCloseModal}>
      <PatientForm closeModal={onCloseModal} handleSubmit={createPatient}/>
    </BaseModal>
  );
};
