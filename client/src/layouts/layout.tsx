import { Children, type PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';
import { ModalProvider } from '@/providers/modal-provider.tsx';
import { Header } from '@/layouts/header.tsx';
import { Toaster } from '@/components/ui/sonner.tsx';

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <ModalProvider>
      <div className='min-h-full flex flex-col relative bg-front bg-cover'>
        <Header />
        <main className="flex-auto flex flex-col container mx-auto mb-20">
          { Children.count(children) === 0 ? <Outlet /> : children }
        </main>
        <Toaster />
      </div>
    </ModalProvider>
  );
};
