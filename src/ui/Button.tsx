import type { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};
export const Button = ({ children, className, onClick }: ButtonProps) => {
  return (
    <button
      type="button"
      className={`bg-button text-text px-2 py-1 rounded hover:cursor-pointer ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
