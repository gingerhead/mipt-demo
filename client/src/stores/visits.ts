import { create } from 'zustand';
import { type Visit } from '../../api/__generated__/types';
import { z } from 'zod';
import { formSchema } from '@/forms/visit/schema.ts';
import { client } from '../../api/client.ts';
//import { client } from '../api/client.ts';

export interface VisitsStore {
  visits: Record<string, Visit>;
  createVisit: (data: z.infer<typeof formSchema>) => Promise<void>;
  updateVisit: (id: string, data: z.infer<typeof formSchema>) => Promise<void>;
  deleteVisit: (id: string) => Promise<void>;
}

export const useVisitStore = create<VisitsStore>((set) => ({
  visits: {},
  createVisit: async (data) => {
    const response = await client.createVisit(data);
    if (response.statusText === 'Created') {
      const visit = response.data;
      set(({ visits }) => ({ visits: { [visit.id]: visit ,...visits } }));
    }
  },
  deleteVisit: async (id) => {
    const response = await client.deleteVisit(id);
    if (response.status === 200) {
      set(({ visits }) => ({
        visits: Object.fromEntries(
            Object.entries(visits).filter(([key]) => key !== id),
          ),
        }),
      );
    }
  },
  updateVisit: async (id, data) => {
    const response = await client.updateVisit(id, data);
    if (response.status === 200) {
      const visit = response.data;
      set(({ visits }) => {
        visits[visit.id] = visit;
        return {
          visits: { ...visits }
        }
      });
    }
  },
}));
