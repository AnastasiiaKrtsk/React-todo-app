import { twMerge } from 'tailwind-merge';
type ModalProp = {
  children: React.ReactNode;
  className?: string;
};

export const Modal = ({ children, className }: ModalProp) => {
  return (
    // Overlay (dark background)
    //'inset-1'(top/right/bottom/left = 0) and 'fixed' are doing the job
    <div
      className={twMerge(
        'fixed flex items-center justify-center bg-black/50',
        className,
      )}
    >
      {children}
    </div>
  );
};

//w-full - Responsive width
//max-w-lg - Maximum width
