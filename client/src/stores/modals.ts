import { create } from 'zustand';
import type { Patient, Visit } from '../../api/__generated__/types';

export const MODALS: ModalMap = {
  'add-patient': {
    id: 'add-patient',
    open: false
  },
  'edit-patient': {
    id: 'edit-patient',
    open: false,
    meta: {
      patient: null
    },
  },
  'delete-patient': {
    id: 'delete-patient',
    open: false,
    meta: {
      firstName: '',
      lastName: '',
      patientId: null
    },
  },
  'add-visit': {
    id: 'add-visit',
    open: false,
  },
  'edit-visit': {
    id: 'edit-visit',
    open: false,
    meta: {
      visit: null
    },
  },
  'delete-visit': {
    id: 'delete-visit',
    open: false,
    meta: {
      firstName: '',
      lastName: '',
      visitDate: '',
      visitId: null,
    },
  },
} as const;

export type ModalMap = {
  [id: string]: Modal;
  'delete-patient': {
    id: 'delete-patient',
    open: boolean,
    meta: {
      firstName: string,
      lastName: string,
      patientId: string | null
    }
  }
  'edit-patient': {
    id: 'edit-patient',
      open: boolean,
      meta: {
      patient: null | Patient
    }
  },
  'delete-visit': {
    id: 'delete-visit',
    open: boolean,
    meta: {
      firstName: string,
      lastName: string,
      visitDate: string,
      visitId: string | null,
    },
  },
  'edit-visit': {
    id: 'edit-visit',
    open: boolean,
    meta: {
      visit: null | Visit
    }
  },
}

export interface ModalMeta {
  [name: string]: unknown;
}

export type Modal = {
  id: string;
  open: boolean;
  meta?: ModalMeta;
  onOpenChange?: (open: boolean) => void;
};

export interface ModalState {
  modal: typeof MODALS;
}

export type ModalActions = {
  openModal: (id: string, meta?: ModalMeta) => void;
  closeModal: (id: string) => void;
};

export type ModalStore = ModalState & ModalActions;

export const defaultInitState: ModalState = {
  modal: MODALS,
};

export const useModalStore = create<ModalStore>()((set) => ({
  ...defaultInitState,
  openModal: (id, meta) =>
    set((state) => ({
      modal: { ...state.modal, [id]: { id, meta, open: true } },
    })),
  closeModal: (id) =>
    set((state) => ({
      modal: { ...state.modal, [id]: { id, open: false } },
    })),
}));
