import { Input } from '@/components/ui/input.tsx';
import { Search } from 'lucide-react';
import { type FormEvent, useState } from 'react';
import { usePatientsStore } from '@/stores/patients.ts';
import { cn } from '@/lib/utils.ts';

export const PatientSearchForm = ({ className }: { className: string }) => {
  const [ searchString, setSearchString ] = useState<string>('')
  const { search, getPatients } = usePatientsStore();

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (searchString.trim() === '') {
      getPatients()
    } else {
      search(searchString)
    }
  }

  return (
    <form onSubmit={submitHandler} className={cn(className, 'flex gap-4')}>
      <div className='w-full relative'>
        <Input icon={ Search } value={ searchString } onChange={ (e) => setSearchString(e.currentTarget.value) } />
        <button type='submit' className='w-6 h-6 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer' />
      </div>
    </form>
  )
}
