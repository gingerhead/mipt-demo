import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog.tsx';
import { type DialogProps } from '@radix-ui/react-dialog';

export interface IModalProps extends DialogProps {
  open: boolean;
  title?: string;
}

export const BaseModal = ({ open, onOpenChange, title, children }: IModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby={undefined}>
        <DialogTitle className={`${title ? '' : 'sr-only'}`}>{title}</DialogTitle>
        {children}
      </DialogContent>
    </Dialog>
  );
};
