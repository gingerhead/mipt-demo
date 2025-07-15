import { NavLink } from 'react-router';

export const Header = () => (
  <div
    className='md:relative md:w-full md:top-0 md:z-20 flex flex-row flex-wrap items-center bg-white p-6 border-b border-gray-300'>
    <div className='m-2'>
      <NavLink to={ '/' }>
        <div id='logo' className='font-bold text-2xl'>
          МИС
        </div>
      </NavLink>
    </div>
    <div className='flex gap-6 ml-12'>
      <NavLink to={ '/patients' }>Пациенты</NavLink>
      <NavLink to={ '/visits' }>Визиты</NavLink>
    </div>
  </div>
);
